import { useState } from "react";
import { DISCIPLINE_COLOR } from "@entities/draws/const/DISCIPLINE_COLOR";
import type {
  DrawingDetail,
  DisciplineDetail,
  Region,
} from "@entities/draws/model/detailTypes";
import RevisionViewer from "@entities/draws/ui/RevisionViewer";

function DisciplinePanel({ discipline }: { discipline: DisciplineDetail }) {
  return (
    <div>
      <RevisionViewer revisions={discipline.revisions} alt={discipline.name} />

      {discipline.regions.length > 0 && (
        <div
          className={
            discipline.revisions.length > 0
              ? "mt-8 pt-8 border-t border-gray-100"
              : ""
          }
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
            구역별 리비전
          </p>
          <div className="flex flex-col gap-10">
            {discipline.regions.map((region) => (
              <RegionPanel key={region.name} region={region} />
            ))}
          </div>
        </div>
      )}

      {discipline.revisions.length === 0 && discipline.regions.length === 0 && (
        <p className="text-sm text-gray-400">리비전 없음</p>
      )}
    </div>
  );
}

function RegionPanel({ region }: { region: Region }) {
  return (
    <div>
      <span className="inline-block text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded mb-4">
        구역 {region.name}
      </span>
      <RevisionViewer
        revisions={region.revisions}
        alt={`구역 ${region.name}`}
      />
    </div>
  );
}

interface Props {
  drawing: DrawingDetail;
}

export default function DisciplineView({ drawing }: Props) {
  const [selectedName, setSelectedName] = useState(
    drawing.disciplines[0]?.name ?? "",
  );
  const discipline = drawing.disciplines.find((d) => d.name === selectedName);

  return (
    <div className="grid grid-cols-[180px_1fr] gap-8">
      <nav className="flex flex-col gap-1">
        {drawing.disciplines.map((d) => {
          const allRevs = [
            ...d.revisions,
            ...d.regions.flatMap((r) => r.revisions),
          ];
          const latestRev = allRevs[allRevs.length - 1];
          return (
            <button
              key={d.name}
              onClick={() => setSelectedName(d.name)}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                selectedName === d.name ? "bg-brand-50" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DISCIPLINE_COLOR[d.name] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
              >
                {d.name}
              </span>
              {latestRev && (
                <span className="block text-xs text-gray-400 mt-1 pl-0.5">
                  {latestRev.version}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div>
        {discipline && (
          <DisciplinePanel key={selectedName} discipline={discipline} />
        )}
      </div>
    </div>
  );
}
