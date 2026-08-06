import { useState } from "react";
import ConfirmationModal from "../../UI/ConfirmationModal/ConfirmationModal";
import { message } from "antd";
import { selectWinners } from "../../../services/challengeService";
import "./ChallengeDetails.css";

const ChallengeDetails = ({
    challenge,
    refreshChallenges,
}) => {
    const [loadingWinner, setLoadingWinner] = useState(false);
    const [winnerModalOpen, setWinnerModalOpen] = useState(false);
    const handleSelectWinners = async () => {

        try {

            setLoadingWinner(true);

            const response = await selectWinners(challenge._id);

            await refreshChallenges();
            setWinnerModalOpen(false);

            message.success(response.message);
        }

        catch (error) {

            message.error(
                error.response?.data?.message ||
                "Failed to select winners."
            );

        }

        finally {

            setLoadingWinner(false);

        }

    };
    if (!challenge) return null;

    return (

        <section className="challenge-details">

            <div className="details-header">

                <h2>{challenge.title}</h2>

                <span className={`status ${challenge.status}`}>
                    {challenge.status}
                </span>

            </div>

            <div className="challenge-overview">

    <div className="overview-card">
        <span>👥 Participants</span>
        <h3>{challenge.participantCount}</h3>
    </div>

    <div className="overview-card">
        <span>🖼 Submissions</span>
        <h3>{challenge.submissionCount}</h3>
    </div>

    <div className="overview-card">
        <span>⭐ Difficulty</span>
        <h3>{challenge.difficulty}</h3>
    </div>

    <div className="overview-card">
        <span>🎁 Reward</span>
        <h3>{challenge.reward}</h3>
    </div>

</div>

<div className="challenge-info">

    <div className="info-item">

        <strong>🎨 Theme</strong>

        <p>{challenge.theme}</p>

    </div>

    <div className="info-item">

        <strong>📅 Duration</strong>

        <p>
            {new Date(challenge.startDate).toLocaleDateString()}
            {" - "}
            {new Date(challenge.endDate).toLocaleDateString()}
        </p>

    </div>

</div>

            <div className="details-description">

                <strong>Description</strong>

                <p>{challenge.description}</p>

            </div>
            <div className="details-actions">

                {

                    challenge.status !== "completed" && (

                        <button
                            className="winner-select-btn"
                            onClick={() => setWinnerModalOpen(true)}
                            disabled={loadingWinner}
                        >

                            {

                                loadingWinner

                                    ? "Selecting..."

                                    : "🏆 Select Winners"

                            }

                        </button>

                    )

                }

            </div>

            <ConfirmationModal
                open={winnerModalOpen}
                title="Select Winners"
                description="This action will finalize the winners and cannot be undone."
                confirmText="Select Winners"
                loading={loadingWinner}
                onConfirm={handleSelectWinners}
                onCancel={() => setWinnerModalOpen(false)}
            />

        </section>
    );

};

export default ChallengeDetails;