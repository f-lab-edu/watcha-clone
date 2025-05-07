import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImagePathForOriginal } from "../constants/ImagePath";

type ImageSliderSmallProps = {
  title: string | React.ReactElement;
  urls: string[];
  gap?: number;
};

const ImageSliderSmall = ({ title, urls, gap = 12 }: ImageSliderSmallProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const aspectRatio = 16 / 9;
  const defaultImageWidth = 290;
  const calculateVisibleItems = () => {
    if (!containerWidth) return 5;

    if (containerWidth <= 970) {
      return 3;
    }

    const fullVisibleItems = Math.floor(
      (containerWidth + gap) / (defaultImageWidth + gap)
    );
    return fullVisibleItems;
  };

  const visibleItems = calculateVisibleItems();

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

  // 아이템 너비 계산
  const calculateItemWidth = () => {
    if (!containerWidth) return defaultImageWidth;

    // 970px 이상일 때 고정 너비 사용
    if (containerWidth > 970) {
      return defaultImageWidth;
    }

    // 970px 이하일 때는 컨테이너에 맞게 계산 (항상 3개의 이미지가 보이도록)
    const visibleItems = 3;
    const totalGapWidth = gap * (visibleItems - 1);
    return (containerWidth - totalGapWidth) / visibleItems;
  };

  const itemWidth = calculateItemWidth();
  // 이미지 높이는 16:9 비율로 계산
  const itemHeight = itemWidth / aspectRatio;

  // 인라인 스타일 정의
  const containerStyle = {
    width: "100%",
    marginBottom: "32px",
  } as const;

  const titleContainerStyle = {
    marginBottom: "16px",
  } as const;

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  } as const;

  const sliderContainerStyle = {
    position: "relative" as const,
    width: "100%",
    overflow: "hidden" as const,
  };

  const imagesContainerStyle = {
    display: "flex",
    transition: "transform 300ms ease-in-out",
    transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
  } as const;

  const imageItemStyle = (index: number) => ({
    flexShrink: 0,
    overflow: "hidden" as const,
    borderRadius: "8px",
    width: `${itemWidth}px`,
    height: `${itemHeight}px`,
    marginRight: index < urls.length - 1 ? `${gap}px` : "0px",
  });

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "opacity 150ms",
  } as const;

  const buttonBaseStyle = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "8px",
    zIndex: 10,
    border: "none",
    cursor: "pointer",
    opacity: showControls ? 1 : 0,
    transition: "opacity 150ms",
  };

  const leftButtonStyle = {
    ...buttonBaseStyle,
    left: "0",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    display: currentIndex > 0 ? "block" : "none",
  };

  const rightButtonStyle = {
    ...buttonBaseStyle,
    right: "0",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    display: currentIndex < urls.length - visibleItems ? "block" : "none",
  };

  return (
    <div style={containerStyle}>
      {/* 제목 영역 */}
      <div style={titleContainerStyle}>
        {typeof title === "string" ? (
          <h2 style={titleStyle}>{title}</h2>
        ) : (
          title
        )}
      </div>

      {/* 슬라이더 컨테이너 */}
      <div
        style={sliderContainerStyle}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        ref={containerRef}
      >
        {/* 이미지 컨테이너 */}
        <div style={imagesContainerStyle}>
          {urls.map((image, index) => (
            <div key={`${image}_${index}`} style={imageItemStyle(index)}>
              <a
                href={image}
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                <img
                  src={`${ImagePathForOriginal}${image}`}
                  style={imageStyle}
                />
              </a>
            </div>
          ))}
        </div>

        {/* 좌측 화살표 */}
        <button
          style={leftButtonStyle}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="이전 이미지"
        >
          <IoIosArrowBack size={24} />
        </button>

        {/* 우측 화살표 */}
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
