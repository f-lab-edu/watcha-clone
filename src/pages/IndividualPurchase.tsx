import { usePopularMoviesQuery } from "@Apis/fetchPopularMovies";
import ChipList from "@Components/commons/ChipList";
import ImageSlider from "@Components/commons/ImageSlider";
import ImageSliderSmall from "@Components/commons/ImageSliderSmall";
import { TopHeader } from "@Components/commons/TopHeader";
import { useState } from "react";

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
        <div>
          <ImageSlider movies={movies} />
        </div>
        <div>
          <ImageSliderSmall title="Popular Movies" movies={movies} />
        </div>
      </main>
    </div>
  );
};

export default IndividualPurchase;
