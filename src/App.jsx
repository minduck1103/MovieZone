import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";
import ButtonWatchMore from "./components/ButtonWatchMore";
import Footer from "./components/Footer";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

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
    const fetchMovies = async () => {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url, options).then((res) => res.json()))
        );
        setTrendingMovies(responses[0].results);
        setTopRatedMovies(responses[1].results);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieProvider>
      <div className="min-h-screen bg-[#0f172a] text-white">
        {/* Header Section */}
        <Header onSearch={handleSearch} />

        {/* Hero Section */}
        <div className="relative h-[80vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a] z-10" />
          <Banner />
        </div>

        {/* Main Content */}
        <div className="relative z-20 -mt-20">
          <div className="container mx-auto px-4">
            {/* Search Results Section */}
            {searchData.length > 0 ? (
              <div className="mb-20">
                <h2 className="text-4xl font-bold mb-8 text-white">
                  Kết Quả Tìm Kiếm
                </h2>
                <MovieSearch data={searchData} />
              </div>
            ) : (
              <>
                {/* Trending Movies Section */}
                <div className="mb-20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 bg-red-500 rounded-full" />
                      <h2 className="text-4xl font-bold text-white">
                        Phim Hot
                      </h2>
                    </div>
                    <ButtonWatchMore targetPage="/hot-movies" />
                  </div>
                  <MovieList
                    data={trendingMovies.slice(0, 10)}
                  />
                </div>

                {/* Top Rated Movies Section */}
                <div className="mb-20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 bg-blue-500 rounded-full" />
                      <h2 className="text-4xl font-bold text-white">
                        Phim Đề Cử
                      </h2>
                    </div>
                    <ButtonWatchMore targetPage="/popular-movies" />
                  </div>
                  <MovieList
                    title="Phim Đề Cử"
                    data={topRatedMovies.slice(0, 10)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;