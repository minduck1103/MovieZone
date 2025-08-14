// src/api/tvService.js
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
 * Lấy danh sách TV shows trending
 * @param {string} timeWindow - 'day' hoặc 'week'
 */
export const getTrendingTVShows = async (timeWindow = "day") => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/tv/${timeWindow}?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    throw error;
  }
};

/**
 * Lấy danh sách TV shows phổ biến
 * @param {number} page - Trang hiện tại
 */
export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    throw error;
  }
};

/**
 * Lấy danh sách TV shows đánh giá cao
 * @param {number} page - Trang hiện tại
 */
export const getTopRatedTVShows = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/top_rated?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching top rated TV shows:", error);
    throw error;
  }
};

/**
 * Lấy danh sách TV shows phát sóng hôm nay
 * @param {number} page - Trang hiện tại
 */
export const getAiringTodayTVShows = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/airing_today?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching airing today TV shows:", error);
    throw error;
  }
};

/**
 * Lấy danh sách TV shows phát sóng trong tuần
 * @param {number} page - Trang hiện tại
 */
export const getOnTheAirTVShows = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/on_the_air?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching on the air TV shows:", error);
    throw error;
  }
};

/**
 * Tìm kiếm TV shows
 * @param {string} query - Từ khóa tìm kiếm
 * @param {number} page - Trang hiện tại
 */
export const searchTVShows = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=${LANGUAGE}&page=${page}&include_adult=false`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error searching TV shows:", error);
    throw error;
  }
};

/**
 * Lấy chi tiết TV show
 * @param {number} tvId - ID của TV show
 */
export const getTVShowDetails = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    throw error;
  }
};

/**
 * Lấy danh sách thể loại TV shows
 */
export const getTVGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/tv/list?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching TV genres:", error);
    throw error;
  }
};

/**
 * Discover TV shows với bộ lọc
 * @param {object} searchParams - Các tham số tìm kiếm
 */
export const discoverTVShows = async (searchParams = {}) => {
  try {
    const {
      genres = [],
      year = null,
      rating = null,
      sortBy = "popularity.desc",
      page = 1,
      network = null,
      status = null,
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
      params.append("first_air_date_year", year);
    }
    
    if (rating) {
      params.append("vote_average.gte", rating);
    }

    if (network) {
      params.append("with_networks", network);
    }

    if (status) {
      params.append("with_status", status);
    }

    const response = await fetch(
      `${BASE_URL}/discover/tv?${params}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error discovering TV shows:", error);
    throw error;
  }
};

/**
 * Lấy videos của TV show (trailers, teasers)
 * @param {number} tvId - ID của TV show
 */
export const getTVShowVideos = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV show videos:", error);
    throw error;
  }
};

/**
 * Lấy credits của TV show
 * @param {number} tvId - ID của TV show
 */
export const getTVShowCredits = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/credits?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV show credits:", error);
    throw error;
  }
};

/**
 * Lấy TV shows tương tự
 * @param {number} tvId - ID của TV show
 * @param {number} page - Trang hiện tại
 */
export const getSimilarTVShows = async (tvId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/similar?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching similar TV shows:", error);
    throw error;
  }
};

/**
 * Lấy TV shows được đề xuất
 * @param {number} tvId - ID của TV show
 * @param {number} page - Trang hiện tại
 */
export const getRecommendedTVShows = async (tvId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/recommendations?language=${LANGUAGE}&page=${page}`,
      options
    );
    const data = await response.json();
    return {
      tvShows: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching recommended TV shows:", error);
    throw error;
  }
};
