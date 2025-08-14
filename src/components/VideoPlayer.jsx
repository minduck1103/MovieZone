import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTimes, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({ videos, title = "Videos" }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!videos || videos.length === 0) {
    return null;
  }

  // Filter and sort videos - prioritize trailers and teasers
  const sortedVideos = videos
    .filter(video => video.site === "YouTube")
    .sort((a, b) => {
      const typeOrder = { "Trailer": 1, "Teaser": 2, "Clip": 3, "Featurette": 4 };
      return (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5);
    });

  const playVideo = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedVideos.slice(0, 6).map((video) => (
          <div 
            key={video.id} 
            className="relative group cursor-pointer bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            onClick={() => playVideo(video)}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video">
              <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
                </div>
              </div>

              {/* Video Type Badge */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-semibold">
                {video.type}
              </div>
            </div>
            
            {/* Video Info */}
            <div className="p-3">
              <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                {video.name}
              </h4>
              <p className="text-gray-400 text-xs">
                {video.type} • YouTube
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
            
            {/* Video Container */}
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
                  title={selectedVideo.name}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              
              {/* Video Info */}
              <div className="p-4 bg-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {selectedVideo.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {selectedVideo.type} • Published: {new Date(selectedVideo.published_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* External Link */}
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      site: PropTypes.string.isRequired,
      published_at: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

export default VideoPlayer;
