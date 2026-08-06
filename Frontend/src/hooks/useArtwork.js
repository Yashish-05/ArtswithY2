import { useEffect, useState } from "react";
import { getArtworkById } from "../services/artworkService";

const useArtwork = (id) => {
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        if (!id) return;
        const fetchArtwork = async () => {
            try {
                const response = await getArtworkById(id);
                setArtwork(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load artwork."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchArtwork();
    }, [id]);
    return {
        artwork,
        loading,
        error,
    };
};
export default useArtwork;