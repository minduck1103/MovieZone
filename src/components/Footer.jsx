import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500">Movie Zone</h3>
            <p className="text-gray-400">
              Khám phá thế giới điện ảnh với Movie Zone - Nơi cung cấp những bộ phim hay nhất, mới nhất và đa dạng thể loại.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/hot-movies" className="text-gray-400 hover:text-red-500 transition-colors">
                  Phim Hot
                </Link>
              </li>
              <li>
                <Link to="/popular-movies" className="text-gray-400 hover:text-red-500 transition-colors">
                  Phim Đề Cử
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Phim Sắp Chiếu
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thể Loại</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Hành Động
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Tình Cảm
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Hài Hước
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Kinh Dị
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-red-500" />
                <span>support@moviezone.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-red-500" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="text-red-500" />
                <span>332 Đường Cao Lỗ, Quận 8, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Movie Zone. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Điều Khoản Sử Dụng
              </Link>
              <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Chính Sách Bảo Mật
              </Link>
              <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 