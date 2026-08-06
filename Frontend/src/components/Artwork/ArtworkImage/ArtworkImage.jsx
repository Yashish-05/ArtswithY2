import { getImageUrl }
from "../../../utils/image";
import "./ArtworkImage.css";

const ArtworkImage = ({ image, title }) => {
 const imageSrc =
getImageUrl(image);
  return (
    <div className="artwork-image-container">
       <div className="artwork-image-wrapper">

        <img
            src={imageSrc}
            alt={title}
            className="artwork-image"
        />

    </div>
    </div>
  );
};

export default ArtworkImage;