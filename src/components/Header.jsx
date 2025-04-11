import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 
  const handleSearch = () => {
    if (search.trim()) {
      onSearch(search);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-4 flex justify-between fixed top-0 left-0 w-full z-[9999] bg-black">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie Zone</h1>
        <nav className="hidden md:flex items-center space-x-5">
          <Link to="/" className="hover:text-red-700">
            Home
          </Link>
          <Link to="/hot-movies" className="hover:text-red-700">
            Phim Hot
          </Link>
          <Link to="/popular-movies" className="hover:text-red-700">
            Phim Đề cử
          </Link>
          <Link to="/" className="hover:text-red-700">
            Phim Sắp ra Mắt
          </Link>
          <Link to="/" className="hover:text-red-700">
            Thể loại
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-5 relative">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="border border-gray-300 p-2 text-black rounded-md pr-8" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;