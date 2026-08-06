import api from "./api";

export const getLeaderboard = async (challengeId) => {
    const response = await api.get(
        `/submissions/leaderboard/${challengeId}`
    );

    return response.data;
};