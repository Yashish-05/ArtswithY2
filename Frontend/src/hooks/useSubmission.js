import { useState } from "react";
import { createSubmission } from "../services/submissionService";

const useSubmission = () => {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState(false);

    const submitArtwork = async (challengeId, artworkId) => {

        try {

            setLoading(true);

            setError("");

            setSuccess(false);

            const response = await createSubmission({

                challengeId,

                artworkId,

            });

            if (response.success) {

                setSuccess(true);

            }

            return response;

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Failed to submit artwork.";

            setError(message);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,

        error,

        success,

        submitArtwork,

    };

};

export default useSubmission;