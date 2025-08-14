import React from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const MovieListGrid = ({ data, isLoading = false, error = null, title = null }) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        {title && (
          <h2 className="text-xl uppercase text-white">{title}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[2/3] bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded" />
                  <div className="h-3 bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Có lỗi xảy ra</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <FontAwesomeIcon icon={faFilm} className="text-6xl text-gray-600 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy phim</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Không có phim nào phù hợp với tiêu chí tìm kiếm của bạn. 
          Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center space-x-2">
          <h2 className="text-xl uppercase text-white">{title}</h2>
          <span className="text-gray-400">({data.length})</span>
        </div>
      )}

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            movie={movie}
            index={index}
          />
        ))}
      </div>

      {/* Grid Footer Info */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Hiển thị {data.length} phim</p>
      </div>
    </div>
  );
};

MovieListGrid.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
      overview: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  title: PropTypes.string,
};

export default MovieListGrid;
