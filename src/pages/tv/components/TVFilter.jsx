import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TVFilter = ({ 
  genres, 
  selectedGenres, 
  onGenreToggle, 
  onClearAll,
  sortBy,
  onSortChange,
  year,
  onYearChange,
  rating,
  onRatingChange,
  status,
  onStatusChange,
  network,
  onNetworkChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: "popularity.desc", label: "Phổ biến nhất" },
    { value: "vote_average.desc", label: "Đánh giá cao nhất" },
    { value: "first_air_date.desc", label: "Mới nhất" },
    { value: "vote_count.desc", label: "Nhiều đánh giá nhất" },
    { value: "name.asc", label: "Tên A-Z" },
  ];

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "0", label: "Returning Series" },
    { value: "1", label: "Planned" },
    { value: "2", label: "In Production" },
    { value: "3", label: "Ended" },
    { value: "4", label: "Canceled" },
    { value: "5", label: "Pilot" },
  ];

  const networkOptions = [
    { value: "", label: "Tất cả mạng" },
    { value: "213", label: "Netflix" },
    { value: "1024", label: "Amazon Prime Video" },
    { value: "2739", label: "Disney+" },
    { value: "453", label: "Hulu" },
    { value: "49", label: "HBO" },
    { value: "174", label: "AMC" },
    { value: "67", label: "Showtime" },
    { value: "4", label: "BBC One" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-gray-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faFilter} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-white">Bộ lọc TV Shows</h3>
          {selectedGenres.length > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {selectedGenres.length}
            </span>
          )}
        </div>
        
        {selectedGenres.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
          >
            <FontAwesomeIcon icon={faTimes} />
            <span>Xóa tất cả</span>
          </button>
        )}
      </div>

      {/* Single Row Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Sort By */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg text-left flex items-center justify-between hover:bg-gray-600 transition-colors text-sm"
          >
            <span className="truncate text-xs lg:text-sm">
              {sortOptions.find(opt => opt.value === sortBy)?.label || "Sắp xếp"}
            </span>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`transition-transform text-xs ${isSortOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-20 border border-gray-600">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg text-sm"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year Filter */}
        <div>
          <select
            value={year || ""}
            onChange={(e) => onYearChange(e.target.value || null)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            <option value="">Tất cả năm</option>
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <select
            value={rating || ""}
            onChange={(e) => onRatingChange(e.target.value || null)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            <option value="">Tất cả đánh giá</option>
            <option value="8">8.0+ ⭐</option>
            <option value="7">7.0+ ⭐</option>
            <option value="6">6.0+ ⭐</option>
            <option value="5">5.0+ ⭐</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={status || ""}
            onChange={(e) => onStatusChange(e.target.value || null)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Network Filter */}
        <div>
          <select
            value={network || ""}
            onChange={(e) => onNetworkChange(e.target.value || null)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            {networkOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Toggle */}
        <div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm"
          >
            <FontAwesomeIcon icon={faFilter} className="text-xs" />
            <span className="hidden sm:inline">Thể loại</span>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`transition-transform text-xs ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Genre Chips */}
      {isFilterOpen && (
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => onGenreToggle(genre.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedGenres.includes(genre.id)
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Genres Display */}
      {selectedGenres.length > 0 && !isFilterOpen && (
        <div className="border-t border-gray-700 pt-4 mt-4">
          <p className="text-sm text-gray-400 mb-2">Thể loại đã chọn:</p>
          <div className="flex flex-wrap gap-2">
            {selectedGenres.map((genreId) => {
              const genre = genres.find(g => g.id === genreId);
              return (
                <span
                  key={genreId}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{genre?.name}</span>
                  <button
                    onClick={() => onGenreToggle(genreId)}
                    className="hover:bg-blue-600 rounded-full p-1"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xs" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

TVFilter.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedGenres: PropTypes.array.isRequired,
  onGenreToggle: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  year: PropTypes.string,
  onYearChange: PropTypes.func.isRequired,
  rating: PropTypes.string,
  onRatingChange: PropTypes.func.isRequired,
  status: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
  network: PropTypes.string,
  onNetworkChange: PropTypes.func.isRequired,
};

export default TVFilter;
