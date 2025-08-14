import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "../context/MovieDetailContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faStar, 
  faCalendar, 
  faTv,
  faEye,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

const TVShowCard = ({ tvShow, index = 0 }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  if (!tvShow) return null;

  const {
    id,
    name,
    poster_path,
    backdrop_path,
    vote_average,
    first_air_date,
    overview,
    genre_ids = [],
    origin_country = [],
    episode_run_time = [],
    number_of_seasons,
    number_of_episodes,
    status,
  } = tvShow;

  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : "/api/placeholder/300/450";

  const year = first_air_date ? new Date(first_air_date).getFullYear() : "N/A";
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";
  const runtime = episode_run_time.length > 0 ? `${episode_run_time[0]} phút` : "";
  const country = origin_country.length > 0 ? origin_country[0] : "";

  // Status mapping
  const statusMap = {
    "Returning Series": "Đang phát sóng",
    "Ended": "Đã kết thúc",
    "Canceled": "Đã hủy",
    "In Production": "Đang sản xuất",
    "Planned": "Đã lên kế hoạch",
    "Pilot": "Thử nghiệm",
  };

  const statusText = statusMap[status] || status;

  const handleWatchTrailer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleVideoTrailer(id, "tv");
  };

  return (
    <div 
      className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <button
          onClick={handleWatchTrailer}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100"
        >
          <div className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110">
            <FontAwesomeIcon icon={faPlay} className="text-xl ml-1" />
          </div>
        </button>

        {/* Status Badge */}
        {status && (
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "Returning Series" 
                ? "bg-green-500 text-white"
                : status === "Ended"
                ? "bg-gray-500 text-white"
                : "bg-blue-500 text-white"
            }`}>
              {statusText}
            </span>
          </div>
        )}

        {/* Rating Badge */}
        {vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
            <span>{rating}</span>
          </div>
        )}

        {/* TV Show Indicator */}
        <div className="absolute bottom-2 left-2 bg-blue-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <FontAwesomeIcon icon={faTv} />
          <span>TV</span>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full text-xs transition-colors duration-200"
            title="Thêm vào yêu thích"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button 
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full text-xs transition-colors duration-200"
            title="Thêm vào danh sách xem"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          {name}
        </h3>

        {/* Metadata */}
        <div className="space-y-2 text-sm text-gray-400">
          {/* Year and Country */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
              <span>{year}</span>
            </div>
            {country && (
              <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                {country}
              </span>
            )}
          </div>

          {/* Episodes and Seasons Info */}
          <div className="flex items-center justify-between">
            {number_of_seasons && (
              <span className="text-xs">
                {number_of_seasons} mùa
              </span>
            )}
            {number_of_episodes && (
              <span className="text-xs">
                {number_of_episodes} tập
              </span>
            )}
            {runtime && (
              <span className="text-xs">
                {runtime}
              </span>
            )}
          </div>
        </div>

        {/* Overview */}
        {overview && (
          <p className="text-gray-400 text-sm mt-3 line-clamp-3 leading-relaxed">
            {overview}
          </p>
        )}

        {/* Hover Details */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-between">
            <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              Xem chi tiết →
            </button>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <FontAwesomeIcon icon={faTv} />
              <span>TV Series</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl transition-all duration-300 pointer-events-none" />
    </div>
  );
};

TVShowCard.propTypes = {
  tvShow: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    vote_average: PropTypes.number,
    first_air_date: PropTypes.string,
    overview: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    origin_country: PropTypes.arrayOf(PropTypes.string),
    episode_run_time: PropTypes.arrayOf(PropTypes.number),
    number_of_seasons: PropTypes.number,
    number_of_episodes: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default TVShowCard;
