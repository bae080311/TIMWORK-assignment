export interface RevisionSummary {
  version: string
  date: string
  description: string
}

export interface DrawingDisciplineInfo {
  name: string
  latestRevision: RevisionSummary | null
}

export interface DrawingListItem {
  id: string
  name: string
  disciplines: DrawingDisciplineInfo[]
  latestDate: string | null
}
