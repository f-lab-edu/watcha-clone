import { Movie } from "../types/Movie";
import { useTmdbQuery } from "./tmdbRequest";

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const usePopularMovies = () => {
  const query = useTmdbQuery<MovieResponse>(
    ["popularMovies"],
    "/movie/popular"
  );

  return {
    ...query,
    data: query.data?.results,
  };
};
