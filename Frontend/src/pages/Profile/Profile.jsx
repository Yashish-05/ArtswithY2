import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import useProfile from "../../hooks/useProfile";
import "./Profile.css";
const Profile = () => {
    const {
        profile,
        loading,
        error,
    } = useProfile();
    const navigate = useNavigate();
    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    return (

        <div className="profile-page">
            <button
                className="back-button"
                onClick={() => navigate("/dashboard")}
            >
                ← Dashboard
            </button>
            <div className="profile-header">

                <h1>👤 My Profile</h1>

                <p>

                    Showcase your artistic journey, achievements and artworks.

                </p>

            </div>


            <div className="profile-card">

                <div className="profile-avatar">

                    {profile.fullName?.charAt(0).toUpperCase()}

                </div>

                <h2>

                    {profile.fullName}

                </h2>

                <span className="profile-role">

                    {profile.role}

                </span>

                <p>

                    @{profile.username}

                </p>

                <p>

                    {profile.email}

                </p>

            </div>


            <div className="profile-stats">

                <div className="profile-stat">

                    <h2>{profile.stats?.artworks ?? 0}</h2>

                    <span>Artworks</span>

                </div>

                <div className="profile-stat">

                    <h2>{profile.stats?.votes ?? 0}</h2>

                    <span>Total Votes</span>

                </div>

                <div className="profile-stat">

                    <h2>{profile.stats?.joinedChallenges ?? 0}</h2>

                    <span>Challenges</span>

                </div>

                <div className="profile-stat">

                    <h2>{profile.stats?.wins ?? 0}</h2>

                    <span>Wins</span>

                </div>

            </div>


            <div className="profile-about">

                <h2>

                    About Artist

                </h2>

                <p>

                    Welcome to my creative space. I love expressing ideas through sketching and participating in art challenges. Every artwork is an opportunity to learn, improve, and inspire others.

                </p>

            </div>

        </div>

    );
};
export default Profile;