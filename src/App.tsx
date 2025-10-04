import Background from "./components/Background.tsx";
import Footer from "./components/Footer.tsx";
import About from "./components/About.tsx";
import Projects from "./components/Projects.tsx";
import Navigation from "./components/Navigation.tsx";
import { Routes, Route, HashRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <Background />
      <Navigation />
      <HashRouter>
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
        </Routes>
      </HashRouter>
      <Footer />
    </>
  );
}
