import type { JSX } from "react";

type ButtonProps = {
  icon: JSX.Element;
  url: string;
};

export default function Button({ icon, url }: ButtonProps) {
  return (
    <>
      <button type="button" className="link" onClick={() => window.open(url)}>
        {icon}
      </button>
    </>
  );
}
