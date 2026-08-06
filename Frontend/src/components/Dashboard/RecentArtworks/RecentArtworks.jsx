import EmptyState from "../../UI/EmptyState/EmptyState";
import { getImageUrl } from "../../../utils/image";
import "./RecentArtworks.css";

const RecentArtworks = ({ artworks = [] }) => {

    return (

        <section className="recent-artworks">

            <h2>Recent Artworks</h2>

            {

                artworks.length === 0 ? (

                    <EmptyState
                        icon="🎨"
                        title="No Artworks Yet"
                        description="Upload your first artwork to get started."
                    />

                ) : (

                    <div className="recent-grid">

                        {

                            artworks.map((artwork) => (

                                <div
                                    key={artwork._id}
                                    className="recent-card"
                                >

                                    <img
                                        src={getImageUrl(artwork.image)}
                                        alt={artwork.title}
                                    />

                                    <h3>{artwork.title}</h3>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

};

export default RecentArtworks;