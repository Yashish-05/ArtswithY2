import Loader from "../../UI/Loader/Loader";
import "./ChallengeTable.css";

const ChallengeTable = ({
    challenges,
    loading,
    onSelectChallenge,
    onSelectAction,
}) => {
    if (loading) {

        return (

            <Loader text="Loading challenges..." />

        );
        if (challenges.length === 0) {

            return (

                <EmptyState

                    icon="🎯"

                    title="No Challenges Yet"

                    description="Create your first challenge to get artists participating."

                />

            );

        }

    }
    return (
        <section className="challenge-table">
            <h2>
                📋 All Challenges
            </h2>
            {
                (
                    challenges.map((challenge) => (
                        <div
                            key={challenge._id}
                            className="challenge-row"
                        >
                            <div className="challenge-info">

                                <h3>{challenge.title}</h3>

                                <p className="challenge-theme">
                                    🎨 {challenge.theme}
                                </p>

                                <div className="challenge-meta">

                                    <span>
                                        👥 {challenge.participantCount} Participants
                                    </span>

                                    <span>
                                        🖼 {challenge.submissionCount} Submissions
                                    </span>

                                    <span>
                                        📅 {new Date(challenge.startDate).toLocaleDateString()}
                                    </span>

                                </div>

                            </div>

                            <div className="challenge-actions">

                                <span
                                    className={`status ${challenge.status}`}
                                >
                                    {challenge.status}
                                </span>

                                {
                                    challenge.status === "completed" ? (

                                        <button
                                            className="winner-btn"
                                            onClick={() => {
                                                onSelectChallenge(challenge);
                                                onSelectAction("winners");
                                            }}
                                        >
                                            🏆 Winners
                                        </button>

                                    ) : (

                                        <button
                                            className="manage-btn"
                                            onClick={() => {
                                                onSelectChallenge(challenge);
                                                onSelectAction("manage");
                                            }}
                                        >
                                            ✏️ Manage
                                        </button>

                                    )
                                }

                            </div>
                        </div>
                    ))
                )
            }
        </section>
    );
};
export default ChallengeTable;