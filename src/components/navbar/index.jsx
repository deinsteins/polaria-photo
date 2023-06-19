import { useIsAuthenticated } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavBar = ({ bgnav, role, userRole }) => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between p-6 gap-12"
      style={{ background: bgnav }}
    >
      <a href="/">
        <img src="/logo/polarialogo.png" alt="" />
      </a>
      <div className="w-3/4 h-[10%] bg-[#494949] p-4 text-white rounded-full my-auto">
        <div className="flex justify-around">
          <a href="pricing">PRICING</a>
          <a href="portofolio">PORTOFOLIO</a>
          {isAuthenticated() ? (
            <div className="flex gap-16">
              {userRole || role === "admin" ? (
                <a href="admin">DASHBOARD</a>
              ) : (
                <a href="dashboard">DASHBOARD</a>
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
            <a href="login">LOGIN/DAFTAR</a>
          )}
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  bgnav: PropTypes.string,
  role: PropTypes.string,
  userRole: PropTypes.string,
};

export default NavBar;
