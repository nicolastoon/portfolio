import projects from "../../lib/projects.json";
import { Link, CodeXml } from "lucide-react";
import { useState } from "react";

type ProjectObject = {
  title: string,
  image: string,
  year: string,
  tags: string[],
  link: string,
  sourceCode: string,
  specialLink: string,
  description: string,
  comments: string,
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
              tag.style.boxShadow = "0 0 5px 2px var(--shadow-accent-color)";
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

  function ProjectLinkArrow(isMobile: boolean = false) {
    return (
      <div className="project-info-link">
        <span className="visit-text" id={isMobile ? "" : "desktop-visit-text"}>
          visit
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="24"
          viewBox="0 0 40 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right-icon lucide-move-right"
          id="project-info-link-arrow"
        >
          <path
            className="arrow-part"
            id={isMobile ? "" : "desktop-arrow-head"}
            d="M7 8L11 12L7 16"
          />
          <path
            className="arrow-part"
            id={isMobile ? "" : "desktop-arrow-line"}
            d="M0 12H10"
          />
        </svg>
      </div>
    );
  }

  function animateArrow() {
    const arrowLine = document.getElementById("desktop-arrow-line");
    const arrowHead = document.getElementById("desktop-arrow-head");
    if (arrowLine && arrowHead) {
      arrowLine.style.transform = "scaleX(3)";
      arrowHead.style.transform = "translateX(21px)";
      arrowLine.style.stroke = "var(--primary-accent-highlight)";
      arrowHead.style.stroke = "var(--primary-accent-highlight)";
    }
    const text = document.getElementById("desktop-visit-text");
    if (text) {
      text.style.color = "var(--primary-accent-highlight)";
    }
  }

  function resetArrow() {
    const arrowLine = document.getElementById("desktop-arrow-line");
    const arrowHead = document.getElementById("desktop-arrow-head");
    if (arrowLine && arrowHead) {
      arrowLine.style.transform = "scaleX(1)";
      arrowLine.style.stroke = "var(--primary-accent-color)";
      arrowHead.style.transform = "translateX(0)";
      arrowHead.style.stroke = "var(--primary-accent-color)";
    }
    const text = document.getElementById("desktop-visit-text");
    if (text) {
      text.style.color = "var(--primary-accent-color)";
    }
  }

  function SourceCode(sourceCodeLink: string, isMobile: boolean = false) {
    return (
      <div
        className="link source-code-button"
        onClick={() => window.open(sourceCodeLink, "_blank")}
        onPointerEnter={(e) =>
          isMobile ? null : sourceCodeHover(e.currentTarget)
        }
        onPointerLeave={(e) =>
          isMobile ? null : sourceCodeUnhover(e.currentTarget)
        }
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

  function generateDesktopProjects() {
    return (
      <>
        <div id="project-names">{generateProjectNames()}</div>
        <div id="project-info-scroll-container">
          <div className="project-info-container">
            <img
              className="project-info-img"
              src={projects[selectedIndex].image}
            />
            <div
              className="project-info"
              onPointerEnter={animateArrow}
              onPointerLeave={resetArrow}
              onClick={() =>
                window.open(projects[selectedIndex].link, "_blank")
              }
            >
              <div className="project-info-tags">
                {generateTags(
                  projects[selectedIndex].tags,
                  projects[selectedIndex]
                )}
              </div>
              <span className="project-info-year project-details">
                {projects[selectedIndex].year}
              </span>
              {projects[selectedIndex].comments ? (
                <span className="project-info-comments project-details">
                  {projects[selectedIndex].comments}
                </span>
              ) : null}
              <p className="project-info-description">
                {projects[selectedIndex].description
                  ? projects[selectedIndex].description
                  : null}
              </p>
              <div className="project-links">
                {projects[selectedIndex].link ? ProjectLinkArrow() : null}
                {projects[selectedIndex].sourceCode
                  ? SourceCode(projects[selectedIndex].sourceCode)
                  : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function generateMobileProjects() {
    return projects.map((p, index) => (
      <div key={`project-${index}`} className="project-info-container">
        <img className="project-info-img" src={p.image} />
        <div
          className="project-info"
          onClick={() => window.open(p.link, "_blank")}
        >
          <div className="project-name mobile-project-name">{p.title}</div>
          <div className="project-info-tags">{generateTags(p.tags, p)}</div>
          <span className="project-info-year project-details">{p.year}</span>
          {p.comments ? (
            <span className="project-info-comments project-details">
              {p.comments}
            </span>
          ) : null}
          <p className="project-info-description">{p.description}</p>
          <div className="project-links">
            {p.link ? ProjectLinkArrow(true) : null}
            {p.sourceCode ? SourceCode(p.sourceCode, true) : null}
          </div>
        </div>
      </div>
    ));
  }

  let [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="projects">
      <h2 className="section-title" id="projects-title">
        Building...
      </h2>
      <div id="projects-container">{generateDesktopProjects()}</div>
      <div id="mobile-projects-container">{generateMobileProjects()}</div>
    </section>
  );
}
