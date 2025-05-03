import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

const projectsTitle = document.querySelector('h1');
projectsTitle.innerText = `${projects.length} projects!`;

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// let rolledData = d3.rollups(
//     projects,
//     (v) => v.length,
//     (d) => d.year,
// );
// let data = rolledData.map(([year, count]) => {
//     return { value: count, label: year };
// });
// let sliceGenerator = d3.pie().value((d) => d.value);
// let arcData = sliceGenerator(data);
// let arcs = arcData.map((d) => arcGenerator(d));
// let colors = d3.scaleOrdinal(d3.schemeTableau10);

function renderPieChart(projectsGiven) {
    // re-calculate rolled data
    let newRolledData = d3.rollups(
      projectsGiven,
      (v) => v.length,
      (d) => d.year,
    );
    // re-calculate data
    let newData = newRolledData.map(([year, count]) => {
      return { value: count, label: year }; // TODO
    });
    // re-calculate slice generator, arc data, arc, etc.
    let newSliceGenerator = d3.pie().value((d) => d.value);
    let newArcData = newSliceGenerator(newData);
    let newArcs = newArcData.map((d) => arcGenerator(d));
    // TODO: clear up paths and legends
    let newSVG = d3.select('svg');
    newSVG.selectAll('path').remove();
    let newLegend = d3.select('.legend')
    newLegend.selectAll('li').remove()
    // update paths and legends, refer to steps 1.4 and 2.2
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    // newArcs.forEach((arc, idx) => {
    //     d3.select('svg')
    //       .append('path')
    //       .attr('d', arc)
    //       .attr('fill', colors(idx))
    // })
    let legend = d3.select('.legend');
    newData.forEach((d, idx) => {
    legend.append('li')
          .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
          .attr('id', 'key')
          .html(`<span class="swatch"></span> <div>${d.label} <em>(${d.value})</em></div>`); // set the inner html of <li>
    });

    let selectedIndex = -1;
    newArcs.forEach((arc, i) => {
        newSVG
            .append('path')
            .attr('d', arc)
            .attr('fill', colors(i))
            .on('click', () => {
                selectedIndex = selectedIndex === i ? -1 : i;
                newSVG
                    .selectAll('path')
                    .attr('class', (_, idx) => {
                        if (idx === selectedIndex) {
                            return 'selected'
                        }
                    });
                legend
                    .selectAll('li')
                    .attr('class', (_, idx) => {
                        if (idx === selectedIndex) {
                            return 'selected'
                        }
                    });
                let filteredProjects = projects
                let searchInput = document.querySelector('.searchBar');
                if (searchInput.value) {
                    filteredProjects = setQuery(searchInput.value, filteredProjects);
                }
                if (selectedIndex === -1) {
                    renderProjects(filteredProjects, projectsContainer, 'h2'); 
                } else {
                    let doubleFiltered = yearQuery(newData[selectedIndex].label, filteredProjects)
                    renderProjects(doubleFiltered, projectsContainer, 'h2') 
                }
            });
    });
}

function setQuery(input, projects) {
    return projects.filter((project) => {
        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(input.toLowerCase());
    });
}

function yearQuery(year_input, projects) {
    return projects.filter((project) => {
        return project.year === year_input
    });
}
  
// Call this function on page load
renderPieChart(projects);

let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
    let filteredProjects = setQuery(event.target.value, projects);
    // re-render legends and pie chart when event triggers
    renderProjects(filteredProjects, projectsContainer, 'h2');
    renderPieChart(filteredProjects);
});