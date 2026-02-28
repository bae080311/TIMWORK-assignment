import { useState } from "react";
import DisciplineChip from "@entities/draws/ui/DisciplineChip";
import { getOverlayImage } from "@entities/draws/model/detailSelectors";
import type { DrawingDetail } from "@entities/draws/model/detailTypes";
import { drawingImageUrl } from "@shared/lib/imageUrl";

interface Props {
  drawing: DrawingDetail;
}

export default function OverlayView({ drawing }: Props) {
  const layers = drawing.disciplines
    .map((d) => ({ name: d.name, image: getOverlayImage(d) }))
    .filter((l): l is { name: string; image: string } => l.image !== undefined);

  const [visible, setVisible] = useState<Set<string>>(
    new Set(layers.map((l) => l.name)),
  );

  const toggle = (name: string) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {layers.map((layer) => (
          <DisciplineChip
            key={layer.name}
            name={layer.name}
            active={visible.has(layer.name)}
            onClick={() => toggle(layer.name)}
          />
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
        <div className="relative">
          {layers.map((layer, idx) => (
            <img
              key={layer.name}
              src={drawingImageUrl(layer.image)}
              alt={layer.name}
              className={`transition-opacity duration-300 ${
                idx === 0
                  ? "relative w-full"
                  : "absolute inset-0 w-full h-full object-fill mix-blend-multiply"
              } ${visible.has(layer.name) ? "opacity-100" : "opacity-0"}`}
              style={{ zIndex: idx }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
