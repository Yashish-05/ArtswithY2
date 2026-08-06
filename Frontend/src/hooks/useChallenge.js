import { useEffect, useState } from "react";
import { getAllChallenges } from "../services/challengeService";

const useChallenges = () => {

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchChallenges = async () => {

        try {

            setLoading(true);

            const data = await getAllChallenges();

            setChallenges(

    data.challenges.filter(
        challenge => challenge.status === "active"
    )

);

            setError("");

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Failed to load challenges."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchChallenges();

    }, []);

    return {

        challenges,
        loading,
        error,
        fetchChallenges,

    };

};

export default useChallenges;