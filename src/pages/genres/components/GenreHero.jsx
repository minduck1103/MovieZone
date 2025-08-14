import React from "react";
import PropTypes from "prop-types";

const GenreHero = ({ genreName, movieCount, backgroundImage }) => {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage || "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg"}
          alt={genreName}
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Genre Badge */}
            <div className="mb-4">
              <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Thể Loại
              </span>
            </div>

            {/* Genre Name */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {genreName}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Khám phá những bộ phim {genreName.toLowerCase()} hay nhất mọi thời đại. 
              {movieCount && (
                <span className="block mt-2 text-red-400 font-semibold">
                  {movieCount.toLocaleString()} phim có sẵn
                </span>
              )}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Được cập nhật hàng ngày</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Chất lượng cao</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/20 to-transparent rounded-tl-full"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-bl-full"></div>
    </div>
  );
};

GenreHero.propTypes = {
  genreName: PropTypes.string.isRequired,
  movieCount: PropTypes.number,
  backgroundImage: PropTypes.string,
};

export default GenreHero;
