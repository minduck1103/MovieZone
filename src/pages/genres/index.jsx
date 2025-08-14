import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MovieProvider } from "../../context/MovieDetailContext";
import { getMovieGenres, getMoviesByGenre, discoverMovies } from "../../api/genreService";
import GenreCard from "./components/GenreCard";
import GenreFilter from "./components/GenreFilter";
import GenreHero from "./components/GenreHero";
import GenreStats from "./components/GenreStats";
import GenreGridSkeleton from "./components/GenreGridSkeleton";
import MovieListGrid from "../../components/MovieListGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, 
  faChevronRight, 
  faSpinner,
  faExclamationTriangle,
  faFilm
} from "@fortawesome/free-solid-svg-icons";

const GenresPage = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  
  // State for genres listing
  const [genres, setGenres] = useState([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  
  // State for movies by genre
  const [movies, setMovies] = useState([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // Filter state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  
  // UI state
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState([]);

  // Current genre info
  const currentGenre = genres.find(g => g.id === parseInt(genreId));

  // Load genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoadingGenres(true);
        const genresData = await getMovieGenres();
        setGenres(genresData);
        setError(null);
      } catch (err) {
        console.error("Error loading genres:", err);
        setError("Không thể tải danh sách thể loại. Vui lòng thử lại sau.");
      } finally {
        setIsLoadingGenres(false);
      }
    };

    loadGenres();
  }, []);

  // Load movies when genre changes or filters change
  useEffect(() => {
    if (genreId) {
      setSelectedGenres([parseInt(genreId)]);
      setCurrentPage(1);
    }
  }, [genreId]);

  // Load movies based on filters
  useEffect(() => {
    const loadMovies = async () => {
      if (selectedGenres.length === 0 && !genreId) return;

      try {
        setIsLoadingMovies(true);
        setError(null);

        let moviesData;
        
        if (genreId && selectedGenres.length === 1) {
          // Single genre page
          moviesData = await getMoviesByGenre(parseInt(genreId), currentPage, {
            sortBy,
            year,
            "vote_average.gte": rating,
          });
        } else {
          // Multi-genre or advanced filtering
          moviesData = await discoverMovies({
            genres: selectedGenres,
            page: currentPage,
            sortBy,
            year,
            rating,
          });
        }

        setMovies(moviesData.movies);
        setTotalPages(Math.min(moviesData.totalPages, 500)); // API limit
        setTotalResults(moviesData.totalResults);
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
        setMovies([]);
      } finally {
        setIsLoadingMovies(false);
      }
    };

    loadMovies();
  }, [genreId, selectedGenres, currentPage, sortBy, year, rating]);

  // Handlers
  const handleSearch = async (value) => {
    // Implement search functionality
    if (value.trim()) {
      // Navigate to search results or implement inline search
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      setSearchData([]);
    }
  };

  const handleGenreToggle = (genreIdToToggle) => {
    if (genreId) {
      // If we're on a specific genre page, navigate to genres page with filter
      navigate("/genres");
      setTimeout(() => {
        setSelectedGenres([genreIdToToggle]);
      }, 100);
    } else {
      // Toggle genre in filter
      setSelectedGenres(prev => 
        prev.includes(genreIdToToggle)
          ? prev.filter(id => id !== genreIdToToggle)
          : [...prev, genreIdToToggle]
      );
      setCurrentPage(1);
    }
  };

  const handleClearAllFilters = () => {
    setSelectedGenres([]);
    setSortBy("popularity.desc");
    setYear(null);
    setRating(null);
    setCurrentPage(1);
    if (genreId) {
      navigate("/genres");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate stats for current genre
  const calculateGenreStats = () => {
    if (!movies.length) return {};
    
    const avgRating = movies.reduce((sum, movie) => sum + (movie.vote_average || 0), 0) / movies.length;
    const mostRecentYear = Math.max(...movies.map(movie => new Date(movie.release_date || 0).getFullYear()));
    const avgPopularity = movies.reduce((sum, movie) => sum + (movie.popularity || 0), 0) / movies.length;
    const topRatedMovie = movies.reduce((prev, current) => 
      (current.vote_average > prev.vote_average) ? current : prev
    );

    return {
      totalMovies: totalResults,
      averageRating: avgRating,
      mostRecentYear: isFinite(mostRecentYear) ? mostRecentYear : null,
      popularityScore: (avgPopularity / 100) * 100, // Convert to percentage
      topRatedMovie: topRatedMovie?.title,
      averageRuntime: 120, // Placeholder - would need additional API call
    };
  };

  // Render loading state
  if (isLoadingGenres) {
    return (
      <MovieProvider>
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
          <div className="text-center">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-red-500 animate-spin mb-4" />
            <p className="text-gray-400">Đang tải danh sách thể loại...</p>
          </div>
        </div>
      </MovieProvider>
    );
  }

  // Render error state
  if (error && !genres.length) {
    return (
      <MovieProvider>
        <div className="min-h-screen bg-[#0f172a] text-white">
          <Header onSearch={handleSearch} />
          <div className="container mx-auto px-4 pt-24 pb-8 text-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Có lỗi xảy ra</h1>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Thử lại
            </button>
          </div>
          <Footer />
        </div>
      </MovieProvider>
    );
  }

  return (
    <MovieProvider>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header onSearch={handleSearch} />
        
        <div className="pt-20">
          {/* Hero Section */}
          {genreId && currentGenre ? (
            <>
              <div className="container mx-auto px-4 mb-8">
                <GenreHero 
                  genreName={currentGenre.name}
                  movieCount={totalResults}
                />
                <GenreStats {...calculateGenreStats()} />
              </div>
            </>
          ) : (
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faFilm} className="text-4xl text-red-500 mr-3" />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">Thể Loại Phim</h1>
                </div>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Khám phá hàng ngàn bộ phim theo thể loại yêu thích của bạn
                </p>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="container mx-auto px-4 pb-8">
            {genreId ? (
              // Single Genre Page
              <>
                {/* Back Navigation */}
                <div className="mb-6">
                  <button
                    onClick={() => navigate("/genres")}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>Quay lại danh sách thể loại</span>
                  </button>
                </div>

                {/* Filters */}
                <GenreFilter
                  genres={genres}
                  selectedGenres={selectedGenres}
                  onGenreToggle={handleGenreToggle}
                  onClearAll={handleClearAllFilters}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  year={year}
                  onYearChange={setYear}
                  rating={rating}
                  onRatingChange={setRating}
                />

                {/* Movies Grid */}
                {isLoadingMovies ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <div className="text-center">
                      <FontAwesomeIcon icon={faSpinner} className="text-3xl text-red-500 animate-spin mb-4" />
                      <p className="text-gray-400">Đang tải phim...</p>
                    </div>
                  </div>
                ) : movies.length > 0 ? (
                  <>
                    <div className="mb-6 text-gray-400">
                      Tìm thấy {totalResults.toLocaleString()} phim
                    </div>
                    <MovieListGrid data={movies} />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <FontAwesomeIcon icon={faFilm} className="text-4xl text-gray-600 mb-4" />
                    <p className="text-gray-400">Không tìm thấy phim nào với bộ lọc hiện tại</p>
                  </div>
                )}
              </>
            ) : (
              // All Genres Page
              <>
                {/* Filters for multi-genre selection */}
                {selectedGenres.length > 0 && (
                  <>
                    <GenreFilter
                      genres={genres}
                      selectedGenres={selectedGenres}
                      onGenreToggle={handleGenreToggle}
                      onClearAll={handleClearAllFilters}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      year={year}
                      onYearChange={setYear}
                      rating={rating}
                      onRatingChange={setRating}
                    />

                    {/* Filtered Movies */}
                    {isLoadingMovies ? (
                      <div className="flex justify-center items-center min-h-[300px]">
                        <FontAwesomeIcon icon={faSpinner} className="text-3xl text-red-500 animate-spin" />
                      </div>
                    ) : (
                      <>
                        {movies.length > 0 && (
                          <>
                            <div className="mb-6 text-gray-400">
                              Tìm thấy {totalResults.toLocaleString()} phim
                            </div>
                            <MovieListGrid data={movies} />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* Genres Grid */}
                {selectedGenres.length === 0 && (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-1 h-12 bg-red-500 rounded-full" />
                      <h2 className="text-3xl font-bold text-white">Tất cả thể loại</h2>
                    </div>
                    
                    {isLoadingGenres ? (
                      <GenreGridSkeleton />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {genres.map((genre) => (
                          <GenreCard key={genre.id} genre={genre} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Pagination */}
            {movies.length > 0 && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>Trang trước</span>
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                    const page = i + 1;
                    const showPage = page === 1 || page === totalPages || 
                                   (page >= currentPage - 2 && page <= currentPage + 2);
                    
                    if (!showPage) return null;
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-full transition-colors ${
                          currentPage === page
                            ? "bg-red-500 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <span>Trang sau</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </MovieProvider>
  );
};

export default GenresPage;
