import { tmdbRequest } from "./tmdbRequest";

const fetchPopularMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
  return tmdbRequest(url);
};

export const tmdbAPI = {
  fetchPopularMovies,
};
