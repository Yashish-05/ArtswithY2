import HallOfFameCard from "../HallOfFameCard/HallOfFameCard";
import "./HallOfFameGrid.css";

const HallOfFameGrid = ({ artworks }) => {

    return (

        <div className="hall-grid">

            {
                artworks.map((artwork) => (

                    <HallOfFameCard
                        key={artwork._id}
                        artwork={artwork}
                    />

                ))
            }

        </div>

    );

};

export default HallOfFameGrid;