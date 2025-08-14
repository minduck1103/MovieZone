import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFilm, 
  faTv, 
  faUsers, 
  faPlay,
  faEye,
  faHeart,
  faStar,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

const StatsBar = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalTVShows: 0,
    totalUsers: 0,
    totalViews: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading stats with animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate numbers
      const animateValue = (start, end, duration, setter) => {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = stepTime < minTimer ? minTimer : stepTime;
        
        let current = start;
        const increment = end > start ? 1 : -1;
        const obj = setInterval(() => {
          current += increment;
          setter(current);
          if (current === end) {
            clearInterval(obj);
          }
        }, timer);
      };

      // Animate each stat
      animateValue(0, 850000, 2000, (val) => 
        setStats(prev => ({ ...prev, totalMovies: val }))
      );
      animateValue(0, 180000, 2000, (val) => 
        setStats(prev => ({ ...prev, totalTVShows: val }))
      );
      animateValue(0, 2500000, 2000, (val) => 
        setStats(prev => ({ ...prev, totalUsers: val }))
      );
      animateValue(0, 15000000, 2000, (val) => 
        setStats(prev => ({ ...prev, totalViews: val }))
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      icon: faFilm,
      label: "Phim",
      value: stats.totalMovies.toLocaleString(),
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Bộ phim chất lượng cao"
    },
    {
      icon: faTv,
      label: "TV Shows",
      value: stats.totalTVShows.toLocaleString(),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Series và chương trình"
    },
    {
      icon: faUsers,
      label: "Người dùng",
      value: `${(stats.totalUsers / 1000000).toFixed(1)}M`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Thành viên hoạt động"
    },
    {
      icon: faEye,
      label: "Lượt xem",
      value: `${(stats.totalViews / 1000000).toFixed(0)}M`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Lượt xem tháng này"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-blue-900/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nền tảng giải trí hàng đầu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kho tàng phim ảnh khổng lồ với hàng triệu lượt xem mỗi tháng
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 ${item.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
              
              <div className="relative z-10 text-center space-y-4">
                {/* Icon */}
                <div className={`mx-auto w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className={`text-2xl ${item.color}`}
                  />
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <h3 className={`text-3xl md:text-4xl font-bold ${item.color} transition-all duration-300`}>
                    {item.value}
                  </h3>
                  <p className="text-white font-semibold text-lg">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${
                      item.color.includes('red') ? 'from-red-500 to-red-600' :
                      item.color.includes('blue') ? 'from-blue-500 to-blue-600' :
                      item.color.includes('green') ? 'from-green-500 to-green-600' :
                      'from-purple-500 to-purple-600'
                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left`}
                  ></div>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FontAwesomeIcon icon={faChartLine} className={`text-sm ${item.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-700/50">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Cập nhật realtime</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <FontAwesomeIcon icon={faStar} className="text-xs" />
              <span className="text-sm font-medium">Chất lượng 4K HDR</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <FontAwesomeIcon icon={faHeart} className="text-xs" />
              <span className="text-sm font-medium">Được yêu thích nhất</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
