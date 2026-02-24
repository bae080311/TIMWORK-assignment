import { useParams, useNavigate } from 'react-router-dom'
import { getDrawingById } from '@entities/drawing/model/detail.selectors'
import DrawingDetail from '@widgets/drawing-detail/ui/DrawingDetail'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const drawing = id ? getDrawingById(id) : null

  if (!drawing) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-400">도면을 찾을 수 없습니다.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/draws')}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← 목록
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <div>
            <span className="text-xs font-mono font-semibold text-brand-600">#{drawing.id}</span>
            <h1 className="text-xl font-bold text-gray-900">{drawing.name}</h1>
          </div>
        </div>

        <DrawingDetail drawing={drawing} />
      </div>
    </main>
  )
}
