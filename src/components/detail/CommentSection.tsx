import { lazy, Suspense } from "react";
import { CommentType } from "@Types/CommentType";
import CommentLoading from "@Components/loading/CommentLoading";

const Comment = lazy(() => import("./Comment"));

export default function CommentSection({
  comments,
}: {
  comments: CommentType[];
}) {
  if (comments.length === 0) return <div>불러올 댓글이 없습니다.</div>;
  return (
    <div>
      {comments.map((comment) => (
        <Suspense key={comment.id} fallback={<CommentLoading />}>
          <Comment comment={comment} />
        </Suspense>
      ))}
    </div>
  );
}
