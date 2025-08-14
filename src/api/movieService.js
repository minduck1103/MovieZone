// src/api/movieService.js
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "vi";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

/**
 * Lấy danh sách phim trending
 * @param {string} timeWindow - 'day' hoặc 'week'
 */
export const getTrendingMovies = async (timeWindow = "day") => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${timeWindow}?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

/**
 * Lấy danh sách phim phổ biến
 * @param {number} page - Trang hiện tại
 */
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

/**
 * Lấy danh sách phim đánh giá cao
 * @param {number} page - Trang hiện tại
 */
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

/**
 * Lấy danh sách phim sắp chiếu
 * @param {number} page - Trang hiện tại
 */
export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

/**
 * Lấy danh sách phim đang chiếu
 * @param {number} page - Trang hiện tại
 */
export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

/**
 * Tìm kiếm phim
 * @param {string} query - Từ khóa tìm kiếm
 * @param {number} page - Trang hiện tại
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=${LANGUAGE}&page=${page}&include_adult=false`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

/**
 * Lấy chi tiết phim
 * @param {number} movieId - ID của phim
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

/**
 * Discover phim với bộ lọc
 * @param {object} searchParams - Các tham số tìm kiếm
 */
export const discoverMovies = async (searchParams = {}) => {
  try {
    const {
      genres = [],
      year = null,
      rating = null,
      sortBy = "popularity.desc",
      page = 1,
      withCast = null,
      withCrew = null,
    } = searchParams;

    const params = new URLSearchParams({
      page: page,
      language: LANGUAGE,
      sort_by: sortBy,
    });

    if (genres.length > 0) {
      params.append("with_genres", genres.join(","));
    }
    
    if (year) {
      params.append("year", year);
    }
    
    if (rating) {
      params.append("vote_average.gte", rating);
    }

    if (withCast) {
      params.append("with_cast", withCast);
    }

    if (withCrew) {
      params.append("with_crew", withCrew);
    }

    const response = await fetch(
      `${BASE_URL}/discover/movie?${params}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error discovering movies:", error);
    throw error;
  }
};

/**
 * Lấy videos của phim (trailers, teasers)
 * @param {number} movieId - ID của phim
 */
export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

/**
 * Lấy credits của phim
 * @param {number} movieId - ID của phim
 */
export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

/**
 * Lấy phim tương tự
 * @param {number} movieId - ID của phim
 * @param {number} page - Trang hiện tại
 */
export const getSimilarMovies = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};

/**
 * Lấy phim được đề xuất
 * @param {number} movieId - ID của phim
 * @param {number} page - Trang hiện tại
 */
export const getRecommendedMovies = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    throw error;
  }
};
