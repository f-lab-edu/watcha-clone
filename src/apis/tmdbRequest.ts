const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWRjMGE3ZTljMjZjYzFkMWVkOTU2Zjk3NmUzOWM5OSIsIm5iZiI6MTc0NTIyMDI1NS42OTcsInN1YiI6IjY4MDVmMjlmNDIxYTMwOTc1Y2FhYWZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mhLGxs_rZl13EWA0c6ieMk1pkVTFtIeM8q4VxM4Q4_M",
  },
};

export const tmdbRequest = async (url: string) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
