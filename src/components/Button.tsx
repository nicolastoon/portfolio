import type { JSX } from "react";

type ButtonProps = {
  icon: JSX.Element;
  action: string;
  name: string;
  type: string;
};

export default function Button({ icon, action, name, type }: ButtonProps) {
  function hoverEffect(element: HTMLElement) {
    element.style.transform = "scale(1.2)";
    element.style.transition = "transform 0.2s";

    // make button expand with name, invert color on hover
    // const label = element.querySelector(".button-label") as HTMLElement;
    // console.log(element);
    // console.log(label.innerText);
    // element.style.background = "#463f3a";
    // label.style.display = "inline";
  }

  function unhoverEffect(element: HTMLElement) {
    element.style.transform = "scale(1)";
    element.style.transition = "transform 0.2s";
    // const label = element.querySelector(".button-label") as HTMLElement;
    // element.style.background = "transparent";
    // label.style.display = "none";
  }

  if (type === "navigation") {
    return (
      <>
        <div
          className="link"
          id={`${name}-button`}
          onClick={() => window.open(action)}
          onMouseEnter={(e) => hoverEffect(e.currentTarget)}
          onMouseLeave={(e) => unhoverEffect(e.currentTarget)}
        >
          {icon}
          <span className="button-label">{name}</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="link"
          id={`${name}-button`}
          onClick={() => window.open(action)}
          onMouseEnter={(e) => hoverEffect(e.currentTarget)}
          onMouseLeave={(e) => unhoverEffect(e.currentTarget)}
        >
          <span className="button-label">{name}</span>
          {icon}
        </div>
      </>
    );
  }
}
