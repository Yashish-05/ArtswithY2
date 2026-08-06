import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, getUser, logout, } from "../../utils/auth";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import Logo from "../Logo/Logo";
import Button from "../UI/Button/Button";
import ConfirmationModal from "../UI/ConfirmationModal/ConfirmationModal";

import { navLinks } from "../../constants/navigation";

import "./Navbar.css";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();
  const user = getUser();
  const handleLogout = () => {
    setLogoutOpen(false);
    logout();
    navigate("/login");
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setProfileOpen(false);

      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Logo />
        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="navbar-actions">
          {
            !isLoggedIn ? (
              <>
                <NavLink to="/login">
                  <Button variant="secondary">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button>
                    Sign Up
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                {
                  user?.role === "admin" ? (

                    <NavLink to="/admin">

                      <Button>

                        Admin Panel

                      </Button>

                    </NavLink>

                  ) : (

                    <NavLink to="/dashboard">

                      <Button>

                        Dashboard

                      </Button>

                    </NavLink>

                  )
                }
                <div
                  className="profile-menu"
                  ref={dropdownRef}
                >
                  <button
                    className="profile-trigger"
                    onClick={() =>
                      setProfileOpen(!profileOpen)
                    }
                  >
                    {
                      user?.fullName
                        ? user.fullName.charAt(0).toUpperCase()
                        : "Y"
                    } ▼
                  </button>
                  {
                    profileOpen && (
                      <div className="profile-dropdown">
                        <div className="profile-header">

                          <strong>

                            {user?.fullName || user?.username}

                          </strong>

                          <p>

                            {user?.role}

                          </p>

                        </div>
                        <NavLink
                          to="/profile"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                        >
                          👤 Profile
                        </NavLink>
                        <button>
                          ⚙ Settings
                        </button>
                        <button
                          onClick={() => setLogoutOpen(true)}
                        >
                          🚪 Logout
                        </button>
                      </div>
                    )
                  }
                </div>
              </>
            )
          }
        </div>
        <div
          className="mobile-menu"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <HiOutlineX />
          ) : (
            <HiOutlineMenuAlt3 />
          )}
        </div>
      </div>
      <ConfirmationModal
        open={logoutOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </header>
  );
};

export default Navbar;