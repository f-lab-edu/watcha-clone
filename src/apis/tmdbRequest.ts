import { API_OPTIONS, TMDB_BASE_URL } from "./constants/constantAPI";

type tmdbRequestType = {
  method: string;
  endpoint: string;
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams;
  requestBody?: Record<string, unknown> | string;
};

export const tmdbRequest = async ({
  method = "GET",
  endpoint,
  queryParams,
  requestBody,
}: tmdbRequestType) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = queryString
    ? `${TMDB_BASE_URL}${endpoint}?${queryString}`
    : `${TMDB_BASE_URL}${endpoint}`;

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
