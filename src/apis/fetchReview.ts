import { useSuspenseQuery } from "@tanstack/react-query";
import { tmdbRequest } from "./tmdbRequest";
import { Review } from "@Types/Review";

export type ReviewResponse = {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
};

export const useFetchReviewQuery = (id: string) => {
  const query = useSuspenseQuery<ReviewResponse>({
    queryKey: ["fetchReview"],
    queryFn: async () => {
      const response = await tmdbRequest({
        method: "GET",
        endpoint: `movie/${id}/reviews`,
        queryParams: {},
      });
      if (!response) {
        throw new Error("Failed to fetch reviews");
      }
      return response as ReviewResponse;
    },
  });

  return {
    ...query,
    data: query.data?.results,
  };
};
