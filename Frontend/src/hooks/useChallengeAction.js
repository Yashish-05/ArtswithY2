import { useEffect, useState } from "react";
import { joinChallenge } from "../services/challengeService";

const useChallengeAction = (challenge) => {

    const [loading, setLoading] = useState(false);
   const [joined, setJoined] = useState(
    challenge?.hasJoined || false
);

const [submitted, setSubmitted] = useState(
    challenge?.hasSubmitted || false
);
    const [error, setError] = useState("");
   useEffect(() => {

    setJoined(challenge?.hasJoined || false);

    setSubmitted(challenge?.hasSubmitted || false);

}, [challenge]);

    const handleJoin = async () => {

        if (!challenge?._id) return;

        try {

            setLoading(true);
            setError("");

            const response = await joinChallenge(challenge._id);

            if (response.success) {

                setJoined(true);

            }

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to join challenge."

            );

        } finally {

            setLoading(false);

        }

    };

    return {

        joined,
 submitted,
        loading,

        error,

        handleJoin

    };

};

export default useChallengeAction;