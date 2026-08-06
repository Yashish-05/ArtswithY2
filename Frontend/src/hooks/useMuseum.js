 import { useEffect, useState } from "react";

import { getMuseumArtworks } from "../services/museumService";

const useMuseum = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMuseum = async () => {
            try {
                const response = await getMuseumArtworks();
                setArtworks(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load museum."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchMuseum();
    }, []);

    return {
        artworks,
        loading,
        error,
    };
};

export default useMuseum;