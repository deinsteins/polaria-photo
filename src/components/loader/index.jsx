import PropTypes from "prop-types";

function Loader({ text }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      <p className="mt-2 text-gray-900">{text}</p>
    </div>
  );
}

Loader.propTypes = {
  text: PropTypes.string,
};

export default Loader;
