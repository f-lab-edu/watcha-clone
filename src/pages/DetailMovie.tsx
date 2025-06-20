import { useFetchDetailMovie } from "@Apis/fetchDetailMovie";
import { TopHeader } from "@Components/commons/TopHeader";
import { useParams } from "react-router-dom";
import { getRunningTime } from "@Utils/getRunningTime";
import { CommentType } from "@Types/CommentType";
import Comment from "@Components/detail/Comment";
import { useState } from "react";
import styled from "styled-components";

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

const Container = styled.div``;

const HeroSection = styled.div`
  position: relative;
  height: fit-content;
  border-bottom: 1px solid #222326;
`;

const PosterWrapper = styled.div`
  width: 500px;
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 16/9;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;

const LeftGradient = styled.div`
  position: absolute;
  top: -2%;
  left: -3%;
  width: 70%;
  height: 102%;
  content: "";
  background: linear-gradient(
    90deg,
    #000 5%,
    #000000b3 30%,
    #00000073 50%,
    #0003 80%,
    #0000
  );
  pointer-events: none;
`;

const BottomGradient = styled.div`
  position: absolute;
  top: 33%;
  left: 0;
  width: 100%;
  height: 68%;
  content: "";
  background: linear-gradient(
    0deg,
    #000 14%,
    #000000e6 32%,
    #000c 45%,
    #00000073 70%,
    #0000
  );
  pointer-events: none;
`;

const MovieInfoWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  position: relative;
  z-index: 999;
  width: 100%;
`;

const MovieTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 16px 0px;
`;

const MovieMeta = styled.div`
  margin-bottom: 16px;
`;

const MovieOverview = styled.p`
  max-width: 440px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 16px;
`;

const PreviewText = styled.p`
  margin-bottom: 24px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  height: 40px;
  padding: 0px 16px;
  background: #f82f62;
  border: none;
  border-radius: 4px;
  color: #ffffff;
`;

const ActionLinks = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionLink = styled.span`
  cursor: pointer;
`;

const CommentsSection = styled.div`
  padding: 0 40px;
`;

const CommentsTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
  color: #ffffff;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentForm = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333;
  background: #222;
  color: #fff;
`;

const CommentSubmitButton = styled.button`
  padding: 8px 16px;
  background: #f82f62;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
`;

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
    <Container>
      <TopHeader />
      <HeroSection>
        <PosterWrapper>
          <PosterImage
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
          />
          <LeftGradient />
          <BottomGradient />
        </PosterWrapper>
        <MovieInfoWrapper>
          <MovieTitle>{data.title}</MovieTitle>
          <MovieMeta>
            <span>12세</span>·<span>평균 {data.vote_average}</span>·
            <span>{data.release_date.slice(0, 4)}</span>·
            <span>{getRunningTime(data.runtime)}</span>·
            {data.genres.map((genre, index, array) => (
              <span key={genre.id} style={{ marginRight: "8px" }}>
                {genre.name}
                {index < array.length - 1 ? " · " : ""}
              </span>
            ))}
          </MovieMeta>
          <MovieOverview>{data.overview}</MovieOverview>
          <PreviewText>미리보기</PreviewText>
          <ActionContainer>
            <ButtonGroup>
              <ActionButton>구매하기</ActionButton>
              <ActionButton>선물하기</ActionButton>
            </ButtonGroup>
            <ActionLinks>
              <ActionLink>보고싶어요</ActionLink>
              <ActionLink>평가하기</ActionLink>
              <ActionLink>왓챠피티</ActionLink>
              <ActionLink>더보기</ActionLink>
            </ActionLinks>
          </ActionContainer>
        </MovieInfoWrapper>
      </HeroSection>
      <CommentsSection>
        <CommentsTitle>왓챠파디아 사용자 평</CommentsTitle>
        <CommentsList>
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
        </CommentsList>
        <CommentForm>
          <CommentInput
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
            placeholder="댓글을 입력하세요..."
          />
          <CommentSubmitButton onClick={handleCommentSubmit}>
            댓글 작성
          </CommentSubmitButton>
        </CommentForm>
      </CommentsSection>
    </Container>
  );
};

export default DetailMovie;
