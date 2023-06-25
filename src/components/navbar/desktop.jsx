import { useIsAuthenticated } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavBar = ({ bgnav, role, userRole }) => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <nav
      className="flex flex-col sm:flex-row justify-between p-6 gap-2 sm:gap-12"
      style={{ background: bgnav }}
    >
      <a href="/">
        <img src="/logo/polarialogo.png" alt="" />
      </a>
      <div className="w-full sm:w-3/4 h-[10%] bg-[#494949] p-4 text-white rounded-full my-auto">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-around">
          <a href="pricing" className="mb-2 sm:mb-0">
            PRICING
          </a>
          <a href="portofolio" className="mb-2 sm:mb-0">
            PORTOFOLIO
          </a>
          {isAuthenticated() ? (
            <div className="flex gap-4 sm:gap-16">
              {userRole || role === "admin" ? (
                <a href="admin" className="mb-2 sm:mb-0">
                  DASHBOARD
                </a>
              ) : (
                <a href="dashboard" className="mb-2 sm:mb-0">
                  DASHBOARD
                </a>
              )}
              <button
                onClick={() => {
                  signOut();
                  sessionStorage.clear("role");
                  navigate("/");
                }}
              >
                LOG OUT
              </button>
            </div>
          ) : (
            <a href="login" className="mb-2 sm:mb-0">
              LOGIN/DAFTAR
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  bgnav: PropTypes.string,
  role: PropTypes.string,
  userRole: PropTypes.string,
};

export default NavBar;
