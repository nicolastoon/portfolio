import type { JSX } from "react";

type ButtonProps = {
  icon: JSX.Element;
  action: string;
  name: string;
};

export default function Button({ icon, action, name }: ButtonProps) {
  function hover(element: HTMLElement) {
    element.style.transform = "rotate(20deg)";
    element.style.borderColor = "var(--primary-accent-highlight)";
    element.style.boxShadow = "0 0 5px var(--shadow-accent-color)";
    const icon = element.querySelector(".lucide") as HTMLElement;
    if (icon) {
      icon.style.stroke = "var(--primary-accent-highlight)";
    }
    setTimeout(() => {
      element.style.transform = "rotate(0deg)";
    }, 200);
  }

  function unhover(element: HTMLElement) {
    element.style.borderColor = "var(--primary-accent-color)";
    element.style.boxShadow = "none";
    const icon = element.querySelector(".lucide") as HTMLElement;
    if (icon) {
      icon.style.stroke = "var(--primary-accent-color)";
    }
  }

  return (
    <a href={action}>
      <div
        className="link"
        id={`${name}-button`}
        onPointerEnter={(e) => 
          hover(e.currentTarget)
        }
        onPointerLeave={(e) => unhover(e.currentTarget)}
      >
        {icon}
      </div>
    </a>
  );
}
