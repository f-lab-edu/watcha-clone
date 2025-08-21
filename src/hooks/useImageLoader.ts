import { useState, useEffect, useRef } from "react";

export type LoadingState = "loading" | "loaded" | "error";

interface UseImageLoaderProps {
  src: string;
  fallbackSrc?: string;
  enableLazyLoading?: boolean;
  lazyOffset?: number;
  enablePrefetch?: boolean;
}

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

  useEffect(() => {
    if (!isInView) return;

    if (loadedImages.has(src)) {
      setCurrentSrc(src);
      setLoadingState("loaded");
      return;
    }

    let isCancelled = false;
    setLoadingState("loading");

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
