import { useEffect, useState } from "react";
import { getMyArtworks } from "../services/artworkService";

const useMyArtworks = () => {

    const [artworks, setArtworks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchArtworks = async () => {

            try {

                const response = await getMyArtworks();

                setArtworks(response.data);

            } catch (err) {

                setError(

                    err.response?.data?.message ||

                    "Failed to load artworks."

                );

            } finally {

                setLoading(false);

            }

        };

        fetchArtworks();

    }, []);

    return {

        artworks,

        loading,

        error,

    };

};

export default useMyArtworks;