import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
  faStar, 
  faCalendar, 
  faClock, 
  faGlobe,
  faPlay,
  faHeart,
  faBookmark,
  faShare,
  faFilm,
  faUsers,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import { 
  getMovieDetails, 
  getMovieVideos, 
  getMovieCredits, 
  getMovieReviews, 
  getSimilarMovies, 
  getMovieRecommendations 
} from "../../api/detailService";
import { useMovieContext } from "../../context/MovieDetailContext";
import Header from "../../components/Header";
import VideoPlayer from "../../components/VideoPlayer";
import CastCrew from "../../components/CastCrew";
import ReviewSection from "../../components/ReviewSection";
import SimilarContent from "../../components/SimilarContent";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleVideoTrailer } = useMovieContext();
  
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (id) {
      fetchMovieData();
    }
  }, [id]);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        movieData,
        videosData,
        creditsData,
        reviewsData,
        similarData,
        recommendationsData
      ] = await Promise.all([
        getMovieDetails(id),
        getMovieVideos(id),
        getMovieCredits(id),
        getMovieReviews(id),
        getSimilarMovies(id),
        getMovieRecommendations(id)
      ]);

      setMovie(movieData);
      setVideos(videosData);
      setCredits(creditsData);
      setReviews(reviewsData.results || []);
      setSimilarMovies(similarData);
      setRecommendations(recommendationsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching movie data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTrailer = () => {
    if (movie) {
      handleVideoTrailer(movie.id, "movie");
    }
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRating = (rating) => {
    return rating ? rating.toFixed(1) : "N/A";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <FontAwesomeIcon icon={faFilm} className="text-gray-600 text-6xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
            <p className="text-gray-400 mb-6">
              {error || "The movie you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      {/* Hero Section */}
      <div className="relative">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-transparent to-[#0f172a]/60"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-8 pb-16">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 mb-8"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </button>

          {/* Movie Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-md mx-auto aspect-[3/4] bg-gray-800 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faFilm} className="text-gray-600 text-6xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Basic Info */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    <span className="font-semibold">{getRating(movie.vote_average)}</span>
                    <span className="text-sm">({movie.vote_count} votes)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>

                  {movie.status && (
                    <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">
                      {movie.status}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-600/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handlePlayTrailer}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faPlay} />
                  <span>Watch Trailer</span>
                </button>
                
                <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Favorite</span>
                </button>
                
                <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  <FontAwesomeIcon icon={faBookmark} />
                  <span>Watchlist</span>
                </button>
                
                <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  <FontAwesomeIcon icon={faShare} />
                  <span>Share</span>
                </button>
              </div>

              {/* Overview */}
              {movie.overview && (
                <div>
                  <h3 className="text-2xl font-bold mb-3">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                </div>
              )}

              {/* Additional Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800/50 rounded-lg p-6">
                {movie.budget > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Budget</h4>
                    <p className="text-white">{formatCurrency(movie.budget)}</p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Revenue</h4>
                    <p className="text-white">{formatCurrency(movie.revenue)}</p>
                  </div>
                )}
                
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Production</h4>
                    <p className="text-white">
                      {movie.production_companies.map(company => company.name).join(", ")}
                    </p>
                  </div>
                )}
                
                {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Languages</h4>
                    <p className="text-white">
                      {movie.spoken_languages.map(lang => lang.english_name).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Videos */}
        {videos && videos.length > 0 && (
          <VideoPlayer videos={videos} title="Videos & Trailers" />
        )}

        {/* Cast & Crew */}
        {(credits.cast.length > 0 || credits.crew.length > 0) && (
          <CastCrew cast={credits.cast} crew={credits.crew} />
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <ReviewSection reviews={reviews} />
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <SimilarContent 
            data={similarMovies} 
            type="movie" 
            title="Similar Movies" 
          />
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <SimilarContent 
            data={recommendations} 
            type="movie" 
            title="Recommended Movies" 
            recommendations={true}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
