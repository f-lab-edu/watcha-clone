import { useCallback, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImagePathForOriginal } from "@Constants/ImagePath";

const ASPECT_RATIO = 16 / 9;
const DESKTOP_MAIN_IMAGE_WIDTH = 980;

const containerStyle = {
  position: "relative" as const,
  width: "100%",
  overflow: "visible" as const,
  marginBottom: "40px",
};

const sliderContentStyle = {
  position: "relative" as const,
  width: "100%",
  height: "auto",
  overflow: "hidden" as const,
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
  transition: "opacity 150ms",
};

const leftButtonBaseStyle = {
  ...buttonBaseStyle,
  left: "10px",
};

const rightButtonBaseStyle = {
  ...buttonBaseStyle,
  right: "10px",
};

type ImageSliderProps = {
  urls: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    setContainerWidth(node.offsetWidth);
    setIsMobile(window.innerWidth < 1280);

    const updateDimensions = () => {
      setContainerWidth(node.offsetWidth);
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
  };

  const mainImageWidth = isMobile ? containerWidth : DESKTOP_MAIN_IMAGE_WIDTH;
  const mainImageHeight = mainImageWidth / ASPECT_RATIO;

  const sliderContentStyleWithHeight = {
    ...sliderContentStyle,
    height: `${mainImageHeight}px`,
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

  const leftButtonStyle = {
    ...leftButtonBaseStyle,
    opacity: showControls ? 1 : 0,
    display: currentIndex > 0 ? "flex" : "none",
  };

  const rightButtonStyle = {
    ...rightButtonBaseStyle,
    opacity: showControls ? 1 : 0,
    display: currentIndex < urls.length - 1 ? "flex" : "none",
  };

  if (!urls || urls.length === 0) {
    return null;
  }

  return (
    <div
      style={containerStyle}
      ref={containerCallbackRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div style={sliderContentStyleWithHeight}>
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
