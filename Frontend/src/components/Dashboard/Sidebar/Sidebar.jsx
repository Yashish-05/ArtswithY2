import { FaHome, FaPaintBrush, FaTrophy, FaImage, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../../utils/auth";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">

                <h2>Artswith_y2</h2>

                <p>Creative Platform</p>

            </div>
            <nav>

                <NavLink to="/dashboard">
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink to="/my-artworks">
                    <FaPaintBrush />
                    My Artworks
                </NavLink>

                <NavLink to="/arena">
                    <FaTrophy />
                    Challenges
                </NavLink>

                <NavLink to="/museum">
                    <FaImage />
                    Museum
                </NavLink>

                <NavLink to="/profile">
                    <FaUser />
                    Profile
                </NavLink>

                <div className="coming-soon">

                    <FaCog />

                    Settings

                    <span>Coming Soon</span>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </nav>
        </aside>
    );
};

export default Sidebar;