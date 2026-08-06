import api from "./api";

export const voteArtwork = async (artworkId) => {
    const response = await api.post(`/votes/${artworkId}`);
    return response.data;
};