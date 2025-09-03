import Navigation from "./components/Navigation.tsx";
import FrontPage from "./components/FrontPage.tsx";
import TechStack from "./components/TechStack.tsx";
import Projects from "./components/Projects.tsx";

export default function App() {
  return (
    <>
      <FrontPage />
      <Projects />
      <TechStack />
    </>
  );
}
