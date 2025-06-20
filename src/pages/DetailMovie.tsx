import { useFetchDetailMovie } from "@Apis/fetchDetailMovie";
import { TopHeader } from "@Components/commons/TopHeader";
import { useParams } from "react-router-dom";
import { getRunningTime } from "../utils/getRunningTime";
import { CommentType } from "@Types/CommentType";
import Comment from "@Components/detail/Comment";
import { useState } from "react";
import { createCommentMutation, getCommentsQuery } from "../hooks/useComments";

const DetailMovie = () => {
  const { id = "" } = useParams();
  const { data: movieData } = useFetchDetailMovie(id);
  const { data: comments = [], isLoading: isLoadingComments } =
    getCommentsQuery(id);
  const postComment = createCommentMutation(id);

  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;

    const newComment: Omit<
      CommentType,
      "id" | "url" | "created_at" | "updated_at"
    > = {
      author: "Current User",
      author_details: {
        name: "Current User",
        username: "currentuser",
        avatar_path: "/avatar.png",
        rating: rating * 2,
      },
      content: commentText,
      movieId: "111",
    };

    postComment.mutate(newComment, {
      onSuccess: () => {
        setCommentText("");
        setRating(5);
      },
    });
  };

  return (
    <div>
      <TopHeader />
      <div
        style={{
          position: "relative",
          height: "fit-content",
          borderBottom: "1px solid #222326",
        }}
      >
        <div
          style={{
            width: "500px",
            position: "absolute",
            top: 0,
            right: 0,
            aspectRatio: "16/9",
          }}
        >
          {movieData?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "relative",
              }}
              alt={movieData.title}
            />
          )}
          <div
            style={{
              position: "absolute",
              top: "-2%",
              left: "-3%",
              width: "70%",
              height: "102%",
              content: '""',
              background:
                "linear-gradient(90deg, #000 5%, #000000b3 30%, #00000073 50%, #0003 80%, #0000)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "33%",
              left: "0",
              width: "100%",
              height: "68%",
              content: '""',
              background:
                "linear-gradient(0deg, #000 14%, #000000e6 32%, #000c 45%, #00000073 70%, #0000)",
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            position: "relative",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: "16px 0px",
              }}
            >
              {movieData?.title}
            </h1>
            <div style={{ marginBottom: "16px" }}>
              <span>12세</span>·<span>평균 {movieData?.vote_average}</span>·
              <span>{movieData?.release_date?.slice(0, 4)}</span>·
              <span>
                {movieData?.runtime ? getRunningTime(movieData.runtime) : ""}
              </span>
              ·
              {movieData?.genres?.map((genre, index, array) => (
                <span key={genre.id} style={{ marginRight: "8px" }}>
                  {genre.name}
                  {index < array.length - 1 ? " · " : ""}
                </span>
              ))}
            </div>
            <p
              style={{
                maxWidth: "440px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                marginBottom: "16px",
              }}
            >
              {movieData?.overview}
            </p>
            <p
              style={{
                marginBottom: "24px",
              }}
            >
              미리보기
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <button
                  style={{
                    height: "40px",
                    padding: "0px 16px",
                    background: "#f82f62",
                    border: "none",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                  }}
                >
                  구매하기
                </button>
                <button
                  style={{
                    height: "40px",
                    padding: "0px 16px",
                    background: "#f82f62",
                    border: "none",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                  }}
                >
                  선물하기
                </button>
              </div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <span>보고싶어요</span>
                <span>평가하기</span>
                <span>왓챠피티</span>
                <span>더보기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "0 40px",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "16px 0",
            color: "#FFFFFF",
          }}
        >
          왓챠파디아 사용자 평
        </p>

        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            backgroundColor: "#222326",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              평점
            </label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= rating ? "#FFD700" : "#ccc",
                  }}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              댓글
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "8px",
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
              }}
              placeholder="영화에 대한 감상을 남겨주세요"
            />
          </div>
          <button
            onClick={handleCommentSubmit}
            disabled={postComment.isPending}
            style={{
              height: "40px",
              padding: "0px 16px",
              background: "#f82f62",
              border: "none",
              borderRadius: "4px",
              color: "#FFFFFF",
              cursor: postComment.isPending ? "not-allowed" : "pointer",
              opacity: postComment.isPending ? 0.7 : 1,
            }}
          >
            {postComment.isPending ? "작성 중..." : "댓글 작성"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {isLoadingComments ? (
            <div>댓글을 불러오는 중...</div>
          ) : comments.length === 0 ? (
            <div>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</div>
          ) : (
            comments.map((comment: CommentType) => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
