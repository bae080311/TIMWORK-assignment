import { useParams, Link } from "react-router-dom";
import { getDrawingById } from "@entities/draws/model/detailSelectors";
import DrawingDetail from "@widgets/detail/ui/DrawingDetail";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const drawing = id ? getDrawingById(id) : null;

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/draws"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-8"
        >
          ← 목록으로
        </Link>

        {drawing ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              {drawing.name}
            </h1>
            <DrawingDetail key={drawing.id} drawing={drawing} />
          </>
        ) : (
          <p className="text-sm text-gray-500">도면을 찾을 수 없습니다.</p>
        )}
      </div>
    </main>
  );
}
