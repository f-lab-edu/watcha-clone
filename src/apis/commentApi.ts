import { CommentType } from "@Types/CommentType";

export const fetchComments = async (movieId: string) => {
  const response = await fetch(`/api/movies/${movieId}/comments`);

  if (!response.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }

  return response.json();
};

export const createComment = async (
  movieId: string,
  comment: Omit<CommentType, "id" | "url" | "created_at" | "updated_at">
): Promise<CommentType> => {
  const response = await fetch(`/api/movies/${movieId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("댓글 작성에 실패했습니다.");
  }

  return response.json();
};

export const fetchComment = async (commentId: string): Promise<CommentType> => {
  const response = await fetch(`/api/comments/${commentId}`);

  if (!response.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }

  return response.json();
};

export const updateComment = async (
  commentId: string,
  updates: Partial<CommentType>
): Promise<CommentType> => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("댓글 수정에 실패했습니다.");
  }

  return response.json();
};

export const deleteComment = async (commentId: string) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }
};
