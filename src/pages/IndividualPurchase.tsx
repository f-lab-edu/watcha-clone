import { usePopularMoviesQuery } from "@Apis/fetchPopularMovies";
import ChipList from "@Components/commons/ChipList";
import { TopHeader } from "@Components/commons/TopHeader";
import { lazy, Suspense, useState } from "react";

const ImageSlider = lazy(() => import("@Components/commons/ImageSlider"));
const ImageSliderSmall = lazy(
  () => import("@Components/commons/ImageSliderSmall")
);

const IndividualPurchase = () => {
  const { data: movies } = usePopularMoviesQuery();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <TopHeader />
      <main
        style={{
          margin: "0 auto",
          maxWidth: "105em",
          padding: "0 20px",
        }}
      >
        <ChipList
          chips={["추천", "#왓챠의 발견", "#한국", "#애니메이션", "성인+"]}
          selectedIndex={selectedIndex}
          onChipClick={setSelectedIndex}
        />
        <Suspense
          fallback={
            <div style={{ height: "550px", background: "#1a1a1a" }}>
              메인 슬라이더 로딩중...
            </div>
          }
        >
          <ImageSlider movies={movies.results} />
        </Suspense>

        <Suspense
          fallback={
            <div style={{ height: "300px", background: "#1a1a1a" }}>
              추천 영화 로딩중...
            </div>
          }
        >
          <ImageSliderSmall title="Popular Movies" movies={movies.results} />
        </Suspense>
      </main>
    </div>
  );
};

export default IndividualPurchase;
