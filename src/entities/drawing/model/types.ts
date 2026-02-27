import type { Revision } from "./detailTypes";

export type RevisionSummary = Omit<Revision, "image">;

export interface DrawingDisciplineInfo {
  name: string;
  latestRevision: RevisionSummary | null;
}

export interface DrawingListItem {
  id: string;
  name: string;
  disciplines: DrawingDisciplineInfo[];
  latestDate: string | null;
}
