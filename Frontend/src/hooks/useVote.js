import { useState } from "react";
import { voteArtwork } from "../services/voteService";

const useVote = () => {

    const [loading, setLoading] = useState(false);

    const [votedArtworks, setVotedArtworks] =
        useState([]);

    const vote = async (artworkId) => {

        setLoading(true);

        try {

            const response =
                await voteArtwork(artworkId);

            setVotedArtworks((prev) => [
                ...prev,
                artworkId,
            ]);

            return response;

        } finally {

            setLoading(false);

        }

    };

    return {

        vote,

        loading,

        votedArtworks,

    };

};

export default useVote;