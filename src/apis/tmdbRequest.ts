const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWRjMGE3ZTljMjZjYzFkMWVkOTU2Zjk3NmUzOWM5OSIsIm5iZiI6MTc0NTIyMDI1NS42OTcsInN1YiI6IjY4MDVmMjlmNDIxYTMwOTc1Y2FhYWZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mhLGxs_rZl13EWA0c6ieMk1pkVTFtIeM8q4VxM4Q4_M",
  },
};

type tmdbRequestType = {
  method: string;
  endpoint: string;
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams;
  requestBody?: Record<string, unknown>;
};

export const tmdbRequest = async ({
  method = "GET",
  endpoint,
  queryParams = {
    language: "ko-KR",
  },
  requestBody,
}: tmdbRequestType) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${TMDB_BASE_URL}${endpoint}?${queryString}`;

  const response = await fetch(url, {
    method,
    headers: API_OPTIONS.headers,
    body: requestBody ? JSON.stringify(requestBody) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};
