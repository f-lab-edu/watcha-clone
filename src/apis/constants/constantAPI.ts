export const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
export const API_KEY = process.env.API_KEY;

export const API_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_KEY,
  },
};
