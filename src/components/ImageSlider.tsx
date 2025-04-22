import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type ImageSliderProps = {
  urls: string[];
};

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [translatePercent, setTranslatePercent] = useState(0);
  const ulListRef = useRef<HTMLUListElement>(null);
  const firstImageRef = useRef<HTMLLIElement>(null);

  const calculateTranslatePercent = () => {
    if (ulListRef.current && firstImageRef.current) {
      const ulListWidth = ulListRef.current.clientWidth - 20;

      const firstImageWidth = firstImageRef.current.clientWidth;

      const imageRatio = (firstImageWidth / ulListWidth) * 100;

      setTranslatePercent(imageRatio);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTranslatePercent();
    }, 100);

    const handleResize = () => {
      calculateTranslatePercent();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "opacity 0.3s",
          }}
        >
          <IoIosArrowBack size={24} />
        </button>
      )}

      {isHovering && (
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "opacity 0.3s",
          }}
        >
          <IoIosArrowForward size={24} />
        </button>
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        <ul
          ref={ulListRef}
          style={{
            position: "relative",
            zIndex: 0,
            margin: "0 20px",
            whiteSpace: "nowrap",
            transform: `translate3d(-${currentIndex * translatePercent}%, 0px, 0px)`,
            transition: "transform 0.4s cubic-bezier(0.5, 0, 0.1, 1) 0s",
          }}
        >
          {urls.map((url, index) => (
            <li
              key={index}
              ref={index === 0 ? firstImageRef : null}
              style={{
                width: "100%",
                maxWidth: "1160px",
                position: "relative",
                display: "inline-block",
                padding: "0 10px",
                cursor: "pointer",
                verticalAlign: "top",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    aspectRatio: "16/9",
                    margin: 0,
                  }}
                >
                  <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ImageSlider;
