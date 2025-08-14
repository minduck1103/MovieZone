import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, 
  faCalendar, 
  faChevronLeft, 
  faChevronRight,
  faFilm,
  faTv,
  faPlay
} from "@fortawesome/free-solid-svg-icons";

const SimilarContent = ({ 
  data = [], 
  type = "movie", 
  title = "Similar Content",
  recommendations = false 
}) => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <div className="text-center py-8">
          <FontAwesomeIcon 
            icon={type === "tv" ? faTv : faFilm} 
            className="text-gray-600 text-4xl mb-2" 
          />
          <p className="text-gray-400">
            No {recommendations ? 'recommendations' : 'similar content'} available
          </p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (startIndex + itemsPerPage < data.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - itemsPerPage));
    }
  };

  const handleItemClick = (item) => {
    if (type === "tv") {
      navigate(`/tv/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  const getRating = (rating) => {
    return rating ? rating.toFixed(1) : "N/A";
  };

  const getTitle = (item) => {
    return item.title || item.name || "Unknown Title";
  };

  const getReleaseDate = (item) => {
    return item.release_date || item.first_air_date;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <span className="text-gray-400 text-sm">
          {data.length} item{data.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Content Grid */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.slice(startIndex, startIndex + itemsPerPage).map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              {/* Poster */}
              <div className="relative aspect-[3/4]">
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                    alt={getTitle(item)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={type === "tv" ? faTv : faFilm} 
                      className="text-gray-500 text-4xl" 
                    />
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FontAwesomeIcon icon={faPlay} className="text-white text-lg ml-0.5" />
                  </div>
                </div>

                {/* Rating Badge */}
                {item.vote_average > 0 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xs" />
                    <span>{getRating(item.vote_average)}</span>
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="p-3 space-y-2">
                <h4 className="text-white font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                  {getTitle(item)}
                </h4>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{formatDate(getReleaseDate(item))}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon 
                      icon={type === "tv" ? faTv : faFilm} 
                      className="text-xs" 
                    />
                    <span className="capitalize">{type}</span>
                  </div>
                </div>

                {/* Overview */}
                {item.overview && (
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                    {item.overview}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {data.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                startIndex === 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white hover:bg-gray-700 bg-gray-800"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>Previous</span>
            </button>

            <span className="text-gray-400 text-sm">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
            </span>

            <button
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= data.length}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                startIndex + itemsPerPage >= data.length
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white hover:bg-gray-700 bg-gray-800"
              }`}
            >
              <span>Next</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

SimilarContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
      first_air_date: PropTypes.string,
      overview: PropTypes.string,
    })
  ),
  type: PropTypes.oneOf(["movie", "tv"]).isRequired,
  title: PropTypes.string,
  recommendations: PropTypes.bool,
};

export default SimilarContent;
