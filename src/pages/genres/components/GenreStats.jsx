import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFilm, 
  faStar, 
  faCalendar, 
  faUsers,
  faChartLine,
  faClock
} from "@fortawesome/free-solid-svg-icons";

const GenreStats = ({ 
  totalMovies, 
  averageRating, 
  mostRecentYear, 
  popularityScore,
  topRatedMovie,
  averageRuntime 
}) => {
  const stats = [
    {
      icon: faFilm,
      label: "Tổng số phim",
      value: totalMovies?.toLocaleString() || "N/A",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: faStar,
      label: "Đánh giá trung bình",
      value: averageRating ? `${averageRating.toFixed(1)}/10` : "N/A",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: faCalendar,
      label: "Phim mới nhất",
      value: mostRecentYear || "N/A",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: faChartLine,
      label: "Độ phổ biến",
      value: popularityScore ? `${popularityScore.toFixed(0)}%` : "N/A",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: faUsers,
      label: "Phim được yêu thích nhất",
      value: topRatedMovie || "Đang cập nhật",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: faClock,
      label: "Thời lượng trung bình",
      value: averageRuntime ? `${averageRuntime} phút` : "N/A",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-red-500 rounded-full mr-4"></div>
        <h3 className="text-2xl font-bold text-white">Thống kê thể loại</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              {/* Icon */}
              <div className={`p-3 rounded-lg ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}>
                <FontAwesomeIcon 
                  icon={stat.icon} 
                  className={`text-lg ${stat.color}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-gray-400 text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <p className={`text-lg font-bold ${stat.color} transition-colors duration-300`}>
                  {stat.value}
                </p>
              </div>
            </div>

            {/* Hover Effect Line */}
            <div className="mt-3 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <FontAwesomeIcon icon={faChartLine} className="text-red-400" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Xu hướng thể loại</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Thể loại này đang có xu hướng tăng về độ phổ biến và số lượng phim mới được sản xuất. 
              Thống kê được cập nhật hàng tuần từ cơ sở dữ liệu TMDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

GenreStats.propTypes = {
  totalMovies: PropTypes.number,
  averageRating: PropTypes.number,
  mostRecentYear: PropTypes.number,
  popularityScore: PropTypes.number,
  topRatedMovie: PropTypes.string,
  averageRuntime: PropTypes.number,
};

export default GenreStats;
