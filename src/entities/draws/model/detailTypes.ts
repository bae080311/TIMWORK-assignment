export interface Revision {
  version: string;
  image: string;
  date: string;
  description: string;
  changes: string[];
}

export interface Region {
  name: string;
  revisions: Revision[];
}

export interface DisciplineDetail {
  name: string;
  baseImage?: string;
  revisions: Revision[];
  regions: Region[];
}

export interface DrawingDetail {
  id: string;
  name: string;
  disciplines: DisciplineDetail[];
}

export interface HistoryEntry {
  disciplineName: string;
  regionName?: string;
  revision: Revision;
}
