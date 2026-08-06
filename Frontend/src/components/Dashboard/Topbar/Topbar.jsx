import { FaBell } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

import "./Topbar.css";

const Topbar = () => {
    const { user } = useAuth();
    return (
        <header className="topbar">
            <div>
                <h1>
                    Welcome Back 👋
                </h1>
                <p>
                    Ready to create your next masterpiece?
                </p>
            </div>

            <div className="topbar-right">
                <button className="notification-btn">
                    <FaBell/>
                </button>
                <div className="profile-avatar">
                    Y
                </div>
            </div>
        </header>
    );
};

export default Topbar;