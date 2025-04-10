import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ButtonWatchMore = ({ targetPage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(targetPage);
  };

  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 custom-margin"
      onClick={handleClick}
      style={{ marginLeft: "40px" }}
    >
      Xem thêm
    </button>
  );
};

ButtonWatchMore.propTypes = {
  targetPage: PropTypes.string.isRequired,
};

export default ButtonWatchMore;