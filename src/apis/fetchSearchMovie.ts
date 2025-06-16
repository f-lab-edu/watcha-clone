import { useSuspenseQuery } from "@tanstack/react-query";
import { Movie } from "@Types/Movie";
import { tmdbRequest } from "./tmdbRequest";

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const usefetchSearchMovie = (title: string) => {
  const query = useSuspenseQuery<MovieResponse>({
    queryKey: ["searchMovie", title],
    queryFn: async () => {
      const response = await tmdbRequest({
        method: "GET",
        endpoint: `search/movie`,
        queryParams: {
          language: "ko-KR",
          query: title,
        },
      });
      if (!response) {
        throw new Error("Failed to fetch search movie");
      }
      return response;
    },
  });

  return {
    ...query,
    data: query.data,
  };
};
