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

const fetchReview = (id: string) =>
  tmdbRequest({
    method: "GET",
    endpoint: `movie/${id}/reviews`,
    queryParams: {},
  }).then((res) => convertSnakeToCamel(res.data) as ReviewResponse);

export const useFetchReviewQuery = (id: string) =>
  useSuspenseQuery<ReviewResponse>({
    queryKey: ["review", id],
    queryFn: () => fetchReview(id),
  });
