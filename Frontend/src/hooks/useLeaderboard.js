import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

const useLeaderboard = (challengeId) => {

    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchLeaderboard = async () => {

            try {

                const data = await getLeaderboard(challengeId);

                setLeaderboard(data.leaderboard);

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Failed to load leaderboard."
                );

            } finally {

                setLoading(false);

            }

        };

        if (challengeId) {
            fetchLeaderboard();
        }

    }, [challengeId]);

    return {

        leaderboard,
        loading,
        error,

    };

};

export default useLeaderboard;