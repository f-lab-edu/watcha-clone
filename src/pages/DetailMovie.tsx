import { useFetchDetailMovie } from "@Apis/fetchDetailMovie";
import { TopHeader } from "@Components/TopHeader";
import { useParams } from "react-router-dom";
import { getRunningTime } from "../utils/getRunningTime";

const DetailMovie = () => {
  const { id } = useParams();
  const { data } = useFetchDetailMovie(id || "");

  console.log("DetailMovie data", data);

  return (
    <div>
      <TopHeader />
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: "16px",
          padding: "16px",
          height: "fit-content",
        }}
      >
        <div>
          <h1>{data.title}</h1>
          <div>
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
        </div>
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
            }}
            alt={data.title}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
