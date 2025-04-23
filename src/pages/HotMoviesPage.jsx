import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import MovieListGrid from "../components/MovieListGrid";
import MovieSearch from "../components/MovieSearch";
import { MovieProvider } from "../context/MovieDetailContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

function HotMoviesPage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;

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
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/trending/movie/day?language=vi&page=${currentPage}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const data = await response.json();
        setTrendingMovies(data.results);
        setTotalPages(Math.min(Math.ceil(data.total_results / itemsPerPage), 20)); // Giới hạn 20 trang
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <MovieProvider>
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
        {/* Header Section */}
        <Header onSearch={handleSearch} />

        {/* Hero Section */}
        <div className="relative h-[80vh] w-full overflow-hidden mt-20">
          <Banner />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 flex-grow">
          {/* Page Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-red-500 rounded-full" />
            <h1 className="text-4xl font-bold text-white">Phim Hot</h1>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          )}

          {/* Search Results or Movie Grid */}
          {!isLoading && (
            <>
              {searchData.length > 0 ? (
                <MovieSearch data={searchData} />
              ) : (
                <>
                  <MovieListGrid
                    data={trendingMovies}
                  />

                  {/* Pagination */}
                  <div className="flex justify-center items-center space-x-4 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                      <span>Trang trước</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 2 && page <= currentPage + 2)
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="text-gray-400">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-full ${
                                currentPage === page
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      <span>Trang sau</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default HotMoviesPage;