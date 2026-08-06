import api from "./api";

/**
 * Submit an existing artwork to a challenge
 */
export const createSubmission = async (submissionData) => {

    const response = await api.post(
        "/submissions",
        submissionData
    );

    return response.data;
};
/**
 * Get all submissions for a challenge
 */
export const getChallengeSubmissions = async (challengeId) => {

    const response = await api.get(
        `/submissions/challenge/${challengeId}`
    );

    return response.data;

};