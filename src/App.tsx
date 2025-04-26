import { TopHeader } from "./components/TopHeader";
import ImageSlider from "./components/ImageSlider";
import { useEffect, useState } from "react";
import { tmdbAPI } from "./apis/fetchPopularMovies";
import { Movie } from "./types/Movie";

function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const fetchPopularMovies = async () => {
    try {
      const response = await tmdbAPI.fetchPopularMovies();
      console.log(response.results);
      setMovieList(response.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div
      style={{
        background: "#000000",
        color: "#FFFFFF",
        margin: 0,
        height: "100vh",
      }}
    >
      <TopHeader />
      <main
        style={{
          margin: "0 auto",
          maxWidth: "105em",
          padding: "0 20px",
        }}
      >
        <div>
          <ImageSlider urls={movieList.map((movie) => movie.poster_path)} />
        </div>
      </main>
    </div>
  );
}

export default App;
