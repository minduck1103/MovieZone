import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

const MovieContext = createContext();

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleVideoTrailer = async (contentId, mediaType = "movie") => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const endpoint = mediaType === "tv" ? "tv" : "movie";
      const response = await fetch(
        `https://api.themoviedb.org/3/${endpoint}/${contentId}/videos?language=en-US`,
        options
      );

      const data = await response.json();
      setTrailerUrl(data.results[0]?.key);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center mt-5">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the MovieContext
const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export { MovieProvider, MovieContext, useMovieContext };
