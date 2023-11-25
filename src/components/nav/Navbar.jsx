import { useState } from "react";
import Logo from "../Logo";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import PopClick from "./PopClick";
import useRole from "../../hook/useRole";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [pop, setPop] = useState(false);
  const { user } = useAuth();
  const role = useRole();
  const navList = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "contact" },
  ];
  const restNavList = [
    { name: "Available Camp", path: "availableCamp" },
    { name: "Dashboard", path: `dashboard/${role}-profile/profile` },
  ];
  if (!role) {
    return null;
  }
  return (
    <>
      <nav className="border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo />
          </div>
          <div className="flex gap-1 items-center">
            <PopClick pop={pop} setPop={setPop} show={0} />
            <button
              onClick={() => setShowNav(!showNav)}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${showNav ? "" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col md:items-center lg:items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navList.map((e) => (
                <NavLink
                  onClick={() => setShowNav(false)}
                  key={e.name}
                  to={e.path}
                  className={({ isActive }) =>
                    isActive ? "active-nav" : "rest-nav"
                  }
                >
                  {e.name}
                </NavLink>
              ))}
              {user
                ? restNavList.map((e) => (
                    <NavLink
                      onClick={() => setShowNav(false)}
                      key={e.name}
                      to={e.path}
                      className={({ isActive }) =>
                        isActive ? "active-nav" : "rest-nav"
                      }
                    >
                      {e.name}
                    </NavLink>
                  ))
                : null}
              <PopClick pop={pop} setPop={setPop} show={1} />
              <div className="flex gap-3 mt-3">
                {user ? null : (
                  <>
                    <Link to="/login">
                      <button className="btn-primary">Login</button>
                    </Link>
                    <Link to="/register">
                      <button className="btn-outline">Register</button>
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
