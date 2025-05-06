import { TopHeader } from "./components/TopHeader";
import ImageSlider from "./components/ImageSlider";
import { usePopularMovies } from "./apis/fetchPopularMovies";

function App() {
  const { data: movies, isLoading } = usePopularMovies();

  console.log(movies);

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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ImageSlider
              urls={movies?.map((movie) => movie.poster_path) || []}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
