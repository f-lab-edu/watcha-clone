class ImageCache {
  private cache = new Map<string, { blob: Blob; timestamp: number }>();
  private readonly CACHE_DURATION = 30 * 60 * 1000;

  async get(url: string): Promise<string | null> {
    const cached = this.cache.get(url);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(url);
      return null;
    }

    return URL.createObjectURL(cached.blob);
  }

  async set(url: string, blob: Blob): Promise<void> {
    this.cache.set(url, { blob, timestamp: Date.now() });
  }

  async prefetch(url: string): Promise<void> {
    if (this.cache.has(url)) return;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        await this.set(url, blob);
      }
    } catch (error) {
      console.warn("Image prefetch failed:", url, error);
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache();
