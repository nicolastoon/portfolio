import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
import scrollama from 'https://cdn.jsdelivr.net/npm/scrollama@3.2.0/+esm';

async function loadData() {
    const data = await d3.csv('loc.csv', (row) => ({
        ...row,
        line: Number(row.line), // or just +row.line
        depth: Number(row.depth),
        length: Number(row.length),
        date: new Date(row.date + 'T00:00' + row.timezone),
        datetime: new Date(row.datetime),
    }));

    return data;
}

function processCommits(data) {
    return d3
        .groups(data, (d) => d.commit)
        .map(([commit, lines]) => {
            let first = lines[0];
            let { author, date, time, timezone, datetime } = first;
    
            let ret = {
                id: commit,
                url: 'https://github.com/nicolastoon/portfolio/commit/' + commit,
                author,
                date,
                time,
                timezone,
                datetime,
                // Calculate hour as a decimal for time analysis
                // e.g., 2:30 PM = 14.5
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                // How many lines were modified?
                totalLines: lines.length,
            };

            Object.defineProperty(ret, 'lines', {
                value: lines,
                enumerable: false,
                configurable: false,
                writable: false,
            });

            return ret;
        })
        .sort((a, b) => a.datetime - b.datetime);
}

function countTimeofDay(data) {
    const workByPeriod = d3.rollups(
        data,
        (v) => v.length,
        (d) => new Date(d.datetime).toLocaleString('en', { dayPeriod: 'short' }),
    );

    return d3.greatest(workByPeriod, (d) => d[1])?.[0];
}

function findAverageLength(data) {
    const lineLengths = data.map(d => d.length);
    return d3.mean(lineLengths);
}

function countDays(data) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days = d3.rollups(
        data,
        (v) => v.length,
        (d) => daysOfWeek[d.datetime.getDay()],
    );
    
    return d3.greatest(days, (d) => d[1])?.[0];
}

function renderTooltipContent(commit) {
    const link = document.getElementById('commit-link');
    const author = document.getElementById('author');
    const date = document.getElementById('commit-date');
    const time = document.getElementById('commit-time');
    const lines = document.getElementById('lines-edited');

    if (Object.keys(commit).length === 0) return;
  
    link.href = commit.url;
    link.textContent = commit.id;
    author.textContent = commit.author;
    date.textContent = commit.datetime?.toLocaleString('en', {
      dateStyle: 'full',
    });
    time.textContent = commit.time;
    lines.textContent = commit.totalLines;
}

function updateTooltipVisibility(isVisible) {
    const tooltip = document.getElementById('commit-tooltip');
    tooltip.hidden = !isVisible;
}

