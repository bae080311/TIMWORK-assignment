import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DrawsPage from "@pages/draws/ui/DrawsPage";
// import DetailPage from "@pages/detail/ui/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/draws" element={<DrawsPage />} />
        {/* <Route path="/draws/detail/:id" element={<DetailPage />} /> */}
        <Route path="*" element={<Navigate to="/draws" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
