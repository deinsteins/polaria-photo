import { useIsAuthenticated } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBarMobile = ({ bgnav, role, userRole }) => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{ background: bgnav }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-20"
                src="/logo/polarialogo.png"
                alt="Logo"
              />
            </div>
          </div>
          <div className="flex -mr-2 items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center bg-gray-500 justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle Menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden bg-[#494949]`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Item Menu */}
          <a
            href="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          {/* Item Menu */}
          <a
            href="pricing"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </a>
          {/* Item Menu */}
          <a
            href="portofolio"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Portofolio
          </a>
          {/* Item Menu */}
          {isAuthenticated() ? (
            <div className="flex flex-col gap-4 sm:gap-16">
              {userRole || role === "admin" ? (
                <a
                  href="admin"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href="dashboard"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>
              )}
              <button
                className="text-gray-300 text-left px-3 py-2"
                onClick={() => {
                  signOut();
                  sessionStorage.clear("role");
                  navigate("/");
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <a
              href="login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login/Daftar
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

NavBarMobile.propTypes = {
  bgnav: PropTypes.string,
  role: PropTypes.string,
  userRole: PropTypes.string,
};

export default NavBarMobile;
