import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/logo-white.png";
function Navbar({ user, setUser }) {
  const logOut = () => {
    localStorage.clear();
    setUser({});
  };

  return (
    <div className="md:flex md:items-center md:justify-between py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold">
      <Link to="/">
        <img className="h-12" src={logo} alt="SmartSummary" />
      </Link>
      <nav>
        <ul className="text-base list-reset md:flex md:items-center">
          <li className="md:ml-4">
            <Link
              className="block no-underline py-2 md:border-none md:p-0 font-bold"
              to="/"
            >
              Home
            </Link>
          </li>
          {user.email ? (
            <>
              <li className="md:ml-4">
                <Link
                  className="border-t block no-underline py-2 md:border-none md:p-0 font-bold"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="md:ml-4">
  <a
    className="border-t block no-underline py-2 md:border-none md:p-0 font-bold"
    href="/textEditor.html"
    target="_blank"  // Opens in a new tab (optional)
    rel="noopener noreferrer" // Security best practice
  >
    Upload Audio
  </a>
</li>

              
              <li className="md:ml-4">
                <button
                  onClick={logOut}
                  className="border-t block no-underline py-2 md:border-none md:p-0 font-bold focus:outline-none"
                >
                  LogOut
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="md:ml-4">
                <Link
                  className="border-t block no-underline py-2 md:border-none md:p-0 font-bold"
                  to="/register"
                >
                  Register
                </Link>
              </li>
              <li className="md:ml-4">
                <Link
                  className="block no-underline py-2 md:border-none md:p-0 font-bold"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
