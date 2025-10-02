import Button from "./Button.tsx";
import { House } from "lucide-react";
import { FolderCode } from "lucide-react";

export default function Navigation() {
  const menu = [
    {
      id: "item-01",
      icon: () => <House />,
      action: "#",
      name: "home",
    },
    {
      id: "item-02",
      icon: () => <FolderCode />,
      action: "#/projects",
      name: "projects",
    },
  ];

  function createNav() {
    return menu.map((item) => (
      <Button key={item.id} icon={item.icon()} action={item.action} name={item.name} />
    ));
  }

  return (
    <div className="button-panel" id="navigation">
      {createNav()}
    </div>
  );
}
