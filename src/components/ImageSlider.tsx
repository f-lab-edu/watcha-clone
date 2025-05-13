import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImagePathForOriginal } from "../constants/ImagePath";

type ImageSliderProps = {
  urls: string[];
};

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const aspectRatio = 16 / 9;
  const desktopMainImageWidth = 980;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setIsMobile(window.innerWidth < 1280);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
  };

  const mainImageWidth = isMobile ? containerWidth : desktopMainImageWidth;
  const mainImageHeight = mainImageWidth / aspectRatio;

  const containerStyle = {
    position: "relative" as const,
    width: "100%",
    overflow: "visible" as const,
    marginBottom: "40px",
  };

  const sliderContentStyle = {
    position: "relative" as const,
    width: "100%",
    height: `${mainImageHeight}px`,
    overflow: "hidden" as const,
  };

  const imagesContainerStyle = {
    display: "flex",
    transition: "transform 400ms cubic-bezier(0.5, 0, 0.1, 1) 0s",
    transform: `translateX(-${currentIndex * mainImageWidth}px)`,
    height: "100%",
  };

  const mainImageStyle = {
    flexShrink: 0 as const,
    width: `${mainImageWidth}px`,
    height: "100%",
    position: "relative" as const,
    padding: isMobile ? "0" : "0 10px 0 0",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "8px",
  };

  const buttonBaseStyle = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
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
    zIndex: 10,
    opacity: showControls ? 1 : 0,
    transition: "opacity 150ms",
  };

  const leftButtonStyle = {
    ...buttonBaseStyle,
    left: "10px",
    display: currentIndex > 0 ? "flex" : "none",
  };

  const rightButtonStyle = {
    ...buttonBaseStyle,
    right: "10px",
    display: currentIndex < urls.length - 1 ? "flex" : "none",
  };

  if (!urls || urls.length === 0) {
    return null;
  }

  return (
    <div
      style={containerStyle}
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div style={sliderContentStyle}>
        <div style={imagesContainerStyle}>
          {urls.map((url, index) => (
            <div key={`main-${index}`} style={mainImageStyle}>
              <img
                src={`${ImagePathForOriginal}${url}`}
                style={imageStyle}
                alt={`슬라이드 이미지 ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          style={leftButtonStyle}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="이전 이미지"
        >
          <IoIosArrowBack size={24} />
        </button>

        <button
          style={rightButtonStyle}
          onClick={handleNext}
          disabled={currentIndex === urls.length - 1}
          aria-label="다음 이미지"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
