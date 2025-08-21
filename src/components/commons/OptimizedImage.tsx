import { useRef, ImgHTMLAttributes } from "react";
import { useImageLoader } from "../../hooks/useImageLoader";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc?: string;
  enableSkeleton?: boolean;
  enableLazyLoading?: boolean;
  lazyOffset?: number;
  enablePrefetch?: boolean;
  skeletonColor?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  style,
  fallbackSrc,
  enableSkeleton = true,
  enableLazyLoading = true,
  lazyOffset = 100,
  enablePrefetch = true,
  skeletonColor = "#f0f0f0",
  ...props
}: OptimizedImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const { loadingState, currentSrc, containerRef } = useImageLoader({
    src,
    fallbackSrc,
    enableLazyLoading,
    lazyOffset,
    enablePrefetch,
  });

  const containerStyle: React.CSSProperties = {
    width,
    height,
    position: "relative",
    overflow: "hidden",
    backgroundColor:
      loadingState === "loading" && enableSkeleton
        ? skeletonColor
        : "transparent",
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: loadingState === "loaded" ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  const skeletonStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, ${skeletonColor} 25%, rgba(255,255,255,0.8) 50%, ${skeletonColor} 75%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    opacity: loadingState === "loading" ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <>
      <div ref={containerRef} style={containerStyle}>
        {enableSkeleton && loadingState === "loading" && (
          <div style={skeletonStyle} aria-label="이미지 로딩 중" />
        )}

        {(currentSrc || loadingState === "error") && (
          <img
            {...props}
            ref={imgRef}
            src={currentSrc || fallbackSrc}
            alt={alt}
            style={imageStyle}
            loading={enableLazyLoading ? "lazy" : "eager"}
          />
        )}

        {loadingState === "error" && !fallbackSrc && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#999",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            이미지를 불러올 수 없습니다
          </div>
        )}
      </div>
    </>
  );
};

export default OptimizedImage;
