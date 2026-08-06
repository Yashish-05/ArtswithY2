import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/image";
import Loader from "../../components/UI/Loader/Loader";
import EmptyState from "../../components/UI/EmptyState/EmptyState";
import useVote from "../../hooks/useVote";
import Button from "../../components/UI/Button/Button";

import useChallengeSubmissions from "../../hooks/useChallengeSubmissions";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import StatCard from "../../components/UI/StatCard/StatCard";

import "./ChallengeGallery.css";

const ChallengeGallery = () => {

    const navigate = useNavigate();
    const {
        vote,
        loading: voteLoading,
        votedArtworks,
    } = useVote();

    const { challengeId } = useParams();

    const {
        submissions,
        setSubmissions,
        loading,
        error,
    } = useChallengeSubmissions(challengeId);

    if (loading) {

        return <Loader text="Loading Gallery..." />;

    }

    if (error) {

        return <p>{error}</p>;

    }
    const handleVote = async (artworkId) => {
        try {
            const response = await vote(artworkId);
            toast.success(response.message);
            setSubmissions((prev) =>
                prev.map((submission) => {
                    if (
                        submission.artwork._id === artworkId
                    ) {
                        return {
                            ...submission,
                            artwork: {
                                ...submission.artwork,
                                voteCount:
                                    response.data.voteCount,
                            },
                        };
                    }
                    return submission;
                })
            );
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Voting failed."
            );
        }
    };
    console.log(submissions);
    return (
        <div className="challenge-gallery">
            <PageHeader

                icon="🎨"

                title="Challenge Gallery"

                description="Discover incredible artworks submitted by talented artists. Browse the gallery and vote for your favorite masterpiece."

            >

                <div className="gallery-stats">

                    <StatCard

                        value={submissions.length}

                        label="Artworks"

                    />

                    <StatCard

                        value={
                            submissions.reduce(
                                (total, item) =>
                                    total + item.artwork.voteCount,
                                0
                            )
                        }

                        label="Total Votes"

                    />

                </div>

            </PageHeader>
            <div className="gallery-stats">

                <div className="gallery-stat">

                    <h2>{submissions.length}</h2>

                    <span>Artworks</span>

                </div>

                <div className="gallery-stat">

                    <h2>
                        {
                            submissions.reduce(
                                (total, item) =>
                                    total +
                                    item.artwork.voteCount,
                                0
                            )
                        }
                    </h2>

                    <span>Total Votes</span>

                </div>

            </div>
            {
                submissions.length === 0 ? (
                    <div className="empty-gallery">
                        <EmptyState
                            icon="🎨"
                            title="No Artworks Yet"
                            description="Be the first artist to submit artwork for this challenge."
                        />
                        <Button
                            onClick={() =>
                                navigate(
                                    `/submission/${challengeId}`
                                )
                            }
                        >
                            Submit Artwork
                        </Button>
                        <button
                            className="leaderboard-btn"
                            onClick={() =>
                                navigate(`/leaderboard/${challengeId}`)
                            }
                        >
                            🏆 View Leaderboard
                        </button>
                    </div>
                ) : (
                    <div className="challenge-gallery-grid">
                        {submissions.map((submission) => (
                            <article
                                className="challenge-gallery-card"
                                key={submission._id}
                            >
                                <div
                                    className="challenge-gallery-image"
                                    onClick={() =>
                                        navigate(`/artworks/${submission.artwork._id}`)
                                    }
                                >

                                    <img
                                        src={getImageUrl(submission.artwork.image)}
                                        alt={submission.artwork.title}
                                    />
                                </div>
                                <div className="challenge-gallery-body">
                                    <h3>
                                        {submission.artwork.title}
                                    </h3>
                                    <p>
                                        {
                                            submission.artwork.description.length > 120
                                                ?
                                                submission.artwork.description.slice(0, 120) + "..."
                                                :
                                                submission.artwork.description
                                        }
                                    </p>

                                    <div className="challenge-gallery-meta">

                                        <div>
                                            <strong>Artist : </strong>
                                            <span>
                                                {
                                                    submission.artist.fullName ||
                                                    submission.artist.username ||
                                                    "Unknown Artist"
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <strong>Votes</strong>
                                            <span>
                                                ❤️ {submission.artwork.voteCount}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleVote(submission.artwork._id)
                                        }
                                        disabled={
                                            voteLoading ||
                                            votedArtworks.includes(
                                                submission.artwork._id
                                            )
                                        }
                                    >
                                        {
                                            votedArtworks.includes(
                                                submission.artwork._id
                                            )
                                                ? "✅ Voted"
                                                : voteLoading
                                                    ? "Voting..."
                                                    : "❤️ Vote"
                                        }
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                )
            }
        </div>
    );
};
export default ChallengeGallery;