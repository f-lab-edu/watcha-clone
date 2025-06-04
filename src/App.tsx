import { Route, Routes, Navigate } from "react-router-dom";
import IndividualPurchase from "./pages/IndividualPurchase";
import DetailMovie from "./pages/DetailMovie";
import SearchList from "./pages/SearchList";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/individual-purchase" replace />}
      />
      <Route path="/individual-purchase" element={<IndividualPurchase />} />
      <Route path="/detail-movie/:id" element={<DetailMovie />} />
      <Route path="/search" element={<SearchList />} />
    </Routes>
  );
}

export default App;
