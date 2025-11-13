import apps from "../../lib/apps.json";

export default function Create() {
  function renderIcons(apps: { item: string; icon: string }[]) {
    return apps.map((app) => (
      <img
        src={app.icon}
        alt={app.item}
        key={app.item}
        className="techstack-icon"
      />
    ));
  }

  function hover(element: HTMLElement) {
    element.style.borderColor = "var(--primary-accent-highlight)";
    element.style.boxShadow = "0 0 5px var(--shadow-accent-color)";
    const text = element.querySelector("#view-projects-text") as HTMLElement;
    if (text) {
      text.style.color = "var(--primary-accent-highlight)";
    }
  }

  function unhover(element: HTMLElement) {
    element.style.borderColor = "var(--primary-accent-color)";
    element.style.boxShadow = "none";
    const text = element.querySelector("#view-projects-text") as HTMLElement;
    if (text) {
      text.style.color = "var(--primary-accent-color)";
    }
  }

  return (
    <section id="create">
      <div id="create-container">
        <h2 className="section-title" id="create-title">
          I create.
        </h2>
        <div className="techstack-container">
          <div className="techstack-slider">{renderIcons(apps)}</div>
          <div className="techstack-slider">{renderIcons(apps)}</div>
        </div>
        <a href="#/projects" id="creations-link">
          <div
            className="link"
            id="view-projects-button"
            onPointerEnter={(e) => hover(e.currentTarget)}
            onPointerLeave={(e) => unhover(e.currentTarget)}
          >
            <span id="view-projects-text">view projects</span>
          </div>
        </a>
      </div>
    </section>
  );
}
