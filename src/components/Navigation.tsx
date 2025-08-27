import Button from "./Button.tsx";
import { House } from "lucide-react";
import { FolderCode } from "lucide-react";
import { Briefcase } from "lucide-react";

export default function Navigation() {
  const menu = [
    {
      id: "item-01",
      icon: () => <House />,
      action: "https://www.linkedin.com/in/nicolastoon/",
      name: "home",
    },
    {
      id: "item-02",
      icon: () => <FolderCode />,
      action: "https://github.com/nicolastoon",
      name: "projects",
    },
    {
      id: "item-03",
      icon: () => <Briefcase />,
      action: "mailto:nicolastoon05@gmail.com",
      name: "experience",
    },
  ];

  function createNav() {
    return menu.map((item) => (
      <Button key={item.id} icon={item.icon()} action={item.action} name={item.name} type="navigation"/>
    ));
  }

  return (
    <div className="panel button-panel" id="navigation">
      {createNav()}
    </div>
  );
}
