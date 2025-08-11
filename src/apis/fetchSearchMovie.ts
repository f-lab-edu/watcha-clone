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

const searchMovie = (title: string) =>
  tmdbRequest({
    method: "GET",
    endpoint: `search/movie`,
    queryParams: {
      language: "ko-KR",
      query: title,
    },
    responseInterceptor: (res) => convertSnakeToCamel(res),
    maxRetries: 5,
    retryDelay: 2000,
  });

export const useSearchMovieQuery = (title: string) =>
  useSuspenseQuery<MovieResponse>({
    queryKey: ["searchMovie", title],
    queryFn: () => searchMovie(title),
  });
