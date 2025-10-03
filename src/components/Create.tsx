export default function Create() {
  const apps = [
    {
      item: "JavaScript",
      icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    },
    {
      item: "TypeScript",
      icon: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      item: "Python",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    },
    {
      item: "Java",
      icon: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
    },
    { item: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
    { item: "CSS", icon: "https://cdn.simpleicons.org/css/663399" },
    { item: "pandas", icon: "https://cdn.simpleicons.org/pandas/150458" },
    { item: "NumPy", icon: "https://cdn.simpleicons.org/numpy/013243" },
    { item: "Plotly", icon: "https://cdn.simpleicons.org/plotly/3F4F75" },
    {
      item: "seaborn",
      icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
    },
    {
      item: "scikit-learn",
      icon: "https://cdn.simpleicons.org/scikitlearn/F7931E",
    },
    { item: "D3", icon: "https://cdn.simpleicons.org/d3/F9A03C" },
    { item: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    {
      item: "Excel",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
    },
    {
      item: "Figma",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    },
    {
      item: "Photoshop",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    },
    {
      item: "InDesign",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
    },
    {
      item: "PostgreSQL",
      icon: "https://cdn.simpleicons.org/postgresql/4169E1",
    },
    { item: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  ];

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
