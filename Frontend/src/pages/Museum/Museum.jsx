
import MuseumHero from "../../components/Museum/MuseumHero/MuseumHero";
import MuseumFilters from "../../components/Museum/MuseumFilters/MuseumFilters";
import HallOfFameGrid from "../../components/Museum/HallOfFameGrid/HallOfFameGrid";
import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";

import useMuseum from "../../hooks/useMuseum";
import EmptyState from "../../components/UI/EmptyState/EmptyState";

import "./Museum.css";

const Museum = () => {
    const {
        artworks,
        loading,
        error,
    } = useMuseum();
    if (loading) {
        return <Loader text="Loading Your Artworks..." />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    if (!artworks.length) {
        return (
            <EmptyState
    icon="🏛️"
    title="Museum is Empty"
    description="Winning artworks will appear here."
/>
        );
    }
    return (
        <>
            <MuseumHero />
            <MuseumFilters />
            <HallOfFameGrid
                artworks={artworks}
            />
        </>
    );
};

export default Museum;