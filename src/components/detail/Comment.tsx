import styled from "styled-components";

type CommentProps = {
  profileImage?: string;
  username: string;
  rating: number;
  content: string;
};

const CommentContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ProfileImageContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const RatingContainer = styled.span``;

const Star = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? "#FFD700" : "#ccc")};
`;

const CommentText = styled.div``;

const getRatingStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Star key={i} active={i < rating}>
        ⭐
      </Star>
    );
  }
  return stars;
};

const Comment = ({ profileImage, username, rating, content }: CommentProps) => {
  return (
    <CommentContainer>
      <ProfileImageContainer>
        <ProfileImage src={profileImage ?? "/avatar.png"} alt="프로필 이미지" />
      </ProfileImageContainer>
      <CommentContent>
        <UserInfoContainer>
          <Username>{username}</Username>
          <RatingContainer>{getRatingStars(rating)}</RatingContainer>
        </UserInfoContainer>
        <CommentText>{content}</CommentText>
      </CommentContent>
    </CommentContainer>
  );
};

export default Comment;
