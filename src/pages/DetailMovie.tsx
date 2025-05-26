import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailMovie = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("Movie ID:", id);
  }, []);

  return (
    <div>
      <h1 style={{ color: "red", padding: "20px" }}>Detail Movie Page</h1>
    </div>
  );
};

export default DetailMovie;
