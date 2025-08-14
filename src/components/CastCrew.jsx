import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const CastCrew = ({ cast = [], crew = [], title = "Cast & Crew" }) => {
  const [activeTab, setActiveTab] = useState("cast");
  const [castStartIndex, setCastStartIndex] = useState(0);
  const [crewStartIndex, setCrewStartIndex] = useState(0);
  
  const itemsPerPage = 6;

  if (!cast.length && !crew.length) {
    return null;
  }

  // Filter key crew members
  const keyCrewRoles = ["Director", "Producer", "Executive Producer", "Screenplay", "Writer", "Original Music Composer", "Director of Photography"];
  const keyCrew = crew.filter(member => keyCrewRoles.includes(member.job));

  const handleCastNext = () => {
    if (castStartIndex + itemsPerPage < cast.length) {
      setCastStartIndex(castStartIndex + itemsPerPage);
    }
  };

  const handleCastPrev = () => {
    if (castStartIndex > 0) {
      setCastStartIndex(Math.max(0, castStartIndex - itemsPerPage));
    }
  };

  const handleCrewNext = () => {
    if (crewStartIndex + itemsPerPage < keyCrew.length) {
      setCrewStartIndex(crewStartIndex + itemsPerPage);
    }
  };

  const handleCrewPrev = () => {
    if (crewStartIndex > 0) {
      setCrewStartIndex(Math.max(0, crewStartIndex - itemsPerPage));
    }
  };

  const renderPersonCard = (person, showRole = true) => (
    <div key={person.id || `${person.name}-${person.character || person.job}`} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-300">
      <div className="aspect-[3/4] relative">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-500 text-6xl" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">
          {person.name}
        </h4>
        {showRole && (
          <p className="text-gray-400 text-xs line-clamp-2">
            {person.character || person.job}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("cast")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
            activeTab === "cast"
              ? "bg-red-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          Cast ({cast.length})
        </button>
        <button
          onClick={() => setActiveTab("crew")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
            activeTab === "crew"
              ? "bg-red-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          Crew ({keyCrew.length})
        </button>
      </div>

      {/* Cast Tab */}
      {activeTab === "cast" && cast.length > 0 && (
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cast.slice(castStartIndex, castStartIndex + itemsPerPage).map(person => 
              renderPersonCard(person, true)
            )}
          </div>
          
          {/* Navigation Buttons */}
          {cast.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleCastPrev}
                disabled={castStartIndex === 0}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  castStartIndex === 0
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              
              <span className="text-gray-400 text-sm">
                {castStartIndex + 1}-{Math.min(castStartIndex + itemsPerPage, cast.length)} of {cast.length}
              </span>
              
              <button
                onClick={handleCastNext}
                disabled={castStartIndex + itemsPerPage >= cast.length}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  castStartIndex + itemsPerPage >= cast.length
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Crew Tab */}
      {activeTab === "crew" && keyCrew.length > 0 && (
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {keyCrew.slice(crewStartIndex, crewStartIndex + itemsPerPage).map(person => 
              renderPersonCard(person, true)
            )}
          </div>
          
          {/* Navigation Buttons */}
          {keyCrew.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleCrewPrev}
                disabled={crewStartIndex === 0}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  crewStartIndex === 0
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              
              <span className="text-gray-400 text-sm">
                {crewStartIndex + 1}-{Math.min(crewStartIndex + itemsPerPage, keyCrew.length)} of {keyCrew.length}
              </span>
              
              <button
                onClick={handleCrewNext}
                disabled={crewStartIndex + itemsPerPage >= keyCrew.length}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  crewStartIndex + itemsPerPage >= keyCrew.length
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "cast" && cast.length === 0) || (activeTab === "crew" && keyCrew.length === 0)) && (
        <div className="text-center py-8">
          <FontAwesomeIcon icon={faUserCircle} className="text-gray-600 text-4xl mb-2" />
          <p className="text-gray-400">
            No {activeTab} information available
          </p>
        </div>
      )}
    </div>
  );
};

CastCrew.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      character: PropTypes.string,
      profile_path: PropTypes.string,
    })
  ),
  crew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

export default CastCrew;
