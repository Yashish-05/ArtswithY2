import api from "./api";

export const getMyArtworks = async () => {
    const response = await api.get("/artworks/my");
    return response.data;
}
export const getArtworkById = async (id) => {
    const response = await api.get(`/artworks/${id}`);
    return response.data;
}
export const submitArtwork = async (artworkData) => {
    const response = await api.post(
        "/artworks",
        artworkData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};
export const deleteArtwork = async (id) => {

    const response = await api.delete(

        `/artworks/${id}`

    );

    return response.data;

};