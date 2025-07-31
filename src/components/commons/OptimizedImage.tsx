import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  style,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    />
  );
};

export default OptimizedImage;
