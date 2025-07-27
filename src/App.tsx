import PageLoading from "@Components/loading/PageLoading";
import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const DetailMovie = lazy(() => import("./pages/DetailMovie"));
const IndividualPurchase = lazy(() => import("./pages/IndividualPurchase"));
const SearchList = lazy(() => import("./pages/SearchList"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/individual-purchase" replace />}
      />
      <Route
        path="/individual-purchase"
        element={
          <Suspense fallback={<PageLoading />}>
            <IndividualPurchase />
          </Suspense>
        }
      />
      <Route
        path="/detail-movie/:id"
        element={
          <Suspense fallback={<PageLoading />}>
            <DetailMovie />
          </Suspense>
        }
      />
      <Route
        path="/search"
        element={
          <Suspense fallback={<PageLoading />}>
            <SearchList />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
