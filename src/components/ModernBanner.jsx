import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieDetailContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faStar, 
  faInfoCircle,
  faPlus,
  faHeart,
  faShare,
  faCalendar,
  faClock,
  faFilm
} from "@fortawesome/free-solid-svg-icons";

const ModernBanner = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { handleVideoTrailer } = useContext(MovieContext);

  const currentItem = featuredContent[currentIndex];

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/week?language=vi",
        "https://api.themoviedb.org/3/trending/tv/week?language=vi",
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      try {
        const [moviesResponse, tvResponse] = await Promise.all(
          urls.map((url) => fetch(url, options).then((res) => res.json()))
        );
        
        // Mix movies and TV shows, take top 5 from each
        const mixedContent = [
          ...moviesResponse.results.slice(0, 5).map(item => ({...item, type: 'movie'})),
          ...tvResponse.results.slice(0, 5).map(item => ({...item, type: 'tv'}))
        ];
        
        // Sort by popularity and take top 10
        const sortedContent = mixedContent
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10);
        
        setFeaturedContent(sortedContent);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching featured content:", error);
        setIsLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  // Auto rotate every 8 seconds
  useEffect(() => {
    if (featuredContent.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [featuredContent.length]);

  const handlePlayTrailer = () => {
    if (currentItem) {
      handleVideoTrailer(currentItem.id, currentItem.type);
    }
  };

  const getTitle = (item) => {
    return item.title || item.name || item.original_title || item.original_name;
  };

  const getYear = (item) => {
    const date = item.release_date || item.first_air_date;
    return date ? new Date(date).getFullYear() : '';
  };

  if (isLoading) {
    return (
      <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Đang tải nội dung featured...</p>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faFilm} className="text-6xl text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">Không có nội dung để hiển thị</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentItem.backdrop_path})`,
        }}
      />
      
      {/* Multi-layer Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
            
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-6 animate-fade-in">
              
              {/* Category & Rating */}
              <div className="flex items-center space-x-4 animate-slide-up">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentItem.type === 'movie' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {currentItem.type === 'movie' ? '🎬 Phim' : '📺 TV Show'}
                </span>
                
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <span className="text-white font-medium">
                    {currentItem.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  <FontAwesomeIcon icon={faCalendar} className="text-gray-300" />
                  <span className="text-white font-medium">{getYear(currentItem)}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight animate-slide-up delay-100">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {getTitle(currentItem)}
                </span>
              </h1>

              {/* Overview */}
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl animate-slide-up delay-200">
                {currentItem.overview?.length > 200 
                  ? `${currentItem.overview.substring(0, 200)}...` 
                  : currentItem.overview
                }
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 animate-slide-up delay-300">
                <button
                  onClick={handlePlayTrailer}
                  className="group flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25"
                >
                  <FontAwesomeIcon 
                    icon={faPlay} 
                    className="text-lg group-hover:scale-110 transition-transform" 
                  />
                  <span>Xem Trailer</span>
                </button>

                <button className="group flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/30">
                  <FontAwesomeIcon 
                    icon={faInfoCircle} 
                    className="text-lg group-hover:scale-110 transition-transform" 
                  />
                  <span>Chi Tiết</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/30">
                    <FontAwesomeIcon 
                      icon={faPlus} 
                      className="group-hover:scale-110 transition-transform" 
                    />
                  </button>
                  
                  <button className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/30">
                    <FontAwesomeIcon 
                      icon={faHeart} 
                      className="group-hover:scale-110 transition-transform" 
                    />
                  </button>

                  <button className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/30">
                    <FontAwesomeIcon 
                      icon={faShare} 
                      className="group-hover:scale-110 transition-transform" 
                    />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center space-x-6 text-sm text-gray-400 animate-slide-up delay-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Chất lượng 4K</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Phụ đề Việt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>HDR</span>
                </div>
              </div>
            </div>

            {/* Poster & Carousel */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-6">
              
              {/* Main Poster */}
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${currentItem.poster_path}`}
                  alt={getTitle(currentItem)}
                  className="w-80 h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl"></div>
              </div>

              {/* Thumbnail Carousel */}
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide max-w-full">
                {featuredContent.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 relative transition-all duration-300 ${
                      index === currentIndex 
                        ? 'scale-110 ring-2 ring-red-500' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w154${item.poster_path}`}
                      alt={getTitle(item)}
                      className="w-16 h-24 object-cover rounded-lg"
                    />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-red-500' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ModernBanner;
