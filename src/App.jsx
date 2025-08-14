import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModernBanner from "./components/ModernBanner";
import Header from "./components/Header";
import FeaturedSection from "./components/FeaturedSection";
import StatsBar from "./components/StatsBar";
import MovieSearch from "./components/MovieSearch";

import { MovieProvider } from "./context/MovieDetailContext";
import Footer from "./components/Footer";
import { getTrendingTVShows, getPopularTVShows } from "./api/tvService";
import { getTrendingMovies, getTopRatedMovies } from "./api/movieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFire, 
  faTrophy, 
  faTv, 
  faPlay,
  faBolt,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") {
      setSearchData([]);
      return;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all content in parallel
        const [
          trendingMoviesData,
          topRatedMoviesData,
          trendingTVData,
          popularTVData
        ] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies(),
          getTrendingTVShows(),
          getPopularTVShows()
        ]);
        
        setTrendingMovies(trendingMoviesData);
        setTopRatedMovies(topRatedMoviesData.movies);
        setTrendingTVShows(trendingTVData);
        setPopularTVShows(popularTVData.tvShows);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleExploreMovies = () => {
    navigate("/movies");
  };

  const handleExploreTVShows = () => {
    navigate("/tv");
  };

  const handleExploreGenres = () => {
    navigate("/genres");
  };

  if (isLoading) {
    return (
      <MovieProvider>
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto"></div>
            <p className="text-gray-400 text-lg">Đang tải nội dung tuyệt vời...</p>
          </div>
        </div>
      </MovieProvider>
    );
  }

  return (
    <MovieProvider>
      <div className="min-h-screen bg-[#0f172a] text-white">
        {/* Header */}
        <Header onSearch={handleSearch} />

        {/* Modern Hero Banner */}
        <ModernBanner />

        {/* Main Content */}
        <div className="relative">
          
          {/* Search Results */}
          {searchData.length > 0 ? (
            <div className="container mx-auto px-4 py-16">
              <div className="flex items-center space-x-3 mb-8">
                <FontAwesomeIcon icon={faSearch} className="text-2xl text-red-500" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Kết Quả Tìm Kiếm
                </h2>
                <span className="text-gray-400">({searchData.length} kết quả)</span>
              </div>
              <MovieSearch data={searchData} />
            </div>
          ) : (
            <>
              {/* Featured Content Sections */}
              <FeaturedSection
                title="Phim Thịnh Hành"
                subtitle="Những bộ phim đang được xem nhiều nhất"
                data={trendingMovies}
                type="movie"
                icon={faFire}
                accentColor="red"
                onViewMore={handleExploreMovies}
              />

              <FeaturedSection
                title="Phim Đề Cử"
                subtitle="Những tác phẩm điện ảnh xuất sắc nhất"
                data={topRatedMovies}
                type="movie"
                icon={faTrophy}
                accentColor="purple"
                onViewMore={() => navigate("/movies?category=top_rated")}
              />

              {/* Stats Bar */}
              <StatsBar />

              <FeaturedSection
                title="TV Shows Hot"
                subtitle="Series và chương trình truyền hình hấp dẫn"
                data={trendingTVShows}
                type="tv"
                icon={faBolt}
                accentColor="blue"
                onViewMore={handleExploreTVShows}
              />

              <FeaturedSection
                title="TV Shows Phổ Biến"
                subtitle="Những series được yêu thích nhất mọi thời đại"
                data={popularTVShows}
                type="tv"
                icon={faTv}
                accentColor="blue"
                onViewMore={() => navigate("/tv?category=popular")}
              />

              {/* Call to Action */}
              <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-purple-900/20 to-blue-900/20"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Khám phá thế giới giải trí không giới hạn
                  </h2>
                  <p className="text-gray-400 text-xl mb-10 max-w-3xl mx-auto">
                    Hàng nghìn bộ phim blockbuster, series hit và chương trình độc quyền đang chờ bạn khám phá
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={handleExploreMovies}
                      className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-red-500/25 flex items-center space-x-3"
                    >
                      <FontAwesomeIcon icon={faPlay} className="group-hover:scale-110 transition-transform" />
                      <span>Khám phá Phim</span>
                    </button>
                    
                    <button
                      onClick={handleExploreTVShows}
                      className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3"
                    >
                      <FontAwesomeIcon icon={faTv} className="group-hover:scale-110 transition-transform" />
                      <span>Khám phá TV Shows</span>
                    </button>

                    <button
                      onClick={handleExploreGenres}
                      className="group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-3"
                    >
                      <FontAwesomeIcon icon={faTrophy} className="group-hover:scale-110 transition-transform" />
                      <span>Duyệt theo Thể loại</span>
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;