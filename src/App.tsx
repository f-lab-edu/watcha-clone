import { TopHeader } from "./components/TopHeader";
import ImageSlider from "./components/ImageSlider";
import { usePopularMoviesQuery } from "./apis/fetchPopularMovies";
import ImageSliderSmall from "./components/ImageSliderSmall";
import ChipList from "./components/ChipList";
import { useState } from "react";

function App() {
  const { data: movies, isLoading } = usePopularMoviesQuery();
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
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ImageSlider
              urls={movies?.map((movie) => movie.poster_path) || []}
            />
          )}
        </div>
        <div>
          <ImageSliderSmall
            title="Popular Movies"
            urls={movies?.map((movie) => movie.poster_path) || []}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
