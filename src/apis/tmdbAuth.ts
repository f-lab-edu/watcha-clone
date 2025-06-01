import { tmdbRequest } from "./tmdbRequest";

const getRequestToken = async () => {
  const response = await tmdbRequest({
    method: "GET",
    endpoint: "authentication/token/new",
  });

  console.log("Request Token Response:", response);

  if (!response.success) {
    throw new Error(`토큰 요청 실패: ${response.status_message}`);
  }

  localStorage.setItem("request_token", response.request_token);
  console.log("Request Token:", response.request_token);
  return response.request_token;
};

const createSession = async (request_token: string) => {
  const response = await tmdbRequest({
    method: "POST",
    endpoint: "authentication/session/new",
    queryParams: {},
    requestBody: {
      body: request_token,
    },
  });

  console.log("Session Response:", response);

  if (!response.success) {
    throw new Error(`세션 생성 실패: ${response.status_message}`);
  }

  console.log("Session ID:", response.session_id);
  localStorage.setItem("session_id", response.session_id);
  return response.session_id;
};

export const getSessionId = async () => {
  try {
    const requestToken = await getRequestToken();

    const sessionId = await createSession(requestToken);

    return sessionId;
  } catch (error) {
    console.error("Error:", error);
  }
};
