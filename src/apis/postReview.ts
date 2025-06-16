import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { tmdbRequest } from "./tmdbRequest";
import { Review } from "@Types/CommentType";
import { getSessionId } from "./tmdbAuth";

export type ReviewResponse = {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
};

export const usePostReviewQuery = (id: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const sessionId = await getSessionId();
      if (!sessionId) {
        throw new Error("Session ID is required to post a review");
      }

      debugger;

      const response = await tmdbRequest({
        method: "POST",
        endpoint: `movie/${id}/reviews`,
        queryParams: { session_id: sessionId },
        requestBody: "hello",
      });

      if (!response) {
        throw new Error("Failed to post review");
      }

      return response;
    },
  });

  return {
    ...mutation,
    postReview: mutation.mutate,
  };
};
