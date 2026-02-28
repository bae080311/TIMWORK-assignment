import { getDrawingList } from "@entities/draws/model/selectors";
import DrawingCard from "@entities/draws/ui/DrawingCard";

export default function DrawList() {
  const drawings = getDrawingList();

  return (
    <div className="flex flex-col gap-3">
      {drawings.map((drawing) => (
        <DrawingCard key={drawing.id} drawing={drawing} />
      ))}
    </div>
  );
}
