import api from "./api";

export const getMuseumArtworks = async () => {
    const response = await api.get(
    "/challenges/hall-of-fame"
);
    return response.data;
};