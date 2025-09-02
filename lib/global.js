export async function fetchJSON(url) {
    try {
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

export function renderProjects(projects, containerElement) {
    containerElement.innerHTML = '';
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const div = document.createElement('div');
        div.className = 'project';

        const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? '/' : '/portfolio/';
        let image_url = !project.image.startsWith('http') ? BASE_PATH + project.image : project.image;

        const organization = project.org !== '' ? ` • ${project.org}` : ''
        let tags = ""
        for (let j = 0; j < project.tags.length; j++) {
            tags += `<div class="tag">${project.tags[j]}</div>`
        }

        div.innerHTML = `
        <a href="${project.link}" style="text-decoration: none; color: inherit;">
            <article class="project-content">
                <img src="${image_url}" height=100% width="100%" style="object-fit:cover;">
                <div>
                    <h3>${project.title}</h3>
                    <div class="tags">${tags}</div>
                    <p class="info">${project.year}${organization}</p>
                    <p>${project.description}</p>
                </div>
            </article>
        </a>`;
        containerElement.appendChild(div);
    }
}


