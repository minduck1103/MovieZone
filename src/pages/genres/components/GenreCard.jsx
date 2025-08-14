import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GenreCard = ({ genre, backdropImage }) => {
  // Genre background images mapping
  const getGenreBackground = (genreId) => {
    const genreBackgrounds = {
      28: "https://image.tmdb.org/t/p/w780/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", // Action
      12: "https://image.tmdb.org/t/p/w780/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg", // Adventure
      16: "https://image.tmdb.org/t/p/w780/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", // Animation
      35: "https://image.tmdb.org/t/p/w780/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg", // Comedy
      80: "https://image.tmdb.org/t/p/w780/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", // Crime
      99: "https://image.tmdb.org/t/p/w780/yF1eOkaYvwiORauRCPWznV9xVvi.jpg", // Documentary
      18: "https://image.tmdb.org/t/p/w780/kqjL17yufvn9OVLyXYpvtyrFfak.jpg", // Drama
      10751: "https://image.tmdb.org/t/p/w780/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg", // Family
      14: "https://image.tmdb.org/t/p/w780/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", // Fantasy
      36: "https://image.tmdb.org/t/p/w780/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg", // History
      27: "https://image.tmdb.org/t/p/w780/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg", // Horror
      10402: "https://image.tmdb.org/t/p/w780/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", // Music
      9648: "https://image.tmdb.org/t/p/w780/vfrQk5IPloGg1v9Petm0P9L2Dt.jpg", // Mystery
      10749: "https://image.tmdb.org/t/p/w780/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg", // Romance
      878: "https://image.tmdb.org/t/p/w780/5UkzNSOK561c2QRy2Zr4AkADzLT.jpg", // Science Fiction
      10770: "https://image.tmdb.org/t/p/w780/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg", // TV Movie
      53: "https://image.tmdb.org/t/p/w780/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg", // Thriller
      10752: "https://image.tmdb.org/t/p/w780/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg", // War
      37: "https://image.tmdb.org/t/p/w780/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg", // Western
    };
    
    return genreBackgrounds[genreId] || "https://image.tmdb.org/t/p/w780/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg";
  };

  return (
    <Link 
      to={`/genres/${genre.id}`}
      className="group relative block overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Background Image */}
      <div className="relative h-48 w-full">
        <img
          src={backdropImage || getGenreBackground(genre.id)}
          alt={genre.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-red-500/0 transition-all duration-300 group-hover:bg-red-500/20" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
          {genre.name}
        </h3>
        
        {/* Genre Icon/Indicator */}
        <div className="mt-2 flex items-center">
          <div className="h-1 w-8 bg-red-500 rounded-full mr-2" />
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            Khám phá
          </span>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    </Link>
  );
};

GenreCard.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  backdropImage: PropTypes.string,
};

export default GenreCard;
