import { useRef, useEffect } from "react";
import { TweenMax } from "gsap";
import PropTypes from "prop-types";

const AnimatedContainer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Gunakan TweenMax untuk menganimasikan elemen kontainer
    TweenMax.from(containerRef.current, 1, { opacity: 0, y: -10 });
    TweenMax.to(containerRef.current, 1, {
      y: 10,
      opacity: 1,
      yoyo: true,
      repeat: -1,
    });

    // Membersihkan saat komponen di-unmount
    return () => {
      TweenMax.killTweensOf(containerRef.current);
    };
  }, []);

  return (
    <div className="sm:w-3/4 mx-auto" ref={containerRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

AnimatedContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimatedContainer;
