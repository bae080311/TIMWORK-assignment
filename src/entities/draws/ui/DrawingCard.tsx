import { useNavigate } from "react-router-dom";
import { DISCIPLINE_COLOR } from "../const/DISCIPLINE_COLOR";
import type { DrawingListItem } from "../model/types";

function DrawingCard({ drawing }: { drawing: DrawingListItem }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/draws/detail/${drawing.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="rounded-xl border border-gray-200 px-6 py-5 hover:border-brand-400 transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-semibold text-brand-600">
            #{drawing.id}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-brand-700 transition-colors">
            {drawing.name}
          </h3>
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {drawing.latestDate}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {drawing.disciplines.map((discipline) => (
          <div key={discipline.name} className="flex items-center gap-1.5">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${DISCIPLINE_COLOR[discipline.name] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
            >
              {discipline.name}
            </span>
            {discipline.latestRevision && (
              <span className="text-xs text-gray-400 font-mono">
                {discipline.latestRevision.version}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrawingCard;
