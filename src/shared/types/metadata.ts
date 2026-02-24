export interface Revision {
  version: string
  image: string
  date: string
  description: string
  changes: string[]
  imageTransform?: Record<string, unknown>
  polygon?: Record<string, unknown>
}

export interface Region {
  polygon: Record<string, unknown>
  revisions: Revision[]
}

export interface DisciplineData {
  image?: string
  imageTransform?: Record<string, unknown>
  polygon?: Record<string, unknown>
  revisions?: Revision[]
  regions?: Record<string, Region>
}

export interface DrawingPosition {
  vertices: number[][]
  imageTransform: {
    x: number
    y: number
    scale: number
    rotation: number
  }
}

export interface RawDrawing {
  id: string
  name: string
  image: string
  parent: string | null
  position: DrawingPosition | null
  disciplines?: Record<string, DisciplineData>
}

export interface RawMetadata {
  project: {
    name: string
    unit: string
  }
  disciplines: Array<{ name: string }>
  drawings: Record<string, RawDrawing>
}
