function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector))
}

let pages = [
    {url: '', title: 'home'},
    {url: 'projects/', title: 'projects'},
    {url: 'https://github.com/nicolastoon', title: 'github'},
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

export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
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
        const div = document.createElement('div');

        const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? '/' : '/portfolio/';
        let image_url = !project.image.startsWith('http') ? BASE_PATH + project.image : project.image;

        const organization = project.org !== '' ? ` • ${project.org}` : ''
        let tags = ""
        for (let j = 0; j < project.tags.length; j++) {
            tags += `<div class="tag">${project.tags[j]}</div>`
        }

        div.innerHTML = `
        <a href="${project.link}">
            <article>
                <img src="${image_url}" height=100% width="100%" style="object-fit:cover;">
                <div>
                    <h2>${project.title}</h2>
                    <div class="tags">${tags}</div>
                    <p class="info">${project.year}${organization}</p>
                    <p>${project.description}</p>
                </div>
            </article>
        </a>`;
        containerElement.appendChild(div);
    }
}


