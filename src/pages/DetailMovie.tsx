import { useFetchDetailMovie } from "@Apis/fetchDetailMovie";
import { usePostReviewQuery } from "@Apis/postReview";
import { useParams } from "react-router-dom";

const DetailMovie = () => {
  const { id } = useParams();
  const { data } = useFetchDetailMovie(id || "");

  console.log("DetailMovie data", data);

  return (
    <div>
      <h1 style={{ color: "red", padding: "20px" }}>Detail Movie Page</h1>
      {data.overview}
    </div>
  );
};

export default DetailMovie;
