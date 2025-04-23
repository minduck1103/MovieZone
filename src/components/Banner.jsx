import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieDetailContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const { handleVideoTrailer } = useContext(MovieContext);

  const handleImageClick = () => {
    if (randomMovie && randomMovie.id) {
      handleVideoTrailer(randomMovie.id);
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const url = "https://api.themoviedb.org/3/trending/movie/day?language=vi";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data && data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.error("Banner: Lỗi khi tìm nạp phim:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [movies]);

  return (
    <div
      className="relative h-[80vh] w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: randomMovie
          ? `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), url(${import.meta.env.VITE_IMG_URL}${randomMovie.backdrop_path})`
          : "none",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />

      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 z-10">
          {randomMovie && (
            <>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                  Đang thịnh hành
                </span>
                <div className="flex items-center space-x-2 text-yellow-400">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{randomMovie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-white leading-tight">
                {randomMovie.title || randomMovie.name || randomMovie.original_title}
              </h1>

              <p className="text-gray-300 text-lg line-clamp-3">
                {randomMovie.overview}
              </p>

              <div className="flex space-x-4">
                <button
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
                  onClick={handleImageClick}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  <span>Xem Phim</span>
                </button>
                <button
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
                  onClick={handleImageClick}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>Chi Tiết</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Movie Poster */}
      {randomMovie && (
        <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-[#0f172a] to-transparent" />
            <img
              src={`${import.meta.env.VITE_IMG_URL}${randomMovie.poster_path}`}
              alt={randomMovie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;