import { useIsAuthenticated } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";

const NavBar = ({ bgnav }) => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
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
              <a href="dashboard">DASHBOARD</a>
              <button onClick={() => signOut()}>LOG OUT</button>
            </div>
          ) : (
            <a href="login">LOGIN/DAFTAR</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
