import projects from "../../lib/projects.json";
import { Calendar, Briefcase } from "lucide-react";

export default function Projects() {

  function generateTags(tags: string[]) {
    return tags.map((tag) => (
      `<div class="project-info-tag" key="${tag}">
        ${tag}
      </div>`
    )).join("");
  }

  function hoverName(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const infoPanel = document.getElementById("project-info-container");
    const projectImg = document.getElementById("project-info-img");
    const tags = document.getElementById("project-info-tags");
    const year = document.getElementById("project-info-year");
    const org = document.getElementById("project-info-org");
    const desc = document.getElementById("project-info-description");

    if (infoPanel && projectImg && desc && tags && year && org) {
      const selectedProject = projects.find(
        (p) => p.title === target.innerText
      ) as {
        title: string;
        image: string;
        year: string;
        org: string;
        tags: string[];
        link: string;
        description: string;
      };
      projectImg.setAttribute("src", selectedProject.image);
      tags.innerHTML = generateTags(selectedProject.tags);
      year.innerHTML = selectedProject.year;
      org.innerHTML = selectedProject.org;
      desc.innerHTML = selectedProject.description;
      infoPanel.style.visibility = "visible";
    }

    target.style.opacity = "1";
    target.style.transition = "opacity 0.1s linear";
  }

  function unhoverName(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    target.style.opacity = "0.3";
    const infoPanel = document.getElementById("project-info-container");
    if (infoPanel) {
      infoPanel.style.visibility = "hidden";
    }
  }

  function generateProjectNames() {
    return projects.map((p) => (
      <div
        className="project-name"
        onMouseEnter={(e) => hoverName(e)}
        // onMouseLeave={(e) => unhoverName(e)}
        key={p.title}
      >
        {p.title}
      </div>
    ));
  }

  return (
    <section id="projects">
      <h2 id="projects-title">(PROJECTS)</h2>
      <div id="projects-container">
        <div id="project-names">{generateProjectNames()}</div>
        <div id="project-info-container">
          <img id="project-info-img" />
          <div className="panel" id="project-info">
            <div id="project-info-tags">
              {["lorem", "ipsum", "dolor", "sit", "amet"]}
            </div>
            <span>
              <Calendar /> <div id="project-info-year">2023</div>
            </span>
            <span>
              <Briefcase />
              <div id="project-info-org">Personal</div>
            </span>
            <div id="project-info-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              impedit, culpa hic excepturi dolore tempore vitae est officia
              aliquid totam assumenda! Expedita nam quis, iusto consectetur ad
              quod totam ducimus.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
