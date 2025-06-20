import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "@Apis/commentApi";
import { CommentType } from "@Types/CommentType";

export const getCommentsQuery = (movieId: string) => {
  return useQuery({
    queryKey: ["comments", movieId],
    queryFn: () => fetchComments(movieId),
  });
};

export const createCommentMutation = (movieId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      comment: Omit<CommentType, "id" | "url" | "created_at" | "updated_at">
    ) => createComment(movieId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", movieId] });
    },
  });
};

export const updateCommentMutation = (movieId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      updates,
    }: {
      commentId: string;
      updates: Partial<CommentType>;
    }) => updateComment(commentId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", movieId] });
    },
  });
};

export const deleteCommentMutation = (movieId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", movieId] });
    },
  });
};
