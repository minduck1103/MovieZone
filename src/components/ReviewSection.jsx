import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, 
  faThumbsUp, 
  faUser, 
  faChevronDown, 
  faChevronUp,
  faExternalLinkAlt 
} from "@fortawesome/free-solid-svg-icons";

const ReviewSection = ({ reviews = [], title = "Reviews" }) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [showAll, setShowAll] = useState(false);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <div className="text-center py-8">
          <FontAwesomeIcon icon={faStar} className="text-gray-600 text-4xl mb-2" />
          <p className="text-gray-400">No reviews available</p>
        </div>
      </div>
    );
  }

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <span className="text-gray-400 text-sm">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldShowToggle = review.content.length > 300;
          const displayContent = isExpanded || !shouldShowToggle 
            ? review.content 
            : review.content.slice(0, 300) + '...';

          return (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6 space-y-4">
              {/* Review Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    {review.author_details?.avatar_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w100${review.author_details.avatar_path}`}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {getInitials(review.author)}
                      </span>
                    )}
                  </div>

                  {/* Author Info */}
                  <div>
                    <h4 className="text-white font-semibold">{review.author}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{formatDate(review.created_at)}</span>
                      {review.author_details?.rating && (
                        <>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xs" />
                            <span>{review.author_details.rating}/10</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* External Link */}
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </div>

              {/* Review Content */}
              <div className="space-y-3">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {displayContent}
                </div>

                {/* Expand/Collapse Button */}
                {shouldShowToggle && (
                  <button
                    onClick={() => toggleReviewExpansion(review.id)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-300 flex items-center space-x-1 text-sm font-medium"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                    <FontAwesomeIcon 
                      icon={isExpanded ? faChevronUp : faChevronDown} 
                      className="text-xs" 
                    />
                  </button>
                )}
              </div>

              {/* Review Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <span>By {review.author}</span>
                </div>
                
                {/* Rating Display */}
                {review.author_details?.rating && (
                  <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-sm" />
                    <span className="text-white text-sm font-medium">
                      {review.author_details.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>
              {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
            </span>
            <FontAwesomeIcon 
              icon={showAll ? faChevronUp : faChevronDown} 
              className="text-sm" 
            />
          </button>
        </div>
      )}
    </div>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author_details: PropTypes.shape({
        rating: PropTypes.number,
        avatar_path: PropTypes.string,
      }),
    })
  ),
  title: PropTypes.string,
};

export default ReviewSection;
