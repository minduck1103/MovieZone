// src/api/genreService.js
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
 * Lấy danh sách tất cả thể loại phim
 */
export const getMovieGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?language=${LANGUAGE}`,
      options
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};

/**
 * Lấy danh sách phim theo thể loại
 * @param {number} genreId - ID của thể loại
 * @param {number} page - Trang hiện tại
 * @param {object} filters - Các bộ lọc bổ sung
 */
export const getMoviesByGenre = async (genreId, page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams({
      with_genres: genreId,
      page: page,
      language: LANGUAGE,
      sort_by: filters.sortBy || "popularity.desc",
      ...filters,
    });

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
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

/**
 * Lấy phim theo nhiều thể loại
 * @param {Array} genreIds - Mảng ID các thể loại
 * @param {number} page - Trang hiện tại
 * @param {object} filters - Các bộ lọc bổ sung
 */
export const getMoviesByMultipleGenres = async (genreIds, page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams({
      with_genres: genreIds.join(","),
      page: page,
      language: LANGUAGE,
      sort_by: filters.sortBy || "popularity.desc",
      ...filters,
    });

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
    console.error("Error fetching movies by multiple genres:", error);
    throw error;
  }
};

/**
 * Tìm kiếm phim với bộ lọc nâng cao
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
