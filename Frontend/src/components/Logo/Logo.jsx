import { Link } from "react-router-dom";
import { FaPaintBrush } from "react-icons/fa";

import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <FaPaintBrush className="logo-icon" />
      <span className="logo-text">
        Arts
        <span className="logo-gradient">
          with_y2
        </span>
      </span>
    </Link>
  );
};

export default Logo;