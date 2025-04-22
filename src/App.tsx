import { TopNavigation } from "./components/TopNavigation";
import ImageSlider from "./components/ImageSlider";

const urls = [
  "https://cdn.newstof.com/news/photo/202303/20152_20196_3216.jpg",
  "https://img.khan.co.kr/news/2024/03/23/news-p.v1.20240323.c159a4cab6f64473adf462d873e01e43_P1.webp",
  "https://images.mypetlife.co.kr/content/uploads/2021/10/19151330/corgi-g1a1774f95_1280.jpg",
];

function App() {
  return (
    <div
      style={{
        background: "#000000",
        color: "#FFFFFF",
        margin: 0,
        height: "100vh",
      }}
    >
      <TopNavigation />
      <main
        style={{
          margin: "0 auto",
          maxWidth: "105em",
          padding: "0 20px",
        }}
      >
        <div>
          <ImageSlider urls={urls} />
        </div>
      </main>
    </div>
  );
}

export default App;
