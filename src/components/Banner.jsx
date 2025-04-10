import { useState, useEffect } from "react";
import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [movies, setMovies] = useState([]); //  Thêm state để lưu trữ danh sách phim

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
        setMovies(data.results); //  Lưu danh sách phim vào state
      } catch (error) {
        console.error("Lỗi khi tìm nạp phim:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const changeMovie = () => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      };

      changeMovie(); //  Hiển thị phim đầu tiên ngay lập tức
      const intervalId = setInterval(changeMovie, 2000); //  Đổi phim mỗi 2 giây

      return () => clearInterval(intervalId); //  Xóa interval khi component unmount
    }
  }, [movies]);

  return (
    <div
      className="md:h-[600px] h-[1000px] w-full bg-banner bg-cover bg-center bg-no-repeat relative mt-[75px]"
      style={{
        backgroundImage: randomMovie
          ? `url(${import.meta.env.VITE_IMG_URL}${randomMovie.poster_path})`
          : "none",
      }}
    >
      <div className="w-full h-full bg-black/40 " />
      <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full ">
        <div className="md:w-[50%] w-full ">
          <div className="flex flex-col space-y-6 items-start p-10">
            <p className="bg-gradient-to-r from-red-600 to-red-300 py-2 px-6">
              Thịnh hành
            </p>
            {randomMovie ? (
              <div className="flex flex-col space-y-4">
                <h1 className="text-[40px] font-bold text-white ">
                  {randomMovie.title ||
                    randomMovie.name ||
                    randomMovie.original_title}
                </h1>
                {/* Phần hiển thị rating */}
                <div className="flex items-center space-x-3">
                  <img src={IconRating} alt="rating" className="w-8 h-8" />
                  <img src={IconRating} alt="rating" className="w-8 h-8" />
                  <img src={IconRating} alt="rating" className="w-8 h-8" />
                  <img src={IconRating} alt="rating" className="w-8 h-8" />
                  <img src={IconRatingHalf} alt="rating" className="w-8 h-8" />
                </div>
                <p className="text-white">{randomMovie.overview}</p>
              </div>
            ) : (
              <p className="text-white">Đang tải phim...</p>
            )}

            <div className="flex items-center space-x-5">
              <button className="py-2 px-3 bg-black  text-white border border-black font-bold">
                Chi tiết
              </button>
              <button className="py-2 px-3 bg-red-600 text-white font-bold">
                Xem Phim
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group">
            <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <img src={IconPlay} alt="play" className="w-16 h-16" />
            </button>
            {randomMovie && (
              <img
                src={`${import.meta.env.VITE_IMG_URL}${randomMovie.poster_path}`}
                alt="banner"
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
};

export default Banner;