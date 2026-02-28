import rawMetadata from "@shared/data/metadata.json";
import type { RawMetadata } from "@shared/types/metadata";

const metadata = rawMetadata as RawMetadata;
import type { DisciplineData } from "@shared/types/metadata";
import type {
  DrawingListItem,
  DrawingDisciplineInfo,
  RevisionSummary,
} from "./types";

function getLatestRevision(discipline: DisciplineData): RevisionSummary | null {
  const revisions = discipline.revisions ?? [];

  if (revisions.length === 0 && discipline.regions) {
    const regionRevisions = Object.values(discipline.regions).flatMap(
      (r) => r.revisions,
    );
    if (regionRevisions.length === 0) return null;
    const latest = [...regionRevisions].sort((a, b) =>
      b.date.localeCompare(a.date),
    )[0];
    return {
      version: latest.version,
      date: latest.date,
      description: latest.description,
      changes: latest.changes ?? [],
    };
  }

  if (revisions.length === 0) return null;
  const latest = [...revisions].sort((a, b) => b.date.localeCompare(a.date))[0];
  return {
    version: latest.version,
    date: latest.date,
    description: latest.description,
    changes: latest.changes ?? [],
  };
}

export function getDrawingList(): DrawingListItem[] {
  return Object.values(metadata.drawings)
    .filter((d) => d.parent)
    .map((drawing) => {
      const disciplines: DrawingDisciplineInfo[] = Object.entries(
        drawing.disciplines ?? {},
      ).map(([name, data]) => ({
        name,
        latestRevision: getLatestRevision(data),
      }));

      const dates = disciplines
        .map((d) => d.latestRevision?.date)
        .filter(Boolean) as string[];
      const latestDate =
        dates.length > 0
          ? [...dates].sort((a, b) => b.localeCompare(a))[0]
          : null;

      return { id: drawing.id, name: drawing.name, disciplines, latestDate };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}
