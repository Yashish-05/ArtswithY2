import api from "./api";

export const getActiveChallenge = async () => {
    const response = await api.get("/challenges/active");
    return response.data;
};
export const getAllChallenges = async () => {
    const response = await api.get("/challenges");
    return response.data;
};
export const getChallengeBySlug = async (slug) => {
    const response = await api.get(`/challenges/${slug}`);
    return response.data;
}
export const joinChallenge = async (id) => {
    const response = await api.post(`/challenges/${id}/join`);
    return response.data;
}
// =============================
// Admin APIs
// =============================

// Create a new challenge
export const createChallenge = async (challengeData) => {
    const response = await api.post("/challenges", challengeData);
    return response.data;
};

// Get completed challenges
export const getCompletedChallenges = async () => {
    const response = await api.get("/challenges?status=completed");
    return response.data;
};

// Select winners
export const selectWinners = async (challengeId) => {
    const response = await api.post(
        `/challenges/${challengeId}/select-winners`
    );
    return response.data;
};
export const getDashboardStats = async () => {

    const response = await api.get(
        "/challenges/dashboard-stats"
    );

    return response.data;

};