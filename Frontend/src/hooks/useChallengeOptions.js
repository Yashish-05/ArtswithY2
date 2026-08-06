import { useEffect, useState } from "react";
import { getAllChallenges } from "../services/challengeService";

const useChallengeOptions = () => {

    const [challenges, setChallenges] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchChallenges = async () => {

            try {

                const response = await getAllChallenges();

                setChallenges(response.challenges);

            } catch (err) {

                setError(

                    err.response?.data?.message ||

                    "Failed to load challenges."

                );

            } finally {

                setLoading(false);

            }

        };

        fetchChallenges();

    }, []);

    return {

        challenges,

        loading,

        error,

    };

};

export default useChallengeOptions;