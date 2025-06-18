import { API_OPTIONS, TMDB_BASE_URL } from "./constants/constantAPI";

interface RequestOptions {
  method: string;
  endpoint: string;
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams;
  requestBody?: Record<string, unknown> | string;
  timeout?: number;
  signal?: AbortSignal;
}

type RequestInterceptor = (config: RequestOptions) => RequestOptions;
type ResponseInterceptor = (response: any) => any;

type tmdbRequestType = RequestOptions & {
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;
};

type RequestConfig = RequestOptions & {
  timeout: number;
};

export const tmdbRequest = async ({
  method = "GET",
  endpoint,
  queryParams,
  requestBody,
  timeout = 10000,
  signal,
  requestInterceptor,
  responseInterceptor,
}: tmdbRequestType) => {
  let config: RequestConfig = {
    method,
    endpoint,
    queryParams,
    requestBody,
    timeout,
    signal,
  };
  if (requestInterceptor) {
    const interceptedConfig = requestInterceptor(config);
    config = {
      ...interceptedConfig,
      timeout: interceptedConfig.timeout ?? config.timeout,
    };
  }

  const controller = signal ? null : new AbortController();
  const abortSignal = signal || controller?.signal;

  const queryString = new URLSearchParams(config.queryParams).toString();
  const url = queryString
    ? `${TMDB_BASE_URL}${config.endpoint}?${queryString}`
    : `${TMDB_BASE_URL}${config.endpoint}`;

  try {
    const response = (await Promise.race([
      fetch(url, {
        method: config.method,
        headers: API_OPTIONS.headers,
        body: config.requestBody
          ? JSON.stringify(config.requestBody)
          : undefined,
        signal: abortSignal,
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          if (controller) controller.abort();
          reject(new Error(`요청 시간 초과: ${timeout}ms`));
        }, config.timeout);
      }),
    ])) as Response;

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return responseInterceptor ? responseInterceptor(data) : data;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("요청이 취소되었습니다.");
    }
    throw error;
  }
};

export const createAbortController = () => new AbortController();
