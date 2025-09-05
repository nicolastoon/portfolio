// import Navigation from "./components/Navigation.tsx";
import FrontPage from "./components/FrontPage.tsx";
import TechStack from "./components/TechStack.tsx";
import About from "./components/About.tsx";
import Projects from "./components/Projects.tsx";
import Background from "./components/Background.tsx"

export default function App() {
  return (
    <>
      <Background />
      <FrontPage />
      <Projects />
      <About />
      <TechStack />
    </>
  );
}
