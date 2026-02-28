import rawMetadata from '@shared/data/metadata.json'
import type { RawMetadata, DisciplineData, RawRevision } from '@shared/types/metadata'
import type { DrawingDetail, DisciplineDetail, Revision, HistoryEntry } from './detailTypes'

const metadata = rawMetadata as RawMetadata

function normalizeRevision(r: RawRevision): Revision {
  return { version: r.version, image: r.image, date: r.date, description: r.description, changes: r.changes ?? [] }
}

function normalizeDiscipline(name: string, data: DisciplineData): DisciplineDetail {
  const revisions = (data.revisions ?? []).map(normalizeRevision)

  const regions = data.regions
    ? Object.entries(data.regions).map(([key, region]) => ({
        name: key,
        revisions: region.revisions.map(normalizeRevision),
      }))
    : []

  return { name, baseImage: data.image, revisions, regions }
}

export function getDrawingById(id: string): DrawingDetail | null {
  const drawing = metadata.drawings[id]
  if (!drawing) return null

  const disciplines = Object.entries(drawing.disciplines ?? {}).map(([name, data]) =>
    normalizeDiscipline(name, data),
  )

  return { id: drawing.id, name: drawing.name, disciplines }
}

export function buildHistory(detail: DrawingDetail): HistoryEntry[] {
  const entries: HistoryEntry[] = []

  for (const discipline of detail.disciplines) {
    for (const rev of discipline.revisions) {
      entries.push({ disciplineName: discipline.name, revision: rev })
    }
    for (const region of discipline.regions) {
      for (const rev of region.revisions) {
        entries.push({ disciplineName: discipline.name, regionName: region.name, revision: rev })
      }
    }
  }

  return entries.sort((a, b) => a.revision.date.localeCompare(b.revision.date))
}

export function getOverlayImage(discipline: DisciplineDetail): string | undefined {
  if (discipline.baseImage) return discipline.baseImage
  if (discipline.revisions.length > 0) {
    return discipline.revisions.reduce((a, b) => (a.date > b.date ? a : b)).image
  }
  const allRegionRevs = discipline.regions.flatMap(r => r.revisions)
  if (allRegionRevs.length > 0) {
    return allRegionRevs.reduce((a, b) => (a.date > b.date ? a : b)).image
  }
  return undefined
}