function updateTooltipPosition(event) {
    const tooltip = document.getElementById('commit-tooltip');
    const offset = 20;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY - tooltip.offsetHeight - offset}px`;
}

const width = 1000;
const height = 600;
const margin = { top: 10, right: 10, bottom: 30, left: 20 };
const usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
};


function isCommitSelected(selection, commit) { 
    if (!selection) {
      return false;
    }
    // TODO: return true if commit is within brushSelection and false if not
    const topLeft = [xScale.invert(selection[0][0]), yScale.invert(selection[0][1])];
    const bottomRight = [xScale.invert(selection[1][0]), yScale.invert(selection[1][1])];
    return commit.datetime >= topLeft[0] && commit.datetime <= bottomRight[0] && 
        commit.hourFrac <= topLeft[1] && commit.hourFrac >= bottomRight[1];
}

function renderSelectionCount(selection) {
    const selectedCommits = selection
        ? commits.filter((d) => isCommitSelected(selection, d))
        : [];
    const plural = selectedCommits.length !== 1 
        ? 's' 
        : '';
    const countElement = document.querySelector('#selection-count');
    countElement.textContent = `${selectedCommits.length || 'No'} commit${plural} selected`;
  
    return selectedCommits;
}

function renderTotalLanguageBreakdown(commits) {
    const container = document.getElementById('language-breakdown');
    const lines = commits.flatMap((d) => d.lines);
  
    // Use d3.rollup to count lines per language
    const breakdown = d3.rollup(
        lines,
        (v) => v.length,
        (d) => d.type,
    );
  
    // Update DOM with breakdown
    container.innerHTML = '';
  
    for (const [language, count] of breakdown) {
        const proportion = count / lines.length;
        const formatted = d3.format('.1~%')(proportion);
  
        container.innerHTML += `
            <dt>${language.toUpperCase()}</dt>
            <dd>${count} lines (${formatted})</dd>
            `;
    }
}

function renderLanguageBreakdown(selection) {
    const selectedCommits = selection
        ? commits.filter((d) => isCommitSelected(selection, d))
        : [];
    const container = document.getElementById('language-breakdown');
  
    if (selectedCommits.length === 0) {
        container.innerHTML = 
            '<dt>Highlight commits to see the language breakdown.</dt><dd>0 lines</dd>';
        return;
    }
    const requiredCommits = selectedCommits.length ? selectedCommits : commits;
    const lines = requiredCommits.flatMap((d) => d.lines);
  
    // Use d3.rollup to count lines per language
    const breakdown = d3.rollup(
        lines,
        (v) => v.length,
        (d) => d.type,
    );
  
    // Update DOM with breakdown
    container.innerHTML = '';
  
    for (const [language, count] of breakdown) {
        const proportion = count / lines.length;
        const formatted = d3.format('.1~%')(proportion);
  
        container.innerHTML += `
            <dt>${language.toUpperCase()}</dt>
            <dd>${count} lines (${formatted})</dd>
            `;
    }
}

function brushed(event) {
    const selection = event.selection;
    d3.selectAll('circle').classed('selected', (d) => {
        return isCommitSelected(selection, d);
    });
    renderSelectionCount(selection);
    renderLanguageBreakdown(selection);
}

function unbrushed(event) {
    const selection = event.selection;
    brushed(event);

    if (!selection) {
        renderTotalLanguageBreakdown(commits);
        document.getElementById('selection-count').innerText = 'Highlight data to get started...';
    }
}

function createBrushSelector(svg) {
    svg.call(d3.brush()
        .on('brush', brushed)
        .on('end', unbrushed));

    // Raise dots and everything after overlay
    svg.selectAll('.dots, .overlay ~ *').raise();
}

function renderCommitInfo(data, commits) {
    // Create the dl element
    const dl = d3.select('#meta-stats').append('dl').attr('class', 'stats');
  
    // Add total LOC
    dl.append('dt').html('Total <abbr title="Lines of code">LoC</abbr>');
    dl.append('dd').text(data.length);
  
    // Add total commits
    dl.append('dt').text('Total commits');
    dl.append('dd').text(commits.length);
  
    // Add more stats as needed...
    dl.append('dt').text('Number of Files');
    dl.append('dd').text(d3.group(data, d => d.file).size);

    dl.append('dt').text('Average Line Length');
    dl.append('dd').text(`${findAverageLength(data).toFixed(2)} characters`);

    dl.append('dt').html('Most Frequent <abbr title="Time of Commit">ToC</abbr>');
    dl.append('dd').text(countTimeofDay(data));

    dl.append('dt').html('Most Frequent <abbr title="Day of the Week">DotW</abbr>');
    dl.append('dd').text(countDays(data));
}
    
let data = await loadData();
let commits = processCommits(data);
renderCommitInfo(data, commits);
renderTotalLanguageBreakdown(commits);

console.log(commits)

let xScale = null;
let yScale = null;

let commitProgress = 100;
let timeScale = d3
    .scaleTime()
    .domain([
        d3.min(commits, (d) => d.datetime),
        d3.max(commits, (d) => d.datetime),
    ])
  .range([0, 100]);
let commitMaxTime = timeScale.invert(commitProgress);
let filteredCommits = commits;
const timeSlider = d3.select('#commit-slider')
    .on('input', event => {
        onTimeSliderChange(event);
        updateFileDisplay(filteredCommits);
        renderTotalLanguageBreakdown(filteredCommits);
    });
const selectedTime = d3.select('#selected-time')
    .text(commitMaxTime.toLocaleString('en-US', { timeStyle: 'short', dateStyle: 'long' }));

function onTimeSliderChange(event) {
    commitMaxTime = timeScale.invert(event.target.value);
    selectedTime.text(commitMaxTime.toLocaleString('en-US', { timeStyle: 'short', dateStyle: 'long' }));

    filteredCommits = commits.filter((d) => d.datetime <= commitMaxTime);
    updateScatterPlot(data, filteredCommits);
}

function renderScatterPlot(data, commits) {
    const width = 1000;
    const height = 600;
    const margin = { top: 10, right: 10, bottom: 30, left: 20 };
    const usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left,
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
    };

    // CHANGE: instead of creating a new svg element, we'll select the existing one.
    const svg = d3
        .select('#chart')
        .append('svg')
        .attr('id', 'chart-svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible');

    // CHANGE: we don't need to create a new xScale, we can just update the existing one.
    xScale = d3
        .scaleTime()
        .domain(d3.extent(commits, (d) => d.datetime))
        .range([usableArea.left, usableArea.right])
        .nice();

    // REMOVE: the yScale doesn't change when the user changes the slider
    yScale = d3
        .scaleLinear()
        .domain([0, 24])
        .range([usableArea.bottom, usableArea.top]);

    const [minLines, maxLines] = d3.extent(commits, (d) => d.totalLines);
    const rScale = d3.scaleSqrt().domain([minLines, maxLines]).range([2, 30]); // adjust these values based on your experimentation

    const xAxis = d3.axisBottom(xScale);

    // REMOVE: the yAxis doesn't change when the user changes the slider
    const yAxis = d3
        .axisLeft(yScale)
        .tickFormat((d) => String(d % 24).padStart(2, '0') + ':00');

    // REMOVE: the gridlines don't change when the user changes the slider
    const gridlines = svg
        .append('g')
        .attr('class', 'gridlines')
        .attr('transform', `translate(${usableArea.left}, 0)`);

    gridlines.call(
        d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width),
    );

    // CHANGE: we should clear out the existing xAxis and then create a new one.
    svg
        .append('g')
        .attr('transform', `translate(0, ${usableArea.bottom})`)
        .call(xAxis);

    // REMOVE: the yAxis doesn't change when the user changes the slider
    svg
        .append('g')
        .attr('transform', `translate(${usableArea.left}, 0)`)
        .call(yAxis);

    // CHANGE: we shouldn't need to create a new dots group, we can just select the existing one.
    const dots = svg.append('g').attr('class', 'dots');

    // KEEP: This code already updates existing dots.
    const sortedCommits = d3.sort(commits, (d) => -d.totalLines);
    dots
        .selectAll('circle')
        .data(sortedCommits, (d) => d.id)
        .join('circle')
        .attr('cx', (d) => xScale(d.datetime))
        .attr('cy', (d) => yScale(d.hourFrac))
        .attr('r', (d) => rScale(d.totalLines))
        .attr('fill', 'steelblue')
        .style('fill-opacity', 0.7) // Add transparency for overlapping dots
        .on('mouseenter', (event, commit) => {
        d3.select(event.currentTarget).style('fill-opacity', 1); // Full opacity on hover
        renderTooltipContent(commit);
        updateTooltipVisibility(true);
        updateTooltipPosition(event);
        })
        .on('mouseleave', (event) => {
        d3.select(event.currentTarget).style('fill-opacity', 0.7);
        updateTooltipVisibility(false);
        });

    // REMOVE: the brush selector doesn't change when the user changes the slider
    createBrushSelector(svg);
}

function updateScatterPlot(data, commits) {
    const svg = d3.select('#chart').select('svg');

    xScale = xScale.domain(d3.extent(commits, (d) => d.datetime));

    const [minLines, maxLines] = d3.extent(commits, (d) => d.totalLines);
    const rScale = d3.scaleSqrt().domain([minLines, maxLines]).range([2, 30]);

    const xAxis = d3.axisBottom(xScale);
    const xAxisGroup = svg.select('g.x-axis');
    xAxisGroup.selectAll('*').remove();
    xAxisGroup.call(xAxis);

    const dots = svg.select('g.dots');

    const sortedCommits = d3.sort(commits, (d) => -d.totalLines);
    dots
        .selectAll('circle')
        .data(sortedCommits, (d) => d.id)
        .join('circle')
        .attr('cx', (d) => xScale(d.datetime))
        .attr('cy', (d) => yScale(d.hourFrac))
        .attr('r', (d) => rScale(d.totalLines))
        .attr('fill', 'steelblue')
        .style('fill-opacity', 0.7) // Add transparency for overlapping dots
        .on('mouseenter', (event, commit) => {
        d3.select(event.currentTarget).style('fill-opacity', 1); // Full opacity on hover
        renderTooltipContent(commit);
        updateTooltipVisibility(true);
        updateTooltipPosition(event);
        })
        .on('mouseleave', (event) => {
        d3.select(event.currentTarget).style('fill-opacity', 0.7);
        updateTooltipVisibility(false);
        });
}

function updateFileDisplay(filteredCommits) {
    let lines = filteredCommits.flatMap((d) => d.lines);
    let files = d3
        .groups(lines, (d) => d.file)
        .map(([name, lines]) => {
            return { name, lines };
        })
        .sort((a, b) => b.lines.length - a.lines.length);

    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    let filesContainer = d3
        .select('#files')
        .selectAll('div')
        .data(files, (d) => d.name)
        .join(
            // This code only runs when the div is initially rendered
            (enter) =>
            enter.append('div').call((div) => {
                div.append('dt').append('code');
                div.append('dd');
            }),
        );

    filesContainer
        .select('dd')
        .selectAll('div')
        .data((d) => d.lines)
        .join('div')
        .attr('class', 'loc')
        .style('background', (d) => `${colors(d.type)}`);;

    // This code updates the div info
    filesContainer.select('dt > code').html((d) => `${d.name}<br><small>${d.lines.length} lines<small>`);
}

renderScatterPlot(data, commits);
updateFileDisplay(commits);

d3.select('#scatter-story')
    .selectAll('.step')
    .data(commits)
    .join('div')
    .attr('class', 'step')
    .html(
        (d, i) => `
            On ${d.datetime.toLocaleString('en', {
        dateStyle: 'full',
        timeStyle: 'short',
        })},
            I made <a href="${d.url}" target="_blank">${
        i > 0 ? 'another glorious commit' : 'my first commit, and it was glorious'
        }</a>.
            I edited ${d.totalLines} lines across ${
        d3.rollups(
            d.lines,
            (D) => D.length,
            (d) => d.file,
        ).length
        } files.
            Then I looked over all I had made, and I saw that it was very good.
        `,
    );

function onStepEnter(response) {
    filteredCommits = commits.filter((d) => d.datetime <= response.element.__data__.datetime);
    updateScatterPlot(data, filteredCommits);
    updateFileDisplay(filteredCommits);
}

const scroller = scrollama();
scroller
    .setup({
        container: '#scrolly-1',
        step: '#scrolly-1 .step',
    })
    .onStepEnter(onStepEnter);