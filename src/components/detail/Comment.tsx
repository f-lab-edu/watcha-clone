type CommentProps = {
  profileImage?: string;
  username: string;
  rating: number;
  content: string;
};

const Comment = ({ profileImage, username, rating, content }: CommentProps) => {
  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc" }}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
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
          src={profileImage ?? "/avatar.png"}
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
      </div>
    </div>
  );
};

export default Comment;
