import { useState } from "react";
import { formatDate } from "../../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PhotoCard = ({ date, location, imgWidth, linkPhoto, status }) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        src="images/album.jpg"
        alt="photo"
        className={`w-${imgWidth} h-auto`}
      />
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{formatDate(date)}</div>
        <div className="text-lg mb-2">Lokasi: {location}</div>
        <div className="text-lg mb-2">Status: {status}</div>
      </div>
      <button
        onClick={() => {
          linkPhoto ? navigate(linkPhoto) : setError(true);
        }}
        className="w-full bg-blue-600 text-white px-2 py-3 rounded-lg"
      >
        Link Photo
      </button>
      {error ? (
        <p className="text-red-600 text-center">Link Photo Belum Ada</p>
      ) : null}
    </div>
  );
};

PhotoCard.propTypes = {
  date: PropTypes.string,
  location: PropTypes.string,
  imgWidth: PropTypes.string,
  linkPhoto: PropTypes.string,
  status: PropTypes.string,
};

export default PhotoCard;
