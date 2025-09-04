import Tooltip from "./Tooltip.tsx";
import { Minus } from "lucide-react";

export default function TechStack() {
  const apps = [
    {
      item: "JavaScript",
      icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    },
    {
      item: "TypeScript",
      icon: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    { item: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { item: "Java", icon: "https://www.vectorlogo.zone/logos/java/java-icon.svg" },
    { item: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
    { item: "CSS", icon: "https://cdn.simpleicons.org/css/663399" },
    { item: "pandas", icon: "https://cdn.simpleicons.org/pandas/150458" },
    { item: "NumPy", icon: "https://cdn.simpleicons.org/numpy/013243" },
    { item: "Plotly", icon: "https://cdn.simpleicons.org/plotly/3F4F75" },
    { item: "seaborn", icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
    {
      item: "scikit-learn",
      icon: "https://cdn.simpleicons.org/scikitlearn/F7931E",
    },
    { item: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
    {
      item: "TensorFlow",
      icon: "https://cdn.simpleicons.org/tensorflow/FF6F00",
    },
    { item: "D3", icon: "https://cdn.simpleicons.org/d3/F9A03C" },
    { item: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { item: "Photoshop", icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
    { item: "InDesign", icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg" },
    {
      item: "PostgreSQL",
      icon: "https://cdn.simpleicons.org/postgresql/4169E1",
    },
    { item: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  ];

  function revealTooltip(target: HTMLElement, label: string) {
    const tooltip = document.getElementById("techstack-tooltip");
    const iconRect = target.getBoundingClientRect();
    if (!tooltip) return;
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.innerText = label;
    tooltip.style.left = `${iconRect.left + iconRect.width / 2 - tooltipRect.width / 2}px`;
    tooltip.style.top = `${iconRect.bottom - 10}px`;
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    tooltip.style.transition = "opacity 0.2s ease-in-out";
  }

  function hideTooltip() {
    const tooltip = document.getElementById("techstack-tooltip");
    if (tooltip && tooltip.style.visibility === "visible") {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      tooltip.style.transition = "all 0.2s ease-in-out";
    }
  }

  function renderIcons(apps: { item: string; icon: string }[]) {
    return apps.map((app) => (
      <img
        src={app.icon}
        alt={app.item}
        key={app.item}
        className="techstack-icon"
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.transform = "scale(1.2)";
          target.style.padding = "1em";
          target.style.transition = "all 0.2s ease-in-out";
          revealTooltip(target, app.item);
        }}
        onMouseOut={(e) => {
          const target = e.currentTarget;
          target.style.transform = "scale(1)";
          target.style.padding = "0.5em";
          target.style.transition = "all 0.2s ease-in-out";
          hideTooltip();
        }}
      />
    ));
  }

  return (
    <section id="techstack">
      <h2 className="section-title" id="techstack-title">(TECHSTACK)</h2>
      <span className="section-title-divider"><Minus /></span>
      <div className="techstack-container">
        <Tooltip />
        <div className="techstack-slider">{renderIcons(apps)}</div>
        <div className="techstack-slider">{renderIcons(apps)}</div>
      </div>
    </section>
  );
}
