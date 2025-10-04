export default function Navigation() {
  function hover(element: HTMLElement) {
    element.style.color = "var(--primary-accent-highlight)";
    element.style.textShadow = "0 0 5px var(--shadow-accent-color)";
  }

  function unhover(element: HTMLElement) {
    element.style.color = "var(--primary-accent-color)";
    element.style.textShadow = "none";
  }

  return (
    <nav id="navigation">
      <a className="navigation-link" href="#/">
        <div id="homepage-navigation">
          <span
            className="navigation-text"
            onPointerEnter={(e) => hover(e.currentTarget)}
            onPointerLeave={(e) => unhover(e.currentTarget)}
          >
            home
          </span>
        </div>
      </a>
      <a className="navigation-link" href="#/projects">
        <div id="projects-navigation">
          <span
            className="navigation-text"
            onPointerEnter={(e) => hover(e.currentTarget)}
            onPointerLeave={(e) => unhover(e.currentTarget)}
          >
            projects
          </span>
        </div>
      </a>
    </nav>
  );
}
