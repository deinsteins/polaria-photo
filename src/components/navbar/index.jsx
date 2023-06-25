import PropTypes from "prop-types";
import NavBarMobile from "./mobile";
import NavBarDesktop from "./desktop";
import { isMobile } from "react-device-detect";

const NavBar = ({ bgnav, role, userRole }) => {
  const RenderNavBar = isMobile ? NavBarMobile : NavBarDesktop;

  return <RenderNavBar bgnav={bgnav} role={role} userRole={userRole} />;
};

NavBar.propTypes = {
  bgnav: PropTypes.string,
  role: PropTypes.string,
  userRole: PropTypes.string,
};

export default NavBar;
