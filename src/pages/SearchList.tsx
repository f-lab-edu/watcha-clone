import { TopHeader } from "@Components/commons/TopHeader";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { usefetchSearchMovie } from "@Apis/fetchSearchMovie";

const SearchResultContent = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data } = usefetchSearchMovie(query);

  if (!data?.results?.length) return <div>검색 결과가 없습니다.</div>;

  return (
    <div>
      <h2>"{query}" 검색 결과</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {data?.results.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
                {movie.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {movie.release_date?.slice(0, 4)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchList = () => {
  return (
    <div>
      <TopHeader />
      <div style={{ padding: "16px" }}>
        <Suspense fallback={<div>검색 결과를 불러오는 중...</div>}>
          <SearchResultContent />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchList;
