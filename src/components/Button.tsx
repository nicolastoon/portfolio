import type { JSX } from "react";

type ButtonProps = {
  icon: JSX.Element;
  action: string;
  name: string;
};

export default function Button({ icon, action, name }: ButtonProps) {
  function hoverEffect(element: HTMLElement) {
    element.style.transform = "scale(1.2)";
  }

  function unhoverEffect(element: HTMLElement) {
    element.style.transform = "scale(1)";
  }
  return (
    <a href={action}>
      <div
        className="link"
        id={`${name}-button`}
        onMouseEnter={(e) => hoverEffect(e.currentTarget)}
        onMouseLeave={(e) => unhoverEffect(e.currentTarget)}
      >
        {icon}
        <span className="button-label" id={`${name}-label`}>{name}</span>
      </div>
    </a>
  );
}
