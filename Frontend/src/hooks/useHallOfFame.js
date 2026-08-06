import { useEffect, useState } from "react";
import { getMuseumArtworks } from "../services/museumService";

const useHallOfFame = () => {

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHallOfFame = async () => {
            try {
                const response = await getMuseumArtworks();
                setArtworks(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load Hall of Fame."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchHallOfFame();
    }, []);

    return {
        artworks,
        loading,
        error,
    };
};

export default useHallOfFame;