console.log('ITS ALIVE!');

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector))
}

let pages = [
    {url: '', title: 'home'},
    {url: 'resume/', title: 'resume'},
    {url: 'projects/', title: 'projects'},
    {url: 'https://github.com/nicolastoon', title: 'github'},
    {url: 'contact/', title: 'contact'},
]
let nav = document.createElement('nav');
document.body.prepend(nav);
const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"                 
    : "/portfolio/";
for (let p of pages) {
    let url = !p.url.startsWith('http') ? BASE_PATH + p.url : p.url;
    let title = p.title;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
    if (a.host !== location.host) {
        a.target = '_blank';
    }
}

let default_option = matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
let secondary = default_option === 'dark' ? 'light' : 'dark';
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        theme:
        <select>
            <option value='${default_option}'>${default_option} (system default)</option>
            <option value='${secondary}'>${secondary}</option>
        </select>
    </label>`,
);

let select = document.querySelector('select');
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
});
if (localStorage.colorScheme) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
        console.log('hey!');
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
    containerElement.innerHTML = '';
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const article = document.createElement('article');

        const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? '/' : '/portfolio/';
        let image_url = !project.image.startsWith('http') ? BASE_PATH + project.image : project.image;

        article.innerHTML = `
        <${headingLevel}>${project.title}</${headingLevel}>
        <img src="${image_url}" alt="${project.title}" width="100%">
        <p>${project.description}</p>
        <p class='date'>c. ${project.year}</p>`;
        containerElement.appendChild(article);
    }
}

export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
}


