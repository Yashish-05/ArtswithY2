import "./MyArtworks.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import EmptyState from "../../components/UI/EmptyState/EmptyState";
import ArtworkGrid from "../../components/Museum/ArtworkGrid/ArtworkGrid";
import useMyArtworks from "../../hooks/useMyArtworks";
const MyArtworks = () => {
    const {
        artworks,
        loading,
        error,
    } = useMyArtworks();
    const navigate = useNavigate();
    const stats = useMemo(() => {

        const totalVotes = artworks.reduce(
            (sum, artwork) => sum + artwork.voteCount,
            0
        );

        const winners = artworks.filter(
            artwork => artwork.isWinner
        ).length;

        return {
            totalArtworks: artworks.length,
            totalVotes,
            winners,
        };

    }, [artworks]);
    if (loading) {
        return <Loader text="Loading Your Artworks..." />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    if (artworks.length === 0) {
        return (
            <EmptyState
                icon="🖼️"
                title="No Artworks Uploaded"
                description="Upload your first artwork to start participating."
            />
        );
    }
    return (

        <div className="my-artworks-page">

            <button
                className="back-button"
                onClick={() => navigate("/dashboard")}
            >
                ← Dashboard
            </button>

            <PageHeader
                title="My Artworks"
                subtitle="Manage, edit and showcase your uploaded artworks."
            />

            <div className="my-artwork-stats">

                <div className="art-stat-card">
                    <h2>{stats.totalArtworks}</h2>
                    <span>Artworks</span>
                </div>

                <div className="art-stat-card">
                    <h2>{stats.totalVotes}</h2>
                    <span>Total Votes</span>
                </div>

                <div className="art-stat-card">
                    <h2>{stats.winners}</h2>
                    <span>Winner Artworks</span>
                </div>

            </div>

            <ArtworkGrid
                artworks={artworks}
            />

        </div>

    );
};
export default MyArtworks;