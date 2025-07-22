import { http, HttpResponse, delay } from "msw";
import { CommentType } from "@Types/CommentType";

let comments: CommentType[] = [
  {
    author: "user1",
    author_details: {
      name: "John Doe",
      username: "johndoe",
      avatar_path: "/avatar.png",
      rating: 8.5,
    },
    content: "이 영화는 정말 재미있었습니다!",
    created_at: "2025-06-20T08:30:00.000Z",
    id: "1",
    updated_at: "2025-06-20T08:30:00.000Z",
    url: "/comment/1",
    movieId: "111",
  },
  {
    author: "user2",
    author_details: {
      name: "Jane Smith",
      username: "janesmith",
      avatar_path: null,
      rating: 7.0,
    },
    content: "스토리는 좋았지만 연출이 아쉬웠습니다.",
    created_at: "2025-06-19T15:45:00.000Z",
    id: "2",
    updated_at: "2025-06-19T15:45:00.000Z",
    url: "/comment/2",
    movieId: "222",
  },
  {
    author: "user3",
    author_details: {
      name: "Mike Johnson",
      username: "mikej",
      avatar_path: "/avatar.png",
      rating: 9.0,
    },
    content: "최고의 영화! 꼭 보세요!",
    created_at: "2025-06-18T10:15:00.000Z",
    id: "3",
    updated_at: "2025-06-18T10:15:00.000Z",
    url: "/comment/3",
    movieId: "333",
  },
];

export const commentHandlers = [
  http.get("/api/movies/:movieId/comments", async () => {
    await delay(500);

    return HttpResponse.json(comments);
  }),

  http.post("/api/movies/:id/comments", async ({ params, request }) => {
    const newComment = (await request.json()) as Omit<
      CommentType,
      "id" | "url" | "created_at" | "updated_at" | "movieId"
    >;

    await delay(500);

    const now = new Date().toISOString();
    const id = String(comments.length + 1);

    if (!params.id) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Movie ID is required",
      });
    }

    const createdComment: CommentType = {
      ...newComment,
      id,
      created_at: now,
      updated_at: now,
      url: `/comment/${id}`,
      movieId: params.id as string,
    };

    comments = [...comments, createdComment];

    return HttpResponse.json(createdComment, { status: 201 });
  }),

  http.put("/api/comments/:commentId", async ({ params, request }) => {
    const { commentId } = params;
    const updates = (await request.json()) as Partial<CommentType>;

    await delay(500);

    const commentIndex = comments.findIndex((c) => c.id === commentId);

    if (commentIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedComment = {
      ...comments[commentIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    comments = [
      ...comments.slice(0, commentIndex),
      updatedComment,
      ...comments.slice(commentIndex + 1),
    ];

    return HttpResponse.json(updatedComment);
  }),

  http.delete("/api/comments/:commentId", async ({ params }) => {
    const { commentId } = params;

    await delay(500);

    const commentIndex = comments.findIndex((c) => c.id === commentId);

    if (commentIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    comments = [
      ...comments.slice(0, commentIndex),
      ...comments.slice(commentIndex + 1),
    ];

    return new HttpResponse(null, { status: 204 });
  }),
];
