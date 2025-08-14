import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieDetailContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faStar, 
  faCalendar, 
  faFilm,
  faEye,
  faHeart,
  faClock
} from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie, index = 0 }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const navigate = useNavigate();

  if (!movie) return null;

  const {
    id,
    title,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    overview,
    genre_ids = [],
    runtime,
    adult,
  } = movie;

  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : "/api/placeholder/300/450";

  const year = release_date ? new Date(release_date).getFullYear() : "N/A";
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";
  const runtimeText = runtime ? `${runtime} phút` : "";

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  const handleWatchTrailer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleVideoTrailer(id, "movie");
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
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

        {/* Adult Content Badge */}
        {adult && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              18+
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

        {/* Movie Indicator */}
        <div className="absolute bottom-2 left-2 bg-red-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie</span>
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
          {title}
        </h3>

        {/* Metadata */}
        <div className="space-y-2 text-sm text-gray-400">
          {/* Year and Runtime */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
              <span>{year}</span>
            </div>
            {runtimeText && (
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faClock} className="text-xs" />
                <span>{runtimeText}</span>
              </div>
            )}
          </div>

          {/* Rating Display */}
          {vote_average > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                <span>{rating}/10</span>
              </div>
              
              {/* Rating Bar */}
              <div className="flex-1 ml-3">
                <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${(vote_average / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
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
              <FontAwesomeIcon icon={faFilm} />
              <span>Phim</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl transition-all duration-300 pointer-events-none" />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    runtime: PropTypes.number,
    adult: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number,
};

export default MovieCard;
