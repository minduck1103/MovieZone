 //  src/api/movieService.js
const API_KEY = import.meta.env.VITE_API_KEY;
const LANGUAGE = "vi";
export const getTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=${LANGUAGE}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error; //  Rethrow lỗi để component xử lý (nếu cần)
  }
};

export const getTopRatedMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=${LANGUAGE}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};
