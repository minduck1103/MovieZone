import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import MovieListGrid from "../components/MovieListGrid";
import MovieSearch from "../components/MovieSearch";
import { MovieProvider } from "../context/MovieDetailContext";

function App() {
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
        setTopRatedMovies(responses[0].results);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Banner />
          {searchData.length === 0 && (
            <>
              <MovieListGrid
                title="Phim đề cử"
                data={topRatedMovies}
              />
            </>
          )}
          {searchData.length > 0 && <MovieSearch data={searchData} />}
        </div>
      </MovieProvider>
    </>
  );
}

export default App;