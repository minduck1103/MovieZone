import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MediaTypeToggle from "../../components/MediaTypeToggle";
import MovieListGrid from "../../components/MovieListGrid";
import { MovieProvider } from "../../context/MovieDetailContext";
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
  discoverMovies
} from "../../api/movieService";
import { getMovieGenres } from "../../api/genreService";
import MovieHero from "./components/MovieHero";
import MovieFilter from "./components/MovieFilter";
import MovieStats from "./components/MovieStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, 
  faChevronRight, 
  faSpinner,
  faExclamationTriangle,
  faFilm,
  faFire,
  faStar,
  faCalendarPlus,
  faPlayCircle,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get category from URL params
  const category = searchParams.get("category") || "trending";
  
  // State
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // Filter state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  const [adult, setAdult] = useState(null);
  
  // Search state
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Categories configuration
  const categories = [
    {
      id: "trending",
      label: "Thịnh hành",
      icon: faFire,
      description: "Phim đang được xem nhiều nhất",
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
    {
      id: "popular",
      label: "Phổ biến",
      icon: faStar,
      description: "Phim được yêu thích nhất mọi thời đại",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    {
      id: "top_rated",
      label: "Đánh giá cao",
      icon: faTrophy,
      description: "Phim có điểm đánh giá cao nhất",
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      id: "upcoming",
      label: "Sắp chiếu",
      icon: faCalendarPlus,
      description: "Phim sẽ ra mắt trong thời gian tới",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      id: "now_playing",
      label: "Đang chiếu",
      icon: faPlayCircle,
      description: "Phim đang được chiếu tại rạp",
      color: "text-purple-500",
      bgColor: "bg-purple-500",
    },
  ];

  const currentCategory = categories.find(cat => cat.id === category) || categories[0];

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const [genresData, trendingData] = await Promise.all([
          getMovieGenres(),
          getTrendingMovies()
        ]);
        
        setGenres(genresData);
        setFeaturedMovie(trendingData[0]); // Use first trending movie as featured
        setError(null);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load movies based on category and filters
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoadingMovies(true);
        setError(null);

        let moviesData;

        // If we have filters applied, use discover
        if (selectedGenres.length > 0 || year || rating || adult) {
          moviesData = await discoverMovies({
            genres: selectedGenres,
            page: currentPage,
            sortBy,
            year,
            rating,
            adult: adult === "true" ? true : adult === "false" ? false : undefined,
          });
          setMovies(moviesData.movies);
          setTotalPages(Math.min(moviesData.totalPages, 500));
          setTotalResults(moviesData.totalResults);
        } else {
          // Load based on category
          switch (category) {
            case "popular":
              moviesData = await getPopularMovies(currentPage);
              break;
            case "top_rated":
              moviesData = await getTopRatedMovies(currentPage);
              break;
            case "upcoming":
              moviesData = await getUpcomingMovies(currentPage);
              break;
            case "now_playing":
              moviesData = await getNowPlayingMovies(currentPage);
              break;
            default: // trending
              const trendingMovies = await getTrendingMovies();
              setMovies(trendingMovies);
              setTotalPages(1);
              setTotalResults(trendingMovies.length);
              return;
          }

          setMovies(moviesData.movies);
          setTotalPages(Math.min(moviesData.totalPages, 500));
          setTotalResults(moviesData.totalResults);
        }
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
        setMovies([]);
      } finally {
        setIsLoadingMovies(false);
      }
    };

    loadMovies();
  }, [category, currentPage, selectedGenres, sortBy, year, rating, adult]);

  // Handlers
  const handleSearch = async (value) => {
    if (value.trim()) {
      try {
        setIsSearching(true);
        const searchResults = await searchMovies(value);
        setSearchData(searchResults.movies);
      } catch (err) {
        console.error("Search error:", err);
        setSearchData([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchData([]);
    }
  };

  const handleMediaTypeChange = (type) => {
    if (type === "tv") {
      navigate("/tv");
    }
    // If type is "movie", we're already on the right page
  };

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
    setCurrentPage(1);
    setSelectedGenres([]);
    setSortBy("popularity.desc");
    setYear(null);
    setRating(null);
    setAdult(null);
  };

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedGenres([]);
    setSortBy("popularity.desc");
    setYear(null);
    setRating(null);
    setAdult(null);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate stats for current category
  const calculateMovieStats = () => {
    if (!movies.length) return {};
    
    const avgRating = movies.reduce((sum, movie) => sum + (movie.vote_average || 0), 0) / movies.length;
    const mostRecentYear = Math.max(...movies.map(movie => new Date(movie.release_date || 0).getFullYear()));
    const avgPopularity = movies.reduce((sum, movie) => sum + (movie.popularity || 0), 0) / movies.length;
    const topRatedMovie = movies.reduce((prev, current) => 
      (current.vote_average > prev.vote_average) ? current : prev
    );
    const avgRuntime = movies.reduce((sum, movie) => sum + (movie.runtime || 120), 0) / movies.length;

    return {
      totalMovies: totalResults,
      averageRating: avgRating,
      mostRecentYear: isFinite(mostRecentYear) ? mostRecentYear : null,
      popularityScore: Math.min((avgPopularity / 100) * 100, 100), // Convert to percentage, max 100
      topRatedMovie: topRatedMovie?.title,
      averageRuntime: Math.round(avgRuntime),
      categoryType: category,
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <MovieProvider>
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
          <div className="text-center">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-red-500 animate-spin mb-4" />
            <p className="text-gray-400">Đang tải phim...</p>
          </div>
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
          <div className="container mx-auto px-4 mb-8">
            <MovieHero 
              featuredMovie={featuredMovie} 
              category={currentCategory.label}
            />
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 pb-8">
            {/* Media Type Toggle & Category Tabs */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
              {/* Media Type Toggle */}
              <MediaTypeToggle 
                activeType="movie" 
                onTypeChange={handleMediaTypeChange}
              />

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      category === cat.id
                        ? `${cat.bgColor} text-white shadow-lg scale-105`
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={cat.icon} className="text-sm" />
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results */}
            {searchData.length > 0 ? (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-12 bg-red-500 rounded-full" />
                  <h2 className="text-3xl font-bold text-white">Kết quả tìm kiếm</h2>
                  <span className="text-gray-400">({searchData.length} phim)</span>
                </div>
                <MovieListGrid 
                  data={searchData} 
                  isLoading={isSearching}
                />
              </div>
            ) : (
              <>
                {/* Page Title & Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-1 h-12 ${currentCategory.bgColor} rounded-full`} />
                    <h1 className="text-4xl font-bold text-white">{currentCategory.label}</h1>
                    <FontAwesomeIcon icon={currentCategory.icon} className={`text-2xl ${currentCategory.color}`} />
                  </div>
                  <p className="text-gray-400 text-lg">{currentCategory.description}</p>
                </div>

                {/* Stats */}
                <MovieStats {...calculateMovieStats()} />

                {/* Filters */}
                <MovieFilter
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
                  adult={adult}
                  onAdultChange={setAdult}
                />

                {/* Movies Grid */}
                {error ? (
                  <div className="text-center py-12">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-500 mb-4" />
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : (
                  <>
                    {totalResults > 0 && (
                      <div className="mb-6 text-gray-400">
                        Tìm thấy {totalResults.toLocaleString()} phim
                      </div>
                    )}
                    
                    <MovieListGrid 
                      data={movies} 
                      isLoading={isLoadingMovies}
                      error={error}
                    />
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
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </MovieProvider>
  );
};

export default MoviesPage;
