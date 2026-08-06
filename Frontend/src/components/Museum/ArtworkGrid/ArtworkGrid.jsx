import ArtworkCard from "../../Artwork/ArtworkCard/ArtworkCard";
import "./ArtworkGrid.css";
const ArtworkGrid = ({ artworks = [] }) => {
    return (
        <div className="artwork-grid">
            {
                artworks?.map((artwork) => (
                    <ArtworkCard
                        key={artwork._id}
                        artwork={artwork}
                    />
                ))
            }
        </div>
    );
};

export default ArtworkGrid;