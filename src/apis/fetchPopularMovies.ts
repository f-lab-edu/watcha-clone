import { useSuspenseQuery } from "@tanstack/react-query";
import { Movie } from "@Types/Movie";
import { tmdbRequest } from "./tmdbRequest";
import { convertSnakeToCamel } from "../utils/convertSnakeToCamel";

export type MovieResponse = {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
};

const popularMovies = async () =>
  (
    await tmdbRequest({
      method: "GET",
      endpoint: "movie/popular",
      queryParams: {},
    }).then((res) => res.data)
  ).then(convertSnakeToCamel) as MovieResponse;

export const usePopularMoviesQuery = () =>
  useSuspenseQuery<MovieResponse>({
    queryKey: ["popularMovies"],
    queryFn: popularMovies,
  });
