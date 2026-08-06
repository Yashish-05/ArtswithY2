import {
    FaPaintBrush,
    FaPencilAlt,
    FaUpload,
    FaUsers,
    FaTrophy,
} from "react-icons/fa";

import { MdMuseum } from "react-icons/md";

import Section from "../UI/Section/Section";
import SectionTitle from "../UI/SectionTitle/SectionTitle";

import "./JourneyTimeline.css";

const steps = [

    {
        number: "01",
        icon: <FaPaintBrush />,
        title: "Join Challenge",
        description:
            "Pick an active challenge and begin your artistic journey."
    },

    {
        number: "02",
        icon: <FaPencilAlt />,
        title: "Create Artwork",
        description:
            "Bring your imagination to life using your favourite medium."
    },

    {
        number: "03",
        icon: <FaUpload />,
        title: "Submit Artwork",
        description:
            "Upload your masterpiece before the deadline."
    },

    {
        number: "04",
        icon: <FaUsers />,
        title: "Community Voting",
        description:
            "Receive appreciation, feedback and votes from artists."
    },

    {
        number: "05",
        icon: <FaTrophy />,
        title: "Become Winner",
        description:
            "Earn recognition and unlock exclusive rewards."
    },

    {
        number: "06",
        icon: <MdMuseum />,
        title: "Hall of Fame",
        description:
            "Winning artworks become part of the Virtual Museum."
    }

];

const JourneyTimeline = () => {

    return (

        <Section>

            <SectionTitle
                subtitle="The Artist's Journey"
                title="Every Masterpiece Begins With One Challenge"
            />

            <div className="journey-timeline">
                <div className="journey-bg">

                    <span className="orb orb-1"></span>

                    <span className="orb orb-2"></span>

                    <span className="orb orb-3"></span>

                </div>
                <svg
                    className="journey-path"
                    viewBox="0 0 1000 1800"
                    preserveAspectRatio="none"
                >
                    <defs>

                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >

                            <stop
                                offset="0%"
                                stopColor="#7C3AED"
                            />

                            <stop
                                offset="50%"
                                stopColor="#A855F7"
                            />

                            <stop
                                offset="100%"
                                stopColor="#F59E0B"
                            />

                        </linearGradient>

                    </defs>
                    <path
                        d="
            M500 120
            C650 220 650 320 500 420
            C350 520 350 620 500 720
            C650 820 650 920 500 1020
            C350 1120 350 1220 500 1320
            C650 1420 650 1520 500 1620

            "
                    />
                </svg>
                {
                    steps.map((step, index) => (
                        <div
                            key={index}
                            className={`journey-step ${index % 2 === 0
                                ? "left"
                                : "right"
                                }`}
                        >
                            <div
                                className="journey-dot"
                                style={{
                                    animationDelay: `${index * .25}s`
                                }}
                            >
                                {step.icon}
                            </div>
                            <div className="journey-card" style={{ animationDelay: `${0.5 + index * .35}s` }}>
                                <span>
                                    {step.number}
                                </span>
                                <h3>
                                    {step.title}
                                </h3>
                                <p>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Section>
    );
};

export default JourneyTimeline;