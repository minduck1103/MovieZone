import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faPlay, faStar, faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";

const MovieHero = ({ featuredMovie, category = "Phim Hot" }) => {
  if (!featuredMovie) {
    return (
      <div className="relative h-96 w-full overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faFilm} className="text-6xl text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-white">Đang tải...</h2>
        </div>
      </div>
    );
  }

  const {
    title,
    overview,
    backdrop_path,
    poster_path,
    vote_average,
    release_date,
    runtime,
    genres,
    adult,
  } = featuredMovie;

  const backgroundImage = backdrop_path 
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : null;

  const year = release_date ? new Date(release_date).getFullYear() : "N/A";
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";
  const runtimeText = runtime ? `${runtime} phút` : "";

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl mb-8">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className="mb-4 flex items-center space-x-4">
              <span className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                <FontAwesomeIcon icon={faFilm} />
                <span>{category}</span>
              </span>
              
              {adult && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  18+
                </span>
              )}

              {/* Genre badges */}
              {genres && genres.slice(0, 2).map((genre) => (
                <span key={genre.id} className="bg-gray-700/70 text-white px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center space-x-6 mb-6 text-gray-300">
              {year !== "N/A" && (
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                  <span>{year}</span>
                </div>
              )}
              
              {vote_average > 0 && (
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                  <span>{rating}/10</span>
                </div>
              )}

              {runtimeText && (
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className="text-sm" />
                  <span>{runtimeText}</span>
                </div>
              )}

              {/* Rating visualization */}
              {vote_average > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`text-sm ${
                          i < Math.round(vote_average / 2)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Overview */}
            {overview && (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                {overview.length > 200 ? `${overview.substring(0, 200)}...` : overview}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center space-x-4">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
                <FontAwesomeIcon icon={faPlay} />
                <span>Xem Trailer</span>
              </button>
              
              <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-gray-600/30 hover:border-gray-500/50">
                Thêm vào danh sách
              </button>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 flex items-center space-x-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Mới cập nhật</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Chất lượng HD</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span>Phụ đề tiếng Việt</span>
              </div>
              {vote_average >= 8 && (
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <span>Đánh giá cao</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/20 to-transparent rounded-tl-full"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-bl-full"></div>
    </div>
  );
};

MovieHero.propTypes = {
  featuredMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    runtime: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    adult: PropTypes.bool,
  }),
  category: PropTypes.string,
};

export default MovieHero;
