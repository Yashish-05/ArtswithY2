import Section from "../UI/Section/Section";
import Button from "../UI/Button/Button";

import "./Hero.css";

const Hero = () => {
    return (
        <Section className="hero">
            <div className="hero-content">
                {/* LEFT */}
                <div className="hero-left">
                    <span className="hero-badge">
                        🎨 Welcome to Artswith_y2
                    </span>
                    <h1>
                        Compete.
                        <br />
                        Create.
                        <br />
                        Exhibit.
                    </h1>
                    <p>
                        Join exciting art challenges, showcase your creativity,
                        receive community recognition, and earn your place in
                        the Hall of Fame inside our Virtual Museum.
                    </p>
                    <div className="hero-buttons">
                        <Button>
                            Join Challenge
                        </Button>
                        <Button variant="outline">
                            Explore Museum
                        </Button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <h3>1200+</h3>
                            <span>Artists</span>
                        </div>
                        <div className="stat-item">
                            <h3>5000+</h3>
                            <span>Artworks</span>
                        </div>
                        <div className="stat-item">
                            <h3>250+</h3>
                            <span>Challenges</span>
                        </div>
                    </div>
                </div>
                {/* RIGHT */}
                <div className="hero-right">
                    <div className="hero-placeholder">
                        <div className="hero-gallery">
                            <div className="hero-gallery-card card-1">
                                🎨 Portrait
                            </div>
                            <div className="hero-gallery-card card-2">
                                ✏️ Pencil Art
                            </div>
                            <div className="hero-gallery-card card-3">
                                🏆 Hall of Fame
                            </div>
                            <div className="hero-gallery-card card-4">
                                🌿 Nature
                            </div>
                            <div className="hero-gallery-card card-5">
                                👥 Community
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
export default Hero;