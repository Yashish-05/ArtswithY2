import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/challengeService";

const useDashboardStats = () => {

    const [stats, setStats] = useState({

        activeChallenges: 0,

        completedChallenges: 0,

        hallOfFame: 0,

        artists: 0,

    });

    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchStats();

    }, []);

    return {

        stats,

        loading,

        fetchStats,

    };

};

export default useDashboardStats;