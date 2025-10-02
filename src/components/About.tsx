import Background from "./Background.tsx";
import { CircleArrowDown } from "lucide-react";
import FrontPage from "./FrontPage.tsx";
import Create from "./Create.tsx";
import Design from "./Design.tsx";
import Analyze from "./Analyze.tsx";
import Code from "./Code.tsx";

export default function About() {
  return (
    <>
      <Background />
      <FrontPage />
      <CircleArrowDown />
      <div id="about-sections">
        <Analyze />
        <Design />
        <Code />
      </div>
      <CircleArrowDown />
      <Create />
    </>
  );
}
