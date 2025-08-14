import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFilm, 
  faStar, 
  faCalendar, 
  faUsers,
  faChartLine,
  faClock,
  faTrophy,
  faFire
} from "@fortawesome/free-solid-svg-icons";

const MovieStats = ({ 
  totalMovies, 
  averageRating, 
  mostRecentYear, 
  popularityScore,
  topRatedMovie,
  averageRuntime,
  totalRevenue,
  categoryType = "trending"
}) => {
  const getCategoryInfo = () => {
    switch (categoryType) {
      case "trending":
        return { 
          title: "Phim Hot - Thống kê", 
          icon: faFire, 
          color: "text-red-500",
          description: "Phim đang được xem nhiều nhất"
        };
      case "popular":
        return { 
          title: "Phim Phổ biến - Thống kê", 
          icon: faUsers, 
          color: "text-blue-500",
          description: "Phim được yêu thích nhất"
        };
      case "top_rated":
        return { 
          title: "Phim Đánh giá cao - Thống kê", 
          icon: faTrophy, 
          color: "text-yellow-500",
          description: "Phim có điểm số cao nhất"
        };
      case "upcoming":
        return { 
          title: "Phim Sắp chiếu - Thống kê", 
          icon: faCalendar, 
          color: "text-green-500",
          description: "Phim sẽ ra mắt sớm"
        };
      default:
        return { 
          title: "Thống kê phim", 
          icon: faFilm, 
          color: "text-red-500",
          description: "Thông tin tổng quan"
        };
    }
  };

  const categoryInfo = getCategoryInfo();

  const stats = [
    {
      icon: faFilm,
      label: "Tổng số phim",
      value: totalMovies?.toLocaleString() || "N/A",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      trend: totalMovies > 1000 ? "↗️" : "📊"
    },
    {
      icon: faStar,
      label: "Đánh giá trung bình",
      value: averageRating ? `${averageRating.toFixed(1)}/10` : "N/A",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      trend: averageRating >= 7 ? "🌟" : averageRating >= 6 ? "⭐" : "📈"
    },
    {
      icon: faCalendar,
      label: "Phim mới nhất",
      value: mostRecentYear || "N/A",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      trend: mostRecentYear === new Date().getFullYear() ? "🆕" : "📅"
    },
    {
      icon: faChartLine,
      label: "Độ phổ biến",
      value: popularityScore ? `${popularityScore.toFixed(0)}%` : "N/A",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      trend: popularityScore >= 80 ? "🔥" : popularityScore >= 60 ? "📈" : "📊"
    },
    {
      icon: faTrophy,
      label: "Phim được yêu thích nhất",
      value: topRatedMovie || "Đang cập nhật",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      trend: "🏆"
    },
    {
      icon: faClock,
      label: "Thời lượng trung bình",
      value: averageRuntime ? `${averageRuntime} phút` : "N/A",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      trend: averageRuntime >= 120 ? "⏰" : "⚡"
    },
  ];

  // Add revenue stat if available
  if (totalRevenue) {
    stats.push({
      icon: faUsers,
      label: "Doanh thu ước tính",
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      trend: "💰"
    });
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-red-500/20`}>
            <FontAwesomeIcon icon={categoryInfo.icon} className={`text-2xl ${categoryInfo.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{categoryInfo.title}</h3>
            <p className="text-gray-400 text-sm">{categoryInfo.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-lg ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}>
                <FontAwesomeIcon 
                  icon={stat.icon} 
                  className={`text-lg ${stat.color}`}
                />
              </div>
              <span className="text-xl">{stat.trend}</span>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">
                {stat.label}
              </p>
              <p className={`text-lg font-bold ${stat.color} transition-colors duration-300`}>
                {stat.value}
              </p>
            </div>

            {/* Progress bar for visual appeal */}
            <div className="mt-3 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Category-specific insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
            <FontAwesomeIcon icon={faChartLine} className="text-red-400" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Xu hướng {categoryInfo.title.toLowerCase()}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {categoryType === "trending" && "Các bộ phim này đang được xem nhiều nhất trong 24 giờ qua. Dữ liệu được cập nhật liên tục từ TMDB."}
              {categoryType === "popular" && "Phim được đánh giá dựa trên số lượt xem và tương tác từ cộng đồng người xem trên toàn thế giới."}
              {categoryType === "top_rated" && "Danh sách được xếp hạng dựa trên điểm đánh giá trung bình từ hàng triệu người dùng TMDB."}
              {categoryType === "upcoming" && "Lịch chiếu được cập nhật từ các nhà phát hành và rạp chiếu phim chính thức."}
              {!["trending", "popular", "top_rated", "upcoming"].includes(categoryType) && "Thống kê này được tính toán dựa trên dữ liệu thời gian thực từ TMDB API."}
            </p>
          </div>
        </div>
      </div>

      {/* Performance indicators */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Dữ liệu realtime</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <span>API TMDB</span>
          </div>
        </div>
        <div className="text-xs">
          Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
        </div>
      </div>
    </div>
  );
};

MovieStats.propTypes = {
  totalMovies: PropTypes.number,
  averageRating: PropTypes.number,
  mostRecentYear: PropTypes.number,
  popularityScore: PropTypes.number,
  topRatedMovie: PropTypes.string,
  averageRuntime: PropTypes.number,
  totalRevenue: PropTypes.number,
  categoryType: PropTypes.oneOf(["trending", "popular", "top_rated", "upcoming"]),
};

export default MovieStats;
