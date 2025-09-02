import Navigation from "./components/Navigation.tsx";
import About from "./components/About.tsx"
import TechStack from "./components/TechStack.tsx";
import ScrollArrow from "./components/ScrollArrow.tsx";
import Projects from "./components/Projects.tsx";

export default function App() {
  return (
    <div id="panel-container">
      <Navigation />
      <About />
      <ScrollArrow location="after-about"/>
      <Projects />
      <TechStack />
    </div>
  );
}
