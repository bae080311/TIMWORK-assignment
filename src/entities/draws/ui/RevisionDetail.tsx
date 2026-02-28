import type { Revision } from "@entities/draws/model/detailTypes";
import { drawingImageUrl } from "@shared/lib/imageUrl";

interface Props {
  revision: Revision;
  alt?: string;
}

export default function RevisionDetail({ revision, alt = "" }: Props) {
  return (
    <>
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50 mb-4">
        <img
          src={drawingImageUrl(revision.image)}
          alt={`${alt} ${revision.version}`}
          className="w-full object-contain max-h-[500px]"
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            {revision.description}
          </p>
          {revision.changes.length > 0 ? (
            <ul className="mt-2 space-y-1.5">
              {revision.changes.map((change, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                  {change}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-gray-400">변경사항 없음</p>
          )}
        </div>
        <span className="text-xs text-gray-400 shrink-0">{revision.date}</span>
      </div>
    </>
  );
}
