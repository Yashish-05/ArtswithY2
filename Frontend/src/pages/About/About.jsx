import PageHeader from "../../components/UI/PageHeader/PageHeader";
import "./About.css";

const features = [
    {
        icon: "🎨",
        title: "Art Challenges",
        description:
            "Participate in exciting creative challenges and showcase your talent."
    },
    {
        icon: "❤️",
        title: "Community Voting",
        description:
            "Receive appreciation from the community through a transparent voting system."
    },
    {
        icon: "🏆",
        title: "Hall of Fame",
        description:
            "Exceptional artworks earn a permanent place among the best creations."
    },
    {
        icon: "🏛",
        title: "Virtual Museum",
        description:
            "Explore a curated collection of outstanding artworks from talented artists."
    }
];

const techStack = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Vite",
    "CSS3"
];

const About = () => {
    return (
        <div className="about-page">

            <PageHeader
                title="🎨 About Artswith_y2"
                subtitle="Where creativity meets community, competition, and recognition."
            />

            <section className="about-story">

                <h2>Our Story</h2>

                <p>
                    Artswith_y2 was created to give artists more than just
                    a place to upload artwork. It is a platform where
                    creativity is celebrated through challenges,
                    community appreciation, and permanent recognition.
                </p>

            </section>

            <section className="about-features">

                <h2>What Makes Artswith_y2 Different?</h2>

                <div className="feature-grid">

                    {features.map((feature) => (

                        <div
                            key={feature.title}
                            className="feature-card"
                        >

                            <div className="feature-icon">

                                {feature.icon}

                            </div>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                        </div>

                    ))}

                </div>

            </section>

            <section className="mission-section">

                <h2>Our Mission</h2>

                <blockquote>

                    "Every artist deserves a platform where creativity
                    is appreciated, celebrated, and remembered."

                </blockquote>

            </section>

            <section className="tech-section">

                <h2>Built With</h2>

                <div className="tech-grid">

                    {techStack.map((tech) => (

                        <div
                            key={tech}
                            className="tech-card"
                        >
                            {tech}
                        </div>

                    ))}

                </div>

            </section>

            <section className="roadmap">

                <h2>Future Roadmap</h2>

                <ul>

                    <li>🤖 AI Artwork Recommendations</li>

                    <li>📱 Mobile Application</li>

                    <li>🎥 Live Art Competitions</li>

                    <li>👥 Artist Communities</li>

                    <li>🌍 Global Challenges</li>

                </ul>

            </section>

            <section className="about-cta">

                <h2>

                    Ready to Begin Your Artistic Journey?

                </h2>

                <p>

                    Join challenges, share your creativity,
                    and become part of the Artswith_y2 community.

                </p>

            </section>

        </div>
    );
};

export default About;