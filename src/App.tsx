import Navigation from "./components/Navigation.tsx";
import About from "./components/About.tsx"
import TechStack from "./components/TechStack.tsx";
import Links from "./components/Links.tsx";

export default function App() {
  return (
    <div id="panel-container">
      <Navigation />
      <About />
      <TechStack />
      <Links />
    </div>
  );
}
