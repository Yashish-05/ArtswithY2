import { useNavigate } from "react-router-dom";
import { Palette, Trophy, Star, Users, Clock3 } from "lucide-react";
import Section from "../UI/Section/Section";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import Button from "../UI/Button/Button";
import useChallengeAction from "../../hooks/useChallengeAction";
import { getDaysRemaining, } from "../../utils/date";
import "./ChallengePreview.css";

const ChallengePreview = ({ challenge }) => {
    const navigate = useNavigate();
    const { joined, submitted, loading, error, handleJoin } = useChallengeAction(challenge);
    const handleSubmitClick = () => {

        navigate(`/submission/${challenge._id}`);

    };
    const handleGalleryClick = () => {

        navigate(`/gallery/${challenge._id}`);

    };

    const handleLeaderboardClick = () => {

        navigate(`/leaderboard/${challenge._id}`);

    };
    const daysLeft =
        getDaysRemaining(challenge.endDate);
    const details = [
        {
            icon: Palette,
            label: "Theme",
            value: challenge.theme
        },
        {
            icon: Trophy,
            label: "Reward",
            value: challenge.reward
        },
        {
            icon: Star,
            label: "Difficulty",
            value: challenge.difficulty
        },
        {
            icon: Users,
            label: "Artists",
            value: `${challenge.participantCount} Joined`
        },
        {
            icon: Clock3,
            label: "Ends In",
            value:
                challenge.status === "completed"
                    ? "Completed"
                    : `${daysLeft} Days Left`
        }
    ];

    return (
        <Section>
            <SectionTitle
                subtitle={
                    challenge.status === "active"
                        ? "🔥 ACTIVE NOW"
                        : challenge.status === "completed"
                            ? "🏁 CHALLENGE COMPLETED"
                            : "⏳ UPCOMING CHALLENGE"
                }
                title={challenge.title}
            />
            <p className="challenge-subtitle">
                {challenge.description}
            </p>
            <div className="challenge-preview">
                {/* LEFT */}
                <div className="challenge-art">
                    <div className="art-frame">
                        <div className="challenge-hero-card">

                            <div className="challenge-hero-icon">
                                <Palette size={42} />
                            </div>

                            <h2>{challenge.title}</h2>

                            <p>{challenge.theme}</p>

                            <div className="challenge-status">

                                <span>
                                    {challenge.status === "active"
                                        ? "🔥 Active"
                                        : challenge.status === "completed"
                                            ? "🏁 Completed"
                                            : "⏳ Upcoming"}
                                </span>

                            </div>

                            <div className="challenge-stats">

                                <div>
                                    👥 {challenge.participantCount}
                                </div>

                                <div>
                                    🖼️ {challenge.submissionCount}
                                </div>

                                <div>

                                    {
                                        challenge.status === "completed"

                                            ? "🏁 Finished"

                                            : challenge.status === "upcoming"

                                                ? "⏳ Upcoming"

                                                : `⏳ ${daysLeft} Days`

                                    }

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* RIGHT */}
                <div className="challenge-content">
                    <div className="event-panel">
                        {details.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    className="info-row"
                                    key={item.label}
                                >
                                    <div className="info-icon">
                                        <Icon size={22} strokeWidth={2.2} />
                                    </div>
                                    <div className="info-content">
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
                        <div className="event-actions">
                            {/* <Button
                                onClick={
                                    submitted
                                        ? () =>
                                           navigate(`/artworks/${challenge.artworkId}`)
                                        : joined
                                            ? handleSubmitClick
                                            : handleJoin
                                }
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "Joining..."
                                        : submitted
                                            ? "✅ Submitted"
                                            : joined
                                                ? "🎨 Submit Artwork"
                                                : "🚀 Join Today's Challenge"
                                }
                            </Button> */}
                            <Button
                                onClick={
                                    challenge.status === "completed"
                                        ? handleLeaderboardClick
                                        : submitted
                                            ? () =>
                                                navigate(`/artworks/${challenge.artworkId}`)
                                            : joined
                                                ? handleSubmitClick
                                                : handleJoin
                                }
                                disabled={
                                    loading ||
                                    challenge.status === "upcoming"
                                }
                            >

                                {
                                    loading
                                        ? "Joining..."

                                        : challenge.status === "completed"

                                            ? "🏆 View Results"

                                            : submitted

                                                ? "✅ Submitted"

                                                : joined

                                                    ? "🎨 Submit Artwork"

                                                    : "🚀 Join Today's Challenge"

                                }

                            </Button>
                            {
                                error && (
                                    <p className="challenge-error">
                                        {error}
                                    </p>
                                )
                            }
                            <div className="challenge-navigation">

                                <Button
                                    variant="secondary"
                                    onClick={handleGalleryClick}
                                >
                                    🖼️ View Gallery
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={handleLeaderboardClick}
                                >
                                    🏆 Leaderboard
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
export default ChallengePreview;