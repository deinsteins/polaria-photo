import PropTypes from "prop-types";
import useIsMobile from "../../utils/useIsMobile";
import NavBarMobile from "./mobile";

const NavBar = ({ bgnav, role, userRole }) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <NavBarMobile bgnav={bgnav} role={role} userRole={userRole} />
      ) : (
        <NavBar bgnav={bgnav} role={role} userRole={userRole} />
      )}
    </>
  );
};

NavBar.propTypes = {
  bgnav: PropTypes.string,
  role: PropTypes.string,
  userRole: PropTypes.string,
};

export default NavBar;
