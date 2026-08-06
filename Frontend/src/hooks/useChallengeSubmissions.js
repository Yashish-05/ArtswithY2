import { useEffect, useState } from "react";

import { getChallengeSubmissions }
    from "../services/submissionService";

const useChallengeSubmissions = (challengeId) => {

    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!challengeId) return;

        const fetchSubmissions = async () => {

            try {

                const response =
                    await getChallengeSubmissions(
                        challengeId
                    );

                setSubmissions(
                    response.submissions
                );

            } catch (err) {

                setError(

                    err.response?.data?.message ||

                    "Failed to load submissions."

                );

            } finally {

                setLoading(false);

            }

        };

        fetchSubmissions();

    }, [challengeId]);

    return {
        submissions,
        setSubmissions,
        loading,
        error,
    };

};

export default useChallengeSubmissions;