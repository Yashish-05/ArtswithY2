import api from "./api";

export const getResults = async (challengeId) => {

    const response = await api.get(
        `/results/${challengeId}`
    );
    return response.data;
};