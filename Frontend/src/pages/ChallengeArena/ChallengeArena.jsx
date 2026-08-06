import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import EmptyState from "../../components/UI/EmptyState/EmptyState";
import ChallengePreview from "../../components/ChallengePreview/ChallengePreview";
import useChallenges from "../../hooks/useChallenge";

const ChallengeArena = () => {
    const {
        challenges,
        loading,
        error,
    } = useChallenges();
    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    if (!challenges || challenges.length === 0) {
        return (
            <EmptyState
                title="No Challenges"
                description="No active challenges are available."
            />
        );
    }
    return (
        <>
            {
                challenges.map((challenge)=>(

                    <ChallengePreview

                        key={challenge._id}

                        challenge={challenge}
                    />
                ))
            }
        </>
    );
};

export default ChallengeArena;