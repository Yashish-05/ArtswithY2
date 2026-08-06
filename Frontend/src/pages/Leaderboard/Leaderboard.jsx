import { useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/image";
import useLeaderboard from "../../hooks/useLeaderboard";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

import "./Leaderboard.css";
const Leaderboard = () => {
    const navigate = useNavigate();
    const { challengeId } = useParams();
    const {
        leaderboard,
        loading,
        error,
    } = useLeaderboard(challengeId);
    if (loading) {
        return <h2>Loading leaderboard...</h2>;
    }
    if (error) {
        return <h2>{error}</h2>;
    }
    const topThree = leaderboard.slice(0, 3);
    const remainingParticipants =
        leaderboard.slice(3);
    return (
        <div className="leaderboard-page">
            <button
                className="back-button"
                onClick={() => navigate(`/gallery/${challengeId}`)}
            >
                ← Challenge Gallery
            </button>
            <PageHeader
                title="🏆 Challenge Leaderboard"
                subtitle="Celebrating the highest-ranked artworks from this challenge."
            />
            {
                leaderboard.length === 0 ? (
                    <p>No submissions found.</p>
                ) : (
                    <>
                        <div className="leaderboard-stats">

                            <div className="leaderboard-stat">
                                <h2>{leaderboard.length}</h2>
                                <span>Participants</span>
                            </div>

                            <div className="leaderboard-stat">
                                <h2>
                                    {leaderboard.reduce(
                                        (sum, item) => sum + item.artwork.voteCount,
                                        0
                                    )}
                                </h2>
                                <span>Total Votes</span>
                            </div>

                            <div className="leaderboard-stat">
                                <h2>
                                    {leaderboard[0]?.artwork.voteCount ?? 0}
                                </h2>
                                <span>Winning Votes</span>
                            </div>

                        </div>
                        <div className="top-three-section">
                            {
                                topThree.map((submission, index) => (
                                    <div
                                        key={submission._id}
                                        className={`winner-card rank-${index + 1}`}
                                    >
                                        <div className="winner-badge">
                                            {
                                                index === 0
                                                    ? "🥇 Winner"
                                                    : index === 1
                                                        ? "🥈 Runner-up"
                                                        : "🥉 Third Place"
                                            }
                                        </div>
                                        <img
                                            src={getImageUrl(submission.artwork.image)}
                                            alt={submission.artwork.title}
                                        />
                                        <h2>
                                            {submission.artwork.title}
                                        </h2>
                                        <p className="artist-name">

                                            👤 {submission.artist.fullName || submission.artist.username}

                                        </p>
                                        <h3>
                                            ❤️ {submission.artwork.voteCount} Votes
                                        </h3>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            remainingParticipants.length > 0 && (
                                <>
                                    <h2 className="other-title">
                                        Other Participants
                                    </h2>
                                    {
                                        remainingParticipants.map(
                                            (submission, index) => (
                                                <div
                                                    key={submission._id}
                                                    className="leaderboard-card"
                                                >
                                                    <div className="leaderboard-rank">
                                                        #{index + 4}
                                                    </div>
                                                    <img
                                                        src={submission.artwork.image}
                                                        alt={submission.artwork.title}
                                                    />
                                                    <div className="leaderboard-info">
                                                        <h2>
                                                            {submission.artwork.title}
                                                        </h2>
                                                        <p>
                                                            {submission.artist.name}
                                                        </p>
                                                        <p>
                                                            ❤️ {submission.artwork.voteCount} Votes
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
            {/* <button
                className="back-btn"
                onClick={() =>
                    navigate(`/gallery/${challengeId}`)
                }
            >
                ← Back to Gallery
            </button> */}
        </div>
    );
};

export default Leaderboard;