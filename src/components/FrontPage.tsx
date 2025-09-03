import Links from "./Links.tsx";
import { CircleArrowDown } from 'lucide-react';

export default function FrontPage() {
  return (
    <section id="front-page">
      <div id="header">
        <img
          className="panel"
          id="avatar"
          src="/portfolio/images/moi.jpg"
          alt="picture of me!"
          width="100%"
        />
        <div id="name-container">
          <h1 id="fullname">Nicolas Toon</h1>
          <span className="title">
            FULL STACK DEVELOPER // MACHINE LEARNING ENGINEER
          </span>
          <Links />
        </div>
      </div>
      <CircleArrowDown />
    </section>
  );
}
