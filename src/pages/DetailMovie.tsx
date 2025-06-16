import { useFetchDetailMovie } from "@Apis/fetchDetailMovie";
import { TopHeader } from "@Components/commons/TopHeader";
import { useParams } from "react-router-dom";
import { getRunningTime } from "../utils/getRunningTime";
import { CommentType } from "@Types/CommentType";
import Comment from "@Components/detail/Comment";
import { useState } from "react";

const commentMockData: CommentType[] = [
  {
    author: "John Doe",
    author_details: {
      name: "John Doe",
      username: "johndoe",
      avatar_path: "/path/to/avatar.jpg",
      rating: 4,
    },
    content:
      "인간이 사라진 숲에 남은 것은 불가항력의 힘에 맞서려 하지 않는 자연의 연대 <인사이드 아웃 2>를 제치고 아카데미 장편애니메이션상을 수상한 <플로우>는 블렌더 사용, 무언극 등 다양한 요소로 화제가 되었다. 무료 프로그램인 블렌더만으로도 웬만한 3D 애니메이션에 맞먹는 완성도를 이룬 것이 우선 인상적이다. 무언극으로서 동물의 행동만으로 2시간을 가득 채우는데, 전반적인 구성이나 때깔이 마치 게임 아트를 보는 듯하다.",
    created_at: "2023-10-01T12:00:00Z",
    id: "1",
    updated_at: "2023-10-01T12:00:00Z",
    url: "https://example.com/comment/1",
  },
];

const DetailMovie = () => {
  const { id } = useParams();
  const { data } = useFetchDetailMovie(id || "");
  const [commentText, setCommentText] = useState("");
  const [commentData, setCommentData] =
    useState<CommentType[]>(commentMockData);

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;
    const newComment: CommentType = {
      id: String(commentData.length + 1),
      author: "Current User",
      author_details: {
        name: "Current User",
        username: "currentuser",
        avatar_path: "/path/to/currentuser/avatar.jpg",
        rating: 3,
      },
      content: commentText,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      url: `https://example.com/comment/${commentData.length + 1}`,
    };
    setCommentData([...commentData, newComment]);
    setCommentText("");
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
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "relative",
            }}
            alt={data.title}
          />
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
              {data.title}
            </h1>
            <div style={{ marginBottom: "16px" }}>
              <span>12세</span>·<span>평균 {data.vote_average}</span>·
              <span>{data.release_date.slice(0, 4)}</span>·
              <span>{getRunningTime(data.runtime)}</span>·
              {data.genres.map((genre, index, array) => (
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
              {data.overview}
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {commentData.map((comment) => (
            <Comment
              key={comment.id}
              username={
                comment.author_details.name || comment.author_details.username
              }
              rating={comment.author_details.rating || 0}
              content={comment.content}
            />
          ))}
        </div>
        <div>
          <input
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
          <button onClick={handleCommentSubmit}>댓글 작성</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
