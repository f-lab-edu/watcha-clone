import { useSuspenseQuery } from "@tanstack/react-query";
import { Movie } from "@Types/Movie";
import { tmdbRequest } from "./tmdbRequest";

export const useFetchDetailMovie = (id: string) => {
  const query = useSuspenseQuery<Movie>({
    queryKey: ["detailMovie"],
    queryFn: async () => {
      const response = await tmdbRequest({
        method: "GET",
        endpoint: `movie/${id}`,
        queryParams: {
          language: "ko-KR",
        },
      });
      if (!response) {
        throw new Error("Failed to fetch deatil movie");
      }
      return response;
    },
  });

  return {
    ...query,
    data: query.data,
  };
};
