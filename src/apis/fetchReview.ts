import { useSuspenseQuery } from "@tanstack/react-query";
import { tmdbRequest } from "./tmdbRequest";
import { CommentType } from "@Types/CommentType";
import { convertSnakeToCamel } from "../utils/convertSnakeToCamel";

export type ReviewResponse = {
  id: number;
  page: number;
  results: CommentType[];
  totalPages: number;
  totalResults: number;
};

const fetchReview = async (id: string) =>
  (await tmdbRequest({
    method: "GET",
    endpoint: `movie/${id}/reviews`,
    queryParams: {},
  })
    .then((res) => res.data)
    .then(convertSnakeToCamel)) as ReviewResponse;

export const useFetchReviewQuery = (id: string) =>
  useSuspenseQuery<ReviewResponse>({
    queryKey: ["review", id],
    queryFn: () => fetchReview(id),
  });
