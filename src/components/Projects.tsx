import projects from "../../lib/projects.json";
import { Calendar, Briefcase, Link, CodeXml } from "lucide-react";
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
          onPointerEnter={(e) => {
            if (isSpecial) {
              const tag = e.currentTarget;
              resetArrow();
              tag.style.boxShadow =
                "0 0 5px 2px var(--shadow-accent-color)";
              tag.style.border = "1px solid var(--primary-font-color)";
            }
          }}
          onPointerLeave={(e) => {
            if (isSpecial) {
              const tag = e.currentTarget;
              animateArrow();
              tag.style.boxShadow = "none";
              tag.style.border = "none";
            }
          }}
        >
          <span className="project-info-tag-text">{tag}</span>
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
        onPointerEnter={() => {
          setSelectedIndex(index);
        }}
        key={p.title}
      >
        {p.title}
      </div>
    ));
  }

  function ProjectLinkArrow() {
    return (
      <div id="project-info-link">
        <span id="visit-text">visit</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="24"
          viewBox="0 0 200 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right-icon lucide-move-right"
          id="project-info-link-arrow"
        >
          <path className="arrow-part" id="arrow-head" d="M7 8L11 12L7 16" />
          <path className="arrow-part" id="arrow-line" d="M0 12H10" />
        </svg>
      </div>
    );
  }

  function animateArrow() {
    const arrowLine = document.getElementById("arrow-line");
    const arrowHead = document.getElementById("arrow-head");
    if (arrowLine && arrowHead) {
      arrowLine.style.transform = "scaleX(3)";
      arrowHead.style.transform = "translateX(21px)";
      arrowLine.style.stroke = "var(--primary-accent-highlight)";
      arrowHead.style.stroke = "var(--primary-accent-highlight)";
    }
    const text = document.getElementById("visit-text");
    if (text) {
      text.style.color = "var(--primary-accent-highlight)";
    }
  }

  function resetArrow() {
    const arrowLine = document.getElementById("arrow-line");
    const arrowHead = document.getElementById("arrow-head");
    if (arrowLine && arrowHead) {
      arrowLine.style.transform = "scaleX(1)";
      arrowLine.style.stroke = "var(--primary-accent-color)";
      arrowHead.style.transform = "translateX(0)";
      arrowHead.style.stroke = "var(--primary-accent-color)";
    }
    const text = document.getElementById("visit-text");
    if (text) {
      text.style.color = "var(--primary-accent-color)";
    }
  }

  function SourceCode(sourceCodeLink: string) {
    return (
      <div
        className="link"
        id="source-code-button"
        onClick={() => window.open(sourceCodeLink, "_blank")}
        onPointerEnter={(e) => sourceCodeHover(e.currentTarget)}
        onPointerLeave={(e) => sourceCodeUnhover(e.currentTarget)}
      >
        <CodeXml />
      </div>
    );
  }

  function sourceCodeHover(element: HTMLElement) {
    resetArrow();
    element.style.transform = "scale(0.75) rotate(20deg)";
    element.style.borderColor = "var(--primary-accent-highlight)";
    element.style.boxShadow = "0 0 5px 2px var(--shadow-accent-color)";
    const icon = element.querySelector(".lucide") as HTMLElement;
    if (icon) {
      icon.style.stroke = "var(--primary-accent-highlight)";
    }
    setTimeout(() => {
      element.style.transform = "scale(0.75) rotate(0deg)";
    }, 200);
  }

  function sourceCodeUnhover(element: HTMLElement) {
    element.style.borderColor = "var(--primary-accent-color)";
    element.style.boxShadow = "none";
    const icon = element.querySelector(".lucide") as HTMLElement;
    if (icon) {
      icon.style.stroke = "var(--primary-accent-color)";
    }
    animateArrow();
  }

  let [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="projects">
      <h2 className="section-title" id="projects-title">
        Building...
      </h2>
      <div id="projects-container">
        <div id="project-names">{generateProjectNames()}</div>
        <div id="project-info-container">
          <img id="project-info-img" src={projects[selectedIndex].image} />
          <div
            className="panel"
            id="project-info"
            onPointerEnter={animateArrow}
            onPointerLeave={resetArrow}
            onClick={() => window.open(projects[selectedIndex].link, "_blank")}
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
            <div id="project-links">
              {projects[selectedIndex].link
                ? ProjectLinkArrow()
                : null}
              {projects[selectedIndex].sourceCode
                ? SourceCode(projects[selectedIndex].sourceCode)
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
