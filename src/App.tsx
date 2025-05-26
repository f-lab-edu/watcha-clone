import { Route, Routes, Navigate } from "react-router-dom";
import IndividualPurchase from "./pages/IndividualPurchase";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/individual-purchase" replace />}
      />
      <Route path="/individual-purchase" element={<IndividualPurchase />} />
    </Routes>
  );
}

export default App;
