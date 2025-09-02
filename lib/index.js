import { fetchJSON, renderProjects } from './global.js';

const projects = await fetchJSON('portfolio/lib/projects.json');
const projectsContainer = document.querySelector('#projects-container');
renderProjects(projects, projectsContainer);