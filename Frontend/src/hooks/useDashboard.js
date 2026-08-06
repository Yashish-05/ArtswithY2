import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

const useDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getDashboard();
                setDashboard(response);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load dashboard."
                );
            }
            finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);
    return {
        dashboard,
        loading,
        error
    };
};

export default useDashboard;