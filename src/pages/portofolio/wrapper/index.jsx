import AnimatedContainer from "../../../components/animatedContainer";
import PropTypes from "prop-types";

const Wrapper = ({ title, primaryImg, secondaryImg, reverse }) => {
  return (
    <div
      className="flex p-12 mt-12 bg-gray-100"
      style={{ flexDirection: reverse ? "row-reverse" : "row" }}
    >
      <div className="flex flex-col">
        <img
          className="h-3/4 w-3/4 m-auto rounded-lg"
          src={primaryImg}
          alt=""
        />
        <h3 className="text-center text-gray-600 text-lg">{title}</h3>
      </div>
      <div>
        <AnimatedContainer>
          <img
            className="h-3/4 w-3/4 m-auto rounded-lg"
            src={secondaryImg}
            alt=""
          />
        </AnimatedContainer>
      </div>
    </div>
  );
};

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  primaryImg: PropTypes.string.isRequired,
  secondaryImg: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

export default Wrapper;
