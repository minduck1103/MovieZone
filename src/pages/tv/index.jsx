import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MediaTypeToggle from "../../components/MediaTypeToggle";
import TVShowListGrid from "../../components/TVShowListGrid";
import { MovieProvider } from "../../context/MovieDetailContext";
import { 
  getTrendingTVShows, 
  getPopularTVShows, 
  getTopRatedTVShows,
  getAiringTodayTVShows,
  getOnTheAirTVShows,
  searchTVShows,
  getTVGenres,
  discoverTVShows
} from "../../api/tvService";
import TVHero from "./components/TVHero";
import TVFilter from "./components/TVFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, 
  faChevronRight, 
  faSpinner,
  faExclamationTriangle,

  faFire,
  faStar,
  faBroadcastTower,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

const TVShowsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get category from URL params
  const category = searchParams.get("category") || "trending";
  
  // State
  const [tvShows, setTVShows] = useState([]);
  const [featuredShow, setFeaturedShow] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingShows, setIsLoadingShows] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // Filter state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  const [status, setStatus] = useState(null);
  const [network, setNetwork] = useState(null);
  
  // Search state
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Categories configuration
  const categories = [
    {
      id: "trending",
      label: "Thịnh hành",
      icon: faFire,
      description: "TV shows đang được xem nhiều nhất",
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
    {
      id: "popular",
      label: "Phổ biến",
      icon: faStar,
      description: "TV shows được yêu thích nhất",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    {
      id: "top_rated",
      label: "Đánh giá cao",
      icon: faStar,
      description: "TV shows có điểm đánh giá cao nhất",
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      id: "airing_today",
      label: "Phát sóng hôm nay",
      icon: faBroadcastTower,
      description: "TV shows phát sóng trong ngày",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      id: "on_the_air",
      label: "Đang phát sóng",
      icon: faCalendarCheck,
      description: "TV shows đang phát sóng trong tuần",
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
          getTVGenres(),
          getTrendingTVShows()
        ]);
        
        setGenres(genresData);
        setFeaturedShow(trendingData[0]); // Use first trending show as featured
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

  // Load TV shows based on category and filters
  useEffect(() => {
    const loadTVShows = async () => {
      try {
        setIsLoadingShows(true);
        setError(null);

        let showsData;

        // If we have filters applied, use discover
        if (selectedGenres.length > 0 || year || rating || status || network) {
          showsData = await discoverTVShows({
            genres: selectedGenres,
            page: currentPage,
            sortBy,
            year,
            rating,
            status,
            network,
          });
          setTVShows(showsData.tvShows);
          setTotalPages(Math.min(showsData.totalPages, 500));
          setTotalResults(showsData.totalResults);
        } else {
          // Load based on category
          switch (category) {
            case "popular":
              showsData = await getPopularTVShows(currentPage);
              break;
            case "top_rated":
              showsData = await getTopRatedTVShows(currentPage);
              break;
            case "airing_today":
              showsData = await getAiringTodayTVShows(currentPage);
              break;
            case "on_the_air":
              showsData = await getOnTheAirTVShows(currentPage);
              break;
            default: { // trending
              const trendingShows = await getTrendingTVShows();
              setTVShows(trendingShows);
              setTotalPages(1);
              setTotalResults(trendingShows.length);
              return;
            }
          }

          setTVShows(showsData.tvShows);
          setTotalPages(Math.min(showsData.totalPages, 500));
          setTotalResults(showsData.totalResults);
        }
      } catch (err) {
        console.error("Error loading TV shows:", err);
        setError("Không thể tải danh sách TV shows. Vui lòng thử lại sau.");
        setTVShows([]);
      } finally {
        setIsLoadingShows(false);
      }
    };

    loadTVShows();
  }, [category, currentPage, selectedGenres, sortBy, year, rating, status, network]);

  // Handlers
  const handleSearch = async (value) => {
    if (value.trim()) {
      try {
        setIsSearching(true);
        const searchResults = await searchTVShows(value);
        setSearchData(searchResults.tvShows);
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
    if (type === "movie") {
      navigate("/movies");
    }
    // If type is "tv", we're already on the right page
  };

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
    setCurrentPage(1);
    setSelectedGenres([]);
    setSortBy("popularity.desc");
    setYear(null);
    setRating(null);
    setStatus(null);
    setNetwork(null);
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
    setStatus(null);
    setNetwork(null);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <MovieProvider>
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
          <div className="text-center">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Đang tải TV Shows...</p>
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
            <TVHero 
              featuredShow={featuredShow} 
              category={currentCategory.label}
            />
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 pb-8">
            {/* Media Type Toggle & Category Tabs */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
              {/* Media Type Toggle */}
              <MediaTypeToggle 
                activeType="tv" 
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
                  <div className="w-1 h-12 bg-blue-500 rounded-full" />
                  <h2 className="text-3xl font-bold text-white">Kết quả tìm kiếm</h2>
                  <span className="text-gray-400">({searchData.length} TV shows)</span>
                </div>
                <TVShowListGrid 
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

                {/* Filters */}
                <TVFilter
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
                  status={status}
                  onStatusChange={setStatus}
                  network={network}
                  onNetworkChange={setNetwork}
                />

                {/* TV Shows Grid */}
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
                        Tìm thấy {totalResults.toLocaleString()} TV shows
                      </div>
                    )}
                    
                    <TVShowListGrid 
                      data={tvShows} 
                      isLoading={isLoadingShows}
                      error={error}
                    />
                  </>
                )}

                {/* Pagination */}
                {tvShows.length > 0 && totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === 1
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
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
                                ? "bg-blue-500 text-white"
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
                          : "bg-blue-500 text-white hover:bg-blue-600"
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

export default TVShowsPage;
