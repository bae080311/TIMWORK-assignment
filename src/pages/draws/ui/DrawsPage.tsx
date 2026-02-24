import { metadata } from "@shared/config/index";
import DrawList from "@widgets/draws/ui/DrawList";

function DrawsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 mt-1">
          {metadata.project.name}
        </h1>
        <DrawList />
      </div>
    </main>
  );
}

export default DrawsPage;
