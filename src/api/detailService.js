const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Movie Details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?language=en-US&append_to_response=videos,credits,reviews,similar,recommendations,images`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// TV Details
export const getTVDetails = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}?language=en-US&append_to_response=videos,credits,reviews,similar,recommendations,images,seasons`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV details:", error);
    throw error;
  }
};

// Movie Videos (Trailers, Teasers, etc.)
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

// TV Videos
export const getTVVideos = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV videos:", error);
    throw error;
  }
};

// Movie Credits (Cast & Crew)
export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// TV Credits
export const getTVCredits = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/credits?language=en-US`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV credits:", error);
    throw error;
  }
};

// Movie Reviews
export const getMovieReviews = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

// TV Reviews
export const getTVReviews = async (tvId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/reviews?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV reviews:", error);
    throw error;
  }
};

// Similar Movies
export const getSimilarMovies = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};

// Similar TV Shows
export const getSimilarTVShows = async (tvId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/similar?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching similar TV shows:", error);
    throw error;
  }
};

// Movie Recommendations
export const getMovieRecommendations = async (movieId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    throw error;
  }
};

// TV Recommendations
export const getTVRecommendations = async (tvId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/recommendations?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV recommendations:", error);
    throw error;
  }
};

// TV Season Details
export const getTVSeasonDetails = async (tvId, seasonNumber) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?language=en-US`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV season details:", error);
    throw error;
  }
};

// Movie Images
export const getMovieImages = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/images`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    throw error;
  }
};

// TV Images
export const getTVImages = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/images`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV images:", error);
    throw error;
  }
};
