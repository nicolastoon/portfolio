import { CircleArrowDown } from "lucide-react";

export default function ScrollArrow(id: {location: string}) {
  return (
    <div className="scroll-arrow" id={id.location}>
      <CircleArrowDown />
    </div>
  );
}
