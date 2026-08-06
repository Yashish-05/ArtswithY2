import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const useProfile = () => {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getProfile();

                setProfile(response.user);

            } catch (err) {

                setError(

                    err.response?.data?.message ||

                    "Failed to load profile."

                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    return {

        profile,

        loading,

        error,

    };

};

export default useProfile;