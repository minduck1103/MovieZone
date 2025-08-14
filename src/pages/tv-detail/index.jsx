import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
  faStar, 
  faCalendar, 
  faTv,
  faPlay,
  faHeart,
  faBookmark,
  faShare,
  faUsers,
  faEye,
  faList
} from "@fortawesome/free-solid-svg-icons";
import { 
  getTVDetails, 
  getTVVideos, 
  getTVCredits, 
  getTVReviews, 
  getSimilarTVShows, 
  getTVRecommendations 
} from "../../api/detailService";
import { useMovieContext } from "../../context/MovieDetailContext";
import Header from "../../components/Header";
import VideoPlayer from "../../components/VideoPlayer";
import CastCrew from "../../components/CastCrew";
import ReviewSection from "../../components/ReviewSection";
import SimilarContent from "../../components/SimilarContent";

const TVDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleVideoTrailer } = useMovieContext();
  
  const [tvShow, setTVShow] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [reviews, setReviews] = useState([]);
  const [similarTVShows, setSimilarTVShows] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    if (id) {
      fetchTVData();
    }
  }, [id]);

  const fetchTVData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        tvData,
        videosData,
        creditsData,
        reviewsData,
        similarData,
        recommendationsData
      ] = await Promise.all([
        getTVDetails(id),
        getTVVideos(id),
        getTVCredits(id),
        getTVReviews(id),
        getSimilarTVShows(id),
        getTVRecommendations(id)
      ]);

      setTVShow(tvData);
      setVideos(videosData);
      setCredits(creditsData);
      setReviews(reviewsData.results || []);
      setSimilarTVShows(similarData);
      setRecommendations(recommendationsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching TV data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTrailer = () => {
    if (tvShow) {
      handleVideoTrailer(tvShow.id, "tv");
    }
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

  const getStatusColor = (status) => {
    const colors = {
      "Returning Series": "bg-green-600",
      "Ended": "bg-red-600",
      "Canceled": "bg-red-800",
      "In Production": "bg-blue-600",
      "Planned": "bg-yellow-600",
    };
    return colors[status] || "bg-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading TV show details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tvShow) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <FontAwesomeIcon icon={faTv} className="text-gray-600 text-6xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">TV Show Not Found</h2>
            <p className="text-gray-400 mb-6">
              {error || "The TV show you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = tvShow.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
    : null;

  const posterUrl = tvShow.poster_path 
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
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
              alt={tvShow.name}
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

          {/* TV Show Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={tvShow.name}
                    className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-md mx-auto aspect-[3/4] bg-gray-800 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faTv} className="text-gray-600 text-6xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Basic Info */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{tvShow.name}</h1>
                {tvShow.tagline && (
                  <p className="text-xl text-gray-300 italic mb-4">{tvShow.tagline}</p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    <span className="font-semibold">{getRating(tvShow.vote_average)}</span>
                    <span className="text-sm">({tvShow.vote_count} votes)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{formatDate(tvShow.first_air_date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faList} />
                    <span>{tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faEye} />
                    <span>{tvShow.number_of_episodes} Episodes</span>
                  </div>

                  {tvShow.status && (
                    <span className={`${getStatusColor(tvShow.status)} px-2 py-1 rounded text-xs font-medium`}>
                      {tvShow.status}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {tvShow.genres && tvShow.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tvShow.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600/30"
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
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
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
              {tvShow.overview && (
                <div>
                  <h3 className="text-2xl font-bold mb-3">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{tvShow.overview}</p>
                </div>
              )}

              {/* TV Show Specific Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800/50 rounded-lg p-6">
                {tvShow.created_by && tvShow.created_by.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Created By</h4>
                    <p className="text-white">
                      {tvShow.created_by.map(creator => creator.name).join(", ")}
                    </p>
                  </div>
                )}
                
                {tvShow.networks && tvShow.networks.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Networks</h4>
                    <p className="text-white">
                      {tvShow.networks.map(network => network.name).join(", ")}
                    </p>
                  </div>
                )}
                
                {tvShow.production_companies && tvShow.production_companies.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Production</h4>
                    <p className="text-white">
                      {tvShow.production_companies.map(company => company.name).join(", ")}
                    </p>
                  </div>
                )}
                
                {tvShow.origin_country && tvShow.origin_country.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Origin Country</h4>
                    <p className="text-white">
                      {tvShow.origin_country.join(", ")}
                    </p>
                  </div>
                )}

                {tvShow.last_air_date && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Last Aired</h4>
                    <p className="text-white">{formatDate(tvShow.last_air_date)}</p>
                  </div>
                )}

                {tvShow.next_episode_to_air && (
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Next Episode</h4>
                    <p className="text-white">
                      {formatDate(tvShow.next_episode_to_air.air_date)} - {tvShow.next_episode_to_air.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Seasons Info */}
              {tvShow.seasons && tvShow.seasons.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Seasons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tvShow.seasons.filter(season => season.season_number > 0).map((season) => (
                      <div
                        key={season.id}
                        className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-300"
                      >
                        <div className="aspect-video relative">
                          {season.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                              alt={season.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                              <FontAwesomeIcon icon={faTv} className="text-gray-500 text-3xl" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h4 className="text-white font-semibold mb-1">{season.name}</h4>
                          <p className="text-gray-400 text-sm mb-2">
                            {season.episode_count} episode{season.episode_count !== 1 ? 's' : ''}
                          </p>
                          {season.air_date && (
                            <p className="text-gray-500 text-xs">
                              Aired: {formatDate(season.air_date)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

        {/* Similar TV Shows */}
        {similarTVShows.length > 0 && (
          <SimilarContent 
            data={similarTVShows} 
            type="tv" 
            title="Similar TV Shows" 
          />
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <SimilarContent 
            data={recommendations} 
            type="tv" 
            title="Recommended TV Shows" 
            recommendations={true}
          />
        )}
      </div>
    </div>
  );
};

export default TVDetailPage;
