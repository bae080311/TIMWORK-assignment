import { useState } from "react";
import type { Revision } from "@entities/draws/model/detailTypes";
import RevisionDetail from "./RevisionDetail";

interface Props {
  revisions: Revision[];
  alt?: string;
}

export default function RevisionViewer({ revisions, alt = "" }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const revision = revisions[selectedIdx];

  if (revisions.length === 0) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {revisions.map((rev, idx) => (
          <button
            key={rev.version}
            onClick={() => setSelectedIdx(idx)}
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
              selectedIdx === idx
                ? "bg-brand-500 text-white border-brand-500"
                : "text-gray-600 border-gray-300 hover:border-brand-300"
            }`}
          >
            {rev.version}
            <span className="opacity-70">{rev.date}</span>
          </button>
        ))}
      </div>

      {revision && <RevisionDetail revision={revision} alt={alt} />}
    </div>
  );
}
