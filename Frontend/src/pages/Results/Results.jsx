import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import EmptyState from "../../components/UI/EmptyState/EmptyState";

import ArtworkCard from "../../components/Artwork/ArtworkCard/ArtworkCard";

import useResults from "../../hooks/useResults";

import "./Results.css";
import ArtworkGrid from "../../components/Museum/ArtworkGrid/ArtworkGrid";

const ResultSection = ({
    title,
    artwork,
}) => {
    if (!artwork) return null;
    return (
        <section className="result-section">
            <h2>{title}</h2>
            <ArtworkCard artwork={artwork} />
        </section>
    );
};

const Results = () => {

    const { challengeId } = useParams();
    const navigate = useNavigate();
    const {
        results,
        loading,
        error,
    } = useResults(challengeId);

    if (loading) return <Loader />;

    if (error) return <ErrorMessage message={error} />;

    if (!results)
        return (
            <EmptyState
                title="No Results Found"
                description="This challenge has no results yet."
            />
        );

    return (

        <>
            <div className="results-page">
                <h1>🏆{results.challengeTitle}</h1>
                <ResultSection
                    title="🥇 Winner"
                    artwork={results.winner}
                />
                <ResultSection
                    title="🥈 Runner-Up"
                    artwork={results.runnerUp}
                />
                <ResultSection
                    title="🥉 Third Place"
                    artwork={results.thirdPlace}
                />
                <section>

                    <h2>⭐ Top Community Picks</h2>

                    <ArtworkGrid

                        artworks={results.topArtworks}

                    />

                </section>
                <div className="results-actions">

                    <button

                        className="primary-btn"

                        onClick={() => navigate("/hall-of-fame")}

                    >

                        🏆 Visit Hall Of Fame

                    </button>

                </div>
            </div>
        </>
    );
};

export default Results;