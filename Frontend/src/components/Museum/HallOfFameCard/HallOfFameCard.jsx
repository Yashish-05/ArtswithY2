import Card from "../../UI/Card/Card";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/image";
import "./HallOfFameCard.css";

const HallOfFameCard = ({ artwork }) => {
const navigate = useNavigate();
    return (

        <Card
    className="hall-card"
    onClick={() => navigate(`/artworks/${artwork._id}`)}
>
            <div className="hall-badge">
    🏛 Museum Collection
</div>

            <img
                src={getImageUrl(artwork.image)}
                alt={artwork.title}
                className="hall-image"
            />

            <div className="hall-content">

                <h2>{artwork.title}</h2>

                <p className="hall-challenge">
                    🎨 {artwork.challenge?.title}
                </p>

                <p>
                    👤 {artwork.artist?.fullName ||
                        artwork.artist?.username}
                </p>

                <p className="hall-votes">
                    ❤️ {artwork.voteCount} Votes
                </p>
<p className="hall-view">
    Click to view artwork →
</p>
            </div>

        </Card>

    );

};

export default HallOfFameCard;