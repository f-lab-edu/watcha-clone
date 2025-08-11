import { useState, useEffect, useRef } from "react";
import { imageCache } from "./useImageCache";

export type LoadingState = "loading" | "loaded" | "error";

interface UseImageLoaderProps {
  src: string;
  fallbackSrc?: string;
  enableLazyLoading?: boolean;
  lazyOffset?: number;
  enablePrefetch?: boolean;
}

export const useImageLoader = ({
  src,
  fallbackSrc,
  enableLazyLoading = true,
  lazyOffset = 100,
  enablePrefetch = true,
}: UseImageLoaderProps) => {
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isInView, setIsInView] = useState(!enableLazyLoading);
  const containerRef = useRef<HTMLDivElement>(null);

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

    let isCancelled = false;

    const loadImage = async () => {
      setLoadingState("loading");

      try {
        let imageUrl = await imageCache.get(src);

        if (!imageUrl) {
          const response = await fetch(src);
          if (!response.ok) throw new Error("Failed to fetch image");

          const blob = await response.blob();
          await imageCache.set(src, blob);
          imageUrl = URL.createObjectURL(blob);
        }

        if (!isCancelled) {
          setCurrentSrc(imageUrl);
          setLoadingState("loaded");
        }
      } catch (error) {
        if (!isCancelled) {
          setLoadingState("error");
          if (fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }
      }
    };

    loadImage();

    return () => {
      isCancelled = true;
    };
  }, [src, isInView, fallbackSrc]);

  useEffect(() => {
    if (!enablePrefetch) return;

    const prefetchTimer = setTimeout(() => {
      imageCache.prefetch(src);
    }, 100);

    return () => clearTimeout(prefetchTimer);
  }, [src, enablePrefetch]);

  return {
    loadingState,
    currentSrc,
    containerRef,
  };
};
