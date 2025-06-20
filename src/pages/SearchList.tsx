import { TopHeader } from "@Components/commons/TopHeader";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { usefetchSearchMovie } from "@Apis/fetchSearchMovie";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const Container = styled.div``;

const ContentWrapper = styled.div`
  padding: 16px;
`;

const ResultsContainer = styled.div``;

const ResultTitle = styled.h2``;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const MovieCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const MovieInfo = styled.div`
  padding: 12px;
`;

const MovieTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 4px;
`;

const MovieYear = styled.p`
  font-size: 14px;
  color: #666;
`;

const NoResults = styled.div``;

const ErrorMessage = styled.div``;

const LoadingMessage = styled.div``;

const SearchResultContent = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data } = usefetchSearchMovie(query);

  if (!data?.results?.length)
    return <NoResults>검색 결과가 없습니다.</NoResults>;

  return (
    <ResultsContainer>
      <ResultTitle>"{query}" 검색 결과</ResultTitle>
      <MovieGrid>
        {data?.results.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieYear>{movie.release_date?.slice(0, 4)}</MovieYear>
            </MovieInfo>
          </MovieCard>
        ))}
      </MovieGrid>
    </ResultsContainer>
  );
};

const SearchList = () => {
  return (
    <Container>
      <TopHeader />
      <ContentWrapper>
        <ErrorBoundary
          fallback={
            <ErrorMessage>
              검색 결과를 불러오는 중에 오류가 발생했습니다.
            </ErrorMessage>
          }
        >
          <Suspense
            fallback={
              <LoadingMessage>검색 결과를 불러오는 중...</LoadingMessage>
            }
          >
            <SearchResultContent />
          </Suspense>
        </ErrorBoundary>
      </ContentWrapper>
    </Container>
  );
};

export default SearchList;
