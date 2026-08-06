import { useEffect, useState } from "react";

import { getResults } from "../services/resultService";

const useResults = (challengeId) => {

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getResults(challengeId);
                setResults(data.data);
            } catch (error) {
                setError(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [challengeId]);

    return {
        results,
        loading,
        error,
    };
};

export default useResults;