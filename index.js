import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h2');

// const githubData = await fetchGitHubData('nicolastoon');
// const profileStats = document.querySelector('#profile-stats');
// if (profileStats) {
//     profileStats.innerHTML = `
//           <dl>
//             <dt>public repos</dt><dd>${githubData.public_repos}</dd>
//             <dt>public gists</dt><dd>${githubData.public_gists}</dd>
//             <dt>followers</dt><dd>${githubData.followers}</dd>
//             <dt>following</dt><dd>${githubData.following}</dd>
//           </dl>
//       `;
//   }