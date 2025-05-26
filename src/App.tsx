import { Route, Routes, Navigate } from "react-router-dom";
import IndividualPurchase from "./pages/IndividualPurchase";
import DetailMovie from "./pages/DetailMovie";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/individual-purchase" replace />}
      />
      <Route path="/individual-purchase" element={<IndividualPurchase />} />
      <Route path="/detail-movie/:id" element={<DetailMovie />} />
    </Routes>
  );
}

export default App;
