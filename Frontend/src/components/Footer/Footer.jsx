import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">

<div className="footer-container">

    <div className="footer-brand">

        <h2>🎨 Artswith_y2</h2>

        <p className="footer-tagline">
    Sketch • Create • Inspire
</p>

    </div>

    <div className="footer-social">

        <h3>Connect With Me</h3>

        <a
            href="https://instagram.com/Artswith_y"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaInstagram />
Instagram
        </a>

        <a
            href="https://youtube.com/@Artswith_y"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaYoutube />
YouTube
        </a>

    </div>

</div>

            <div className="footer-bottom">

    <p>
        © {new Date().getFullYear()} Artswith_y2 • Created by Yashish Kamboj
    </p>

</div>

        </footer>
    );
};

export default Footer;