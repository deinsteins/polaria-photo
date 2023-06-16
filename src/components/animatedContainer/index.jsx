import { useRef, useEffect } from "react";
import { TweenMax } from "gsap";

const AnimatedContainer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Use TweenMax to animate the container element
    TweenMax.from(containerRef.current, 1, { opacity: 0, y: -10 });
    TweenMax.to(containerRef.current, 1, {
      y: 10,
      opacity: 100,
      yoyo: true,
      repeat: -1,
    });

    // Cleanup on unmount
    return () => {
      TweenMax.killTweensOf(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default AnimatedContainer;
