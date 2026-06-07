import Links from "./Links.tsx";

export default function FrontPage() {
  return (
    <section id="front-page">
      <div id="header">
        <img
          id="avatar"
          src="./images/moi2_cropped.JPG"
          alt="picture of me!"
          width="100%"
        />
        <div id="name-container">
          <h1 id="fullname">Nicolas Toon</h1>
          <span className="title">
            PERCEPTION ENGINEER // SOFTWARE ARCHITECT
          </span>
          <Links />
        </div>
      </div>
    </section>
  );
}
