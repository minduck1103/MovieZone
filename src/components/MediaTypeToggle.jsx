import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTv } from "@fortawesome/free-solid-svg-icons";

const MediaTypeToggle = ({ activeType, onTypeChange, className = "" }) => {
  const toggleOptions = [
    {
      value: "movie",
      label: "Phim",
      icon: faFilm,
      description: "Phim điện ảnh",
    },
    {
      value: "tv",
      label: "TV Shows",
      icon: faTv,
      description: "Chương trình truyền hình",
    },
  ];

  return (
    <div className={`inline-flex bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700/50 ${className}`}>
      {toggleOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onTypeChange(option.value)}
          className={`group relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 min-w-[100px] justify-center ${
            activeType === option.value
              ? "bg-red-500 text-white shadow-lg transform scale-105"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          {/* Icon */}
          <FontAwesomeIcon 
            icon={option.icon} 
            className={`text-sm transition-all duration-300 ${
              activeType === option.value ? "text-white" : "text-gray-400 group-hover:text-white"
            }`}
          />
          
          {/* Label */}
          <span className="font-medium text-sm">
            {option.label}
          </span>

          {/* Active Indicator */}
          {activeType === option.value && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Hover Effect */}
          <div className={`absolute inset-0 rounded-md border-2 transition-all duration-300 ${
            activeType === option.value
              ? "border-red-400/30"
              : "border-transparent group-hover:border-gray-600/30"
          }`}></div>
        </button>
      ))}

      {/* Background Slider */}
      <div 
        className="absolute top-1 bottom-1 bg-red-500/20 rounded-md transition-all duration-300 ease-out"
        style={{
          left: activeType === "movie" ? "4px" : "50%",
          width: "calc(50% - 4px)",
        }}
      ></div>
    </div>
  );
};

MediaTypeToggle.propTypes = {
  activeType: PropTypes.oneOf(["movie", "tv"]).isRequired,
  onTypeChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default MediaTypeToggle;
