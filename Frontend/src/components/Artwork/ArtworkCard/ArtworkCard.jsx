import { getImageUrl } from "../../../utils/image";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";

import "./ArtworkCard.css";

const ArtworkCard = ({ artwork }) => {
    const navigate = useNavigate();
    const imageSrc = getImageUrl(artwork.image);
    return (
        <Card className="artwork-card">
            <img
                src={imageSrc}
                alt={artwork.title}
            />
            <div className="artwork-content">
                <h3>{artwork.title}</h3>

                <div className="artwork-meta">

                    <span className="vote-badge">
                        ❤️ {artwork.voteCount} Votes
                    </span>

                    {artwork.isWinner && (
                        <span className="winner-badge">
                            🏆 Winner
                        </span>
                    )}

                    {artwork.museumStatus && (
                        <span className="museum-badge">
                            🏛 Museum
                        </span>
                    )}

                </div>

                <Button
                    onClick={() =>
                        navigate(`/artworks/${artwork._id}`)
                    }
                >
                    View Details
                </Button>
            </div>
        </Card>
    );
};

export default ArtworkCard;