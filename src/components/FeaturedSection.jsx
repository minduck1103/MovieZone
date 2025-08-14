import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faPlay,
  faStar,
  faFire,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

const FeaturedSection = ({ 
  title, 
  subtitle, 
  data, 
  type = "movie", 
  onViewMore,
  icon = faFire,
  accentColor = "red"
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const getTitle = (item) => {
    return item.title || item.name || item.original_title || item.original_name;
  };

  const getYear = (item) => {
    const date = item.release_date || item.first_air_date;
    return date ? new Date(date).getFullYear() : '';
  };

  const handleItemClick = (item) => {
    if (type === "tv") {
      navigate(`/tv/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }
  };

  const colorClasses = {
    red: {
      gradient: "from-red-500 to-red-600",
      bg: "bg-red-500",
      text: "text-red-400",
      border: "border-red-500/30",
      hover: "hover:border-red-500/60"
    },
    blue: {
      gradient: "from-blue-500 to-blue-600", 
      bg: "bg-blue-500",
      text: "text-blue-400",
      border: "border-blue-500/30",
      hover: "hover:border-blue-500/60"
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-500", 
      text: "text-purple-400",
      border: "border-purple-500/30",
      hover: "hover:border-purple-500/60"
    }
  };

  const colors = colorClasses[accentColor] || colorClasses.red;

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, ${accentColor === 'red' ? '#ef4444' : accentColor === 'blue' ? '#3b82f6' : '#8b5cf6'} 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, ${accentColor === 'red' ? '#ef4444' : accentColor === 'blue' ? '#3b82f6' : '#8b5cf6'} 0%, transparent 50%)`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${colors.gradient} shadow-lg`}>
                <FontAwesomeIcon icon={icon} className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-gray-400 text-lg mt-1">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {onViewMore && (
            <button
              onClick={onViewMore}
              className={`group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              <span>Xem tất cả</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="transition-transform group-hover:translate-x-1" 
              />
            </button>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.slice(0, 10).map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border ${colors.border} ${colors.hover} transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={getTitle(item)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating Badge */}
                {item.vote_average > 0 && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-medium flex items-center space-x-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                    <span>{item.vote_average.toFixed(1)}</span>
                  </div>
                )}

                {/* Type Badge */}
                <div className={`absolute top-3 left-3 ${colors.bg} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {type === 'movie' ? '🎬' : '📺'} {type === 'movie' ? 'PHIM' : 'TV'}
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className={`p-4 bg-gradient-to-r ${colors.gradient} text-white rounded-full shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110`}>
                    <FontAwesomeIcon icon={faPlay} className="text-lg ml-1" />
                  </button>
                </div>

                {/* Trending Indicator */}
                {item.popularity > 1000 && (
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      <FontAwesomeIcon icon={faChartLine} />
                      <span>HOT</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-red-400 transition-colors">
                  {getTitle(item)}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{getYear(item)}</span>
                  {item.vote_count > 0 && (
                    <span>{item.vote_count.toLocaleString()} votes</span>
                  )}
                </div>

                {/* Hover Details */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  hoveredItem === item.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-gray-400 text-sm line-clamp-3 mt-2">
                    {item.overview}
                  </p>
                </div>
              </div>

              {/* Bottom Glow Effect */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* View More Card */}
        {onViewMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={onViewMore}
              className={`group relative bg-gray-800/30 backdrop-blur-sm border-2 border-dashed ${colors.border} rounded-2xl p-8 transition-all duration-300 hover:bg-gray-800/50 ${colors.hover}`}
            >
              <div className="text-center space-y-3">
                <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl" />
                </div>
                <p className="text-white font-semibold">Khám phá thêm nhiều nội dung hay</p>
                <p className="text-gray-400 text-sm">Hàng ngàn bộ phim và series đang chờ bạn</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

FeaturedSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  data: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']),
  onViewMore: PropTypes.func,
  icon: PropTypes.object,
  accentColor: PropTypes.oneOf(['red', 'blue', 'purple']),
};

export default FeaturedSection;
