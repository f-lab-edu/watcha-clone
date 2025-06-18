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

const searchMovie = async (title: string) =>
  await tmdbRequest({
    method: "GET",
    endpoint: `search/movie`,
    queryParams: {
      language: "ko-KR",
      query: title,
    },
    responseInterceptor: (res) => convertSnakeToCamel(res),
  });

export const useSearchMovieQuery = (title: string) =>
  useSuspenseQuery<MovieResponse>({
    queryKey: ["searchMovie", title],
    queryFn: () => searchMovie(title),
  });
