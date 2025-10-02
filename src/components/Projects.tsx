import projects from "../../lib/projects.json";
import Background from "./Background.tsx";
import { Calendar, Briefcase, Link } from "lucide-react";
import { useState } from "react";

type ProjectObject = {
  title: string;
  image: string;
  year: string;
  org: string;
  tags: string[];
  link: string;
  sourceCode: string;
  specialLink: string;
  description: string;
};

export default function Projects() {
  function generateTags(tags: string[], project: ProjectObject) {
    return tags.map((tag) => {
      const isSpecial = tag.includes("winner");
      return (
        <div
          className={
            isSpecial ? "project-info-tag special" : "project-info-tag"
          }
          key={tag}
          onClick={() =>
            isSpecial ? window.open(project.specialLink, "_blank") : null
          }
        >
          {tag}
          {isSpecial ? <Link /> : null}
        </div>
      );
    });
  }

  function generateProjectNames() {
    return projects.map((p, index) => (
      <div
        className={`project-name ${
          index === selectedIndex ? "focused" : "unfocused"
        }`}
        onMouseEnter={() => {
          setSelectedIndex(index);
        }}
        key={p.title}
      >
        {p.title}
      </div>
    ));
  }

  function animateArrow() {
    const arrowLine = document.getElementById("arrow-line");
    const arrowHead = document.getElementById("arrow-head");
    if (arrowLine && arrowHead) {
      arrowLine.style.transform = "scaleX(3)";
      arrowLine.style.stroke = "#618FCC";
      arrowHead.style.transform = "translateX(62px)";
      arrowHead.style.stroke = "#618FCC";
    }
  }

  function resetArrow() {
    const arrowLine = document.getElementById("arrow-line");
    const arrowHead = document.getElementById("arrow-head");
    if (arrowLine && arrowHead) {
      arrowLine.style.transform = "scaleX(1)";
      arrowLine.style.stroke = "currentColor";
      arrowHead.style.transform = "translateX(0)";
      arrowHead.style.stroke = "currentColor";
    }
  }

  function ProjectLinkArrow(selectedProject: ProjectObject) {
    return selectedProject.link ? (
      <div id="project-info-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="24"
          viewBox="0 0 200 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right-icon lucide-move-right"
        >
          <path id="arrow-head" d="M26 8L30 12L26 16" />
          <path id="arrow-line" d="M0 12H30" />
        </svg>
      </div>
    ) : null;
  }

  let [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Background />
      <section id="projects">
        <h2 className="section-title" id="projects-title">
          Building...
        </h2>
        <div id="projects-container">
          <div id="project-names">{generateProjectNames()}</div>
          <div id="project-info-container">
            <img
              className={
                projects[selectedIndex].sourceCode
                  ? "source-code-link active"
                  : "source-code-link"
              }
              id="source-code"
              src="/portfolio/images/robot.svg"
              onClick={() =>
                window.open(
                  projects[selectedIndex].sourceCode
                    ? projects[selectedIndex].sourceCode
                    : "_blank"
                )
              }
            />
            <img id="project-info-img" src={projects[selectedIndex].image} />
            <div
              className="panel"
              id="project-info"
              onMouseOver={animateArrow}
              onMouseOut={resetArrow}
              onClick={() =>
                window.open(projects[selectedIndex].link, "_blank")
              }
            >
              <div id="project-info-tags">
                {generateTags(
                  projects[selectedIndex].tags,
                  projects[selectedIndex]
                )}
              </div>
              <span id="project-info-year">
                <Calendar />
                {projects[selectedIndex].year}
              </span>
              <span id="project-info-org">
                <Briefcase />
                {projects[selectedIndex].org}
              </span>
              <div id="project-info-description">
                {projects[selectedIndex].description}
              </div>
              {projects[selectedIndex].link
                ? ProjectLinkArrow(projects[selectedIndex])
                : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
