import { DISCIPLINE_COLOR } from "@entities/draws/const/DISCIPLINE_COLOR";
import { buildHistory } from "@entities/draws/model/detailSelectors";
import type { DrawingDetail } from "@entities/draws/model/detailTypes";

interface Props {
  drawing: DrawingDetail;
}

export default function HistoryView({ drawing }: Props) {
  const history = buildHistory(drawing);

  return (
    <div className="relative">
      <div className="absolute left-30 top-0 bottom-0 w-px bg-gray-200" />

      <div>
        {history.map((entry, i) => (
          <div key={i} className="flex gap-6 items-start py-4 relative">
            <span className="text-xs text-gray-400 w-28 text-right shrink-0 pt-0.5">
              {entry.revision.date}
            </span>

            <div
              className={`w-3 h-3 rounded-full mt-0.5 shrink-0 z-10 ring-2 ring-white ${
                entry.revision.changes.length > 0
                  ? "bg-brand-500"
                  : "bg-gray-300"
              }`}
            />

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DISCIPLINE_COLOR[entry.disciplineName] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
                >
                  {entry.disciplineName}
                </span>
                {entry.regionName && (
                  <span className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded font-medium">
                    구역 {entry.regionName}
                  </span>
                )}
                <span className="text-xs font-mono font-semibold text-gray-700">
                  {entry.revision.version}
                </span>
              </div>

              <p className="text-sm text-gray-700">
                {entry.revision.description}
              </p>

              {entry.revision.changes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {entry.revision.changes.map((change, j) => (
                    <span
                      key={j}
                      className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-100"
                    >
                      {change}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
