import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/image";
import ArtworkGrid from "../../components/Museum/ArtworkGrid/ArtworkGrid";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import EmptyState from "../../components/UI/EmptyState/EmptyState";

import useHallOfFame from "../../hooks/useHallOfFame";

import "./HallOfFame.css";

const HallOfFame = () => {
    const navigate = useNavigate();
    const { artworks, loading, error, } = useHallOfFame();
    if (loading) {
        return <Loader text="Loading Hall of Fame..." />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    if (!artworks.length) {
        return (
            <EmptyState
                icon="🏛️"
                title="Hall of Fame is Empty"
                description="No artwork has entered the museum yet."
            />
        );
    }
    return (
        <>
            <div className="hall-of-fame">
                <PageHeader
    title="🏆 Hall of Fame"
    subtitle="Celebrating the finest artworks selected by the Artswith_y2 community."
/>
                <div className="featured-artwork">

                    <div className="featured-image">

                        <img
                            src={getImageUrl(artworks[0].image)}
                            alt={artworks[0].title}
                        />

                    </div>

                    <div className="featured-content">

                        <span className="featured-tag">
                            ⭐ Featured Artwork
                        </span>

                        <h2>
                            {artworks[0].title}
                        </h2>

                        <p>

                            {artworks[0].description ||
                                "A masterpiece selected for the Hall of Fame."}

                        </p>

                        <div className="featured-meta">

                            <span>
                                ❤️ {artworks[0].voteCount} Votes
                            </span>

                            <span>
                                👤 {artworks[0].artist?.fullName || artworks[0].artist?.username}
                            </span>

                        </div>

                    </div>

                </div>
                <div className="hall-stats">

    <div className="hall-stat">

        <h2>{artworks.length}</h2>

        <span>Hall of Fame Entries</span>

    </div>

    <div className="hall-stat">

        <h2>
            {
                new Set(
                    artworks.map(a => a.artist?._id)
                ).size
            }
        </h2>

        <span>Featured Artists</span>

    </div>

    <div className="hall-stat">

        <h2>

            {
                artworks.reduce(
                    (sum, artwork) =>
                        sum + artwork.voteCount,
                    0
                )
            }

        </h2>

        <span>Total Community Votes</span>

    </div>

</div>
                <ArtworkGrid
                    artworks={artworks.slice(1)}
                />
                
            </div>
        </>
    );
};


export default HallOfFame;