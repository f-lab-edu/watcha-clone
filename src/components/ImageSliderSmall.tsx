import { useCallback, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImagePathForOriginal } from "@Constants/ImagePath";

const ASPECT_RATIO = 16 / 9;
const DEFAULT_IMAGE_WIDTH = 290;

const containerStyle = {
  width: "100%",
};

const titleContainerStyle = {
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const sliderContainerStyle = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
} as const;

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 150ms",
} as const;

const imageLinkStyle = {
  display: "block",
  width: "100%",
  height: "100%",
};

const buttonBaseStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "8px",
  zIndex: 10,
  border: "none",
  cursor: "pointer",
  transition: "opacity 150ms",
} as const;

const leftButtonBaseStyle = {
  ...buttonBaseStyle,
  left: "0",
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
} as const;

const rightButtonBaseStyle = {
  ...buttonBaseStyle,
  right: "0",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
} as const;

type ImageSliderSmallProps = {
  title: string | React.ReactElement;
  urls: string[];
  gap?: number;
};

const ImageSliderSmall: React.FC<ImageSliderSmallProps> = ({
  title,
  urls,
  gap = 12,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    setContainerWidth(node.offsetWidth);

    const updateDimensions = () => {
      setContainerWidth(node.offsetWidth);
    };

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const calculateVisibleItems = () => {
    if (!containerWidth) return 5;

    if (containerWidth <= 970) {
      return 3;
    }

    const fullVisibleItems = Math.floor(
      (containerWidth + gap) / (DEFAULT_IMAGE_WIDTH + gap)
    );
    return fullVisibleItems;
  };

  const visibleItems = calculateVisibleItems();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - visibleItems;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = urls.length - visibleItems;
      const newIndex = prevIndex + visibleItems;
      return newIndex >= maxIndex ? maxIndex : newIndex;
    });
  };

  const calculateItemWidth = () => {
    if (!containerWidth) return DEFAULT_IMAGE_WIDTH;

    if (containerWidth > 970) {
      return DEFAULT_IMAGE_WIDTH;
    }

    const visibleItems = 3;
    const totalGapWidth = gap * (visibleItems - 1);
    return (containerWidth - totalGapWidth) / visibleItems;
  };

  const itemWidth = calculateItemWidth();
  const itemHeight = itemWidth / ASPECT_RATIO;

  const imagesContainerStyle = {
    display: "flex",
    transition: "transform 300ms ease-in-out",
    transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
  };

  const imageItemStyle = (index: number) => ({
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: "8px",
    width: `${itemWidth}px`,
    height: `${itemHeight}px`,
    marginRight: index < urls.length - 1 ? `${gap}px` : "0px",
  });

  const leftButtonStyle = {
    ...leftButtonBaseStyle,
    opacity: showControls ? 1 : 0,
    display: currentIndex > 0 ? "block" : "none",
  };

  const rightButtonStyle = {
    ...rightButtonBaseStyle,
    opacity: showControls ? 1 : 0,
    display: currentIndex < urls.length - visibleItems ? "block" : "none",
  };

  return (
    <div style={containerStyle}>
      <div style={titleContainerStyle}>
        {typeof title === "string" ? (
          <h2 style={titleStyle}>{title}</h2>
        ) : (
          title
        )}
      </div>

      <div
        style={sliderContainerStyle}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        ref={containerCallbackRef}
      >
        <div style={imagesContainerStyle}>
          {urls.map((image, index) => (
            <div key={`${image}_${index}`} style={imageItemStyle(index)}>
              <a href={image} style={imageLinkStyle}>
                <img
                  src={`${ImagePathForOriginal}${image}`}
                  style={imageStyle}
                  alt={`슬라이드 이미지 ${index + 1}`}
                />
              </a>
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
          disabled={currentIndex >= urls.length - visibleItems}
          aria-label="다음 이미지"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageSliderSmall;
