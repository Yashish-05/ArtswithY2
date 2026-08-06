import { artworkTimeline } from "../../../constants/artworkTimeline";
import "./ArtworkTimeline.css";

const ArtworkTimeline = ({ status }) => {
    const currentIndex = artworkTimeline.findIndex(
        step => step.key === status
    );

    return (

        <div className="timeline-wrapper">

            <h2 className="timeline-title">
                Artwork Journey
            </h2>

            <div className="timeline">

                {
                    artworkTimeline.map((step, index) => (

                        <div
                            key={step.key}
                            className={`timeline-step ${index <= currentIndex
                                    ?
                                    "completed"
                                    :
                                    ""
                                }`}
                        >

                            <div className="timeline-circle" />

                            {
                                index <
                                artworkTimeline.length - 1
                                &&
                                <div
                                    className={`timeline-line ${index < currentIndex
                                            ?
                                            "completed"
                                            :
                                            ""
                                        }`}
                                />
                            }

                            <p>
                                {step.label}
                            </p>

                        </div>

                    ))
                }

            </div>

        </div>

    );
};

export default ArtworkTimeline;