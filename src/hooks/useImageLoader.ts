import { useState, useEffect, useRef } from "react";

export type LoadingState = "loading" | "loaded" | "error";

interface UseImageLoaderProps {
  src: string;
  fallbackSrc?: string;
  enableLazyLoading?: boolean;
  lazyOffset?: number;
  enablePrefetch?: boolean;
}

// 단순한 메모리 캐시 (URL 기반)
const loadedImages = new Set<string>();

export const useImageLoader = ({
  src,
  fallbackSrc,
  enableLazyLoading = true,
  lazyOffset = 100,
  enablePrefetch = true,
}: UseImageLoaderProps) => {
  const [loadingState, setLoadingState] = useState<LoadingState>(() => 
    loadedImages.has(src) ? "loaded" : "loading"
  );
  const [currentSrc, setCurrentSrc] = useState<string>(() => 
    loadedImages.has(src) ? src : ""
  );
  const [isInView, setIsInView] = useState(!enableLazyLoading);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Intersection Observer로 lazy loading 처리
  useEffect(() => {
    if (!enableLazyLoading || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: `${lazyOffset}px`,
        threshold: 0.1,
      }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, [enableLazyLoading, isInView, lazyOffset]);

  // 이미지 로딩 처리 (브라우저 네이티브 캐시 활용)
  useEffect(() => {
    if (!isInView) return;

    // 이미 로드된 이미지면 즉시 표시
    if (loadedImages.has(src)) {
      setCurrentSrc(src);
      setLoadingState("loaded");
      return;
    }

    let isCancelled = false;
    setLoadingState("loading");

    // Image 객체로 프리로딩 (브라우저 캐시 활용)
    const img = new Image();
    
    img.onload = () => {
      if (!isCancelled) {
        loadedImages.add(src);
        setCurrentSrc(src);
        setLoadingState("loaded");
      }
    };

    img.onerror = () => {
      if (!isCancelled) {
        setLoadingState("error");
        if (fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          setLoadingState("loaded");
        }
      }
    };

    img.src = src;
    imgRef.current = img;

    return () => {
      isCancelled = true;
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [src, isInView, fallbackSrc]);

  // 프리페치 처리
  useEffect(() => {
    if (!enablePrefetch || loadedImages.has(src)) return;

    const prefetchTimer = setTimeout(() => {
      const img = new Image();
      img.onload = () => loadedImages.add(src);
      img.src = src;
    }, 100);

    return () => clearTimeout(prefetchTimer);
  }, [src, enablePrefetch]);

  return {
    loadingState,
    currentSrc,
    containerRef,
  };
};
