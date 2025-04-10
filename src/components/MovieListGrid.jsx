import PropTypes from "prop-types";
import { useContext } from "react";
import { MovieContext } from "../context/MovieDetailContext";

const MovieListGrid = ({ title, data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  return (
    <div className="my-10 px-4 md:px-10 max-w-full">
      <h2 className="text-xl uppercase mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.map((movie) => (
          <div
            key={movie.id}
            className="bg-cover bg-no-repeat bg-center w-full h-[300px] relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})`,
            }}
            onClick={() => handleVideoTrailer(movie.id)}
          >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase text-center text-white">
                {movie.name || movie.title || movie.original_title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieListGrid.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default MovieListGrid;
