import Projects from "./components/Projects.tsx";
import Picture from "./components/Picture.tsx";
import Name from "./components/Name.tsx";
import Links from "./components/Links.tsx";

export default function App() {
  return (
    <div id="panel-container">
      <Projects />
      <Picture />
      <Name />
      <Links />
    </div>
  );
}
