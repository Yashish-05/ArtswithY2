import { Award, Palette, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Section from "../UI/Section/Section";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import Button from "../UI/Button/Button";

import "./HallOfFamePreview.css";

const HallOfFamePreview = () => {

    const navigate = useNavigate();

    const artwork = {
        title: "Dream World",
        artist: "Coming Soon",
        medium: "Graphite + Charcoal",
        votes: "----",
        challenge: "Dreamscape Wonders"
    };

    const details = [
        {
            icon: Award,
            label: "Artist",
            value: artwork.artist
        },
        {
            icon: Trophy,
            label: "Challenge",
            value: artwork.challenge
        },
        {
            icon: Palette,
            label: "Medium",
            value: artwork.medium
        },
        {
            icon: Heart,
            label: "Community Votes",
            value: artwork.votes
        }
    ];

    return (

        <Section>

            <SectionTitle

                subtitle="🏆 HALL OF FAME"

                title="Celebrating Excellence"

            />

            <p className="hof-subtitle">

                Every masterpiece displayed here earned its place
                through creativity, dedication, and community recognition.

            </p>

            <div className="hof-preview">

                {/* LEFT */}

                <div className="hof-art">

                    <div className="hof-frame">

                        <div className="hof-placeholder">

                            <Award size={70} />

                            <h3>Winning Artwork</h3>

                            <p>

                                The featured masterpiece will be
                                showcased here.

                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="hof-panel">

                    {details.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                className="hof-row"
                                key={item.label}
                            >

                                <div className="hof-icon">

                                    <Icon
                                        size={22}
                                        strokeWidth={2.2}
                                    />

                                </div>

                                <div className="hof-content">

                                    <span>

                                        {item.label}

                                    </span>

                                    <strong>

                                        {item.value}

                                    </strong>

                                </div>

                            </div>

                        );

                    })}

                    <div className="hof-actions">

                        <Button
                            onClick={() => navigate("/museum")}
                        >

                            Explore Museum

                        </Button>

                    </div>

                </div>

            </div>

        </Section>

    );

};

export default HallOfFamePreview;