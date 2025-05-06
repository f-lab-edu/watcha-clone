import { useQuery } from "@tanstack/react-query";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWRjMGE3ZTljMjZjYzFkMWVkOTU2Zjk3NmUzOWM5OSIsIm5iZiI6MTc0NTIyMDI1NS42OTcsInN1YiI6IjY4MDVmMjlmNDIxYTMwOTc1Y2FhYWZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mhLGxs_rZl13EWA0c6ieMk1pkVTFtIeM8q4VxM4Q4_M",
  },
};

export const tmdbRequest = async (endpoint: string) => {
  const url = `${TMDB_BASE_URL}${endpoint}`;

  const response = await fetch(url, API_OPTIONS);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};

export function useTmdbQuery<T>(
  queryKey: any[],
  endpoint: string,
  options = {}
) {
  return useQuery<T>({
    queryKey,
    queryFn: () => tmdbRequest(endpoint),
    ...options,
  });
}
