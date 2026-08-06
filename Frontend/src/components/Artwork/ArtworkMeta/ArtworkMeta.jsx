import Badge from "../../UI/Badge/Badge";

import "./ArtworkMeta.css";

const ArtworkMeta = ({ artwork }) => {

  return (
    <div className="artwork-meta">

        <div className="meta-header">
            <h1>{artwork.title}</h1>

            <p className="artist-name">
                by {artwork.artist.fullName || artwork.artist.username}
            </p>
        </div>

        <div className="meta-grid">

            <div className="meta-card">
                <span>🎯 Challenge</span>
                <strong>{artwork.challenge.title}</strong>
            </div>

            <div className="meta-card">
                <span>❤️ Votes</span>
                <strong>{artwork.voteCount}</strong>
            </div>

            <div className="meta-card">
                <span>🏷 Status</span>
                <Badge type={artwork.status} />
            </div>

        </div>

        <div className="description-card">

            <h3>About this artwork</h3>

            <p>{artwork.description}</p>

        </div>

    </div>
);
};

export default ArtworkMeta;