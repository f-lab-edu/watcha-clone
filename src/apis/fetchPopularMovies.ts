import { useSuspenseQuery } from "@tanstack/react-query";
import { Movie } from "@Types/Movie";
import { tmdbRequest } from "./tmdbRequest";

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const usePopularMoviesQuery = () => {
  const query = useSuspenseQuery<MovieResponse>({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const response = await tmdbRequest({
        method: "GET",
        endpoint: "/movie/popular",
        queryParams: {},
      });
      if (!response) {
        throw new Error("Failed to fetch popular movies");
      }
      return response as MovieResponse;
    },
  });

  return {
    ...query,
    data: query.data?.results,
  };
};
