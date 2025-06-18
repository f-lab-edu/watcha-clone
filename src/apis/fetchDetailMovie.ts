import { useSuspenseQuery } from "@tanstack/react-query";
import { Movie } from "@Types/Movie";
import { tmdbRequest } from "./tmdbRequest";
import { convertSnakeToCamel } from "../utils/convertSnakeToCamel";

const detailMovie = async (id: string) =>
  await tmdbRequest({
    method: "GET",
    endpoint: `movie/${id}`,
    queryParams: {
      language: "ko-KR",
    },
    responseInterceptor: (res) => convertSnakeToCamel(res),
  });

export const useFetchDetailMovie = (id: string) =>
  useSuspenseQuery<Movie>({
    queryKey: ["detailMovie", id],
    queryFn: () => detailMovie(id),
  });
