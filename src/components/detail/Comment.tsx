import { CommentType } from "@Types/CommentType";
import { ImagePathForOriginal } from "@Constants/ImagePath";

type CommentProps = {
  comment: CommentType;
};

const Comment = ({ comment }: CommentProps) => {
  const { author_details, content } = comment;
  const { username, rating, avatar_path } = author_details;

  const getRatingStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating / 2); // 10점 만점을 5점 만점으로 변환

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < roundedRating ? "#FFD700" : "#ccc" }}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  // 프로필 이미지 경로 처리
  const getProfileImage = () => {
    if (!avatar_path) return "/avatar.png";

    // TMDB API에서 가져온 이미지인 경우
    if (avatar_path.startsWith("/")) {
      return `${ImagePathForOriginal}${avatar_path}`;
    }

    return avatar_path;
  };

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={getProfileImage()}
          alt="프로필 이미지"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            {username}
          </span>
          <span>{getRatingStars(rating)}</span>
        </div>
        <div>{content}</div>
        <div style={{ fontSize: "12px", color: "#666" }}>
          {new Date(comment.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Comment;
