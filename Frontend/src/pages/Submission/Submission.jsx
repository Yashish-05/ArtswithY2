// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// import Button from "../../components/UI/Button/Button";

// import useMyArtworks from "../../hooks/useMyArtworks";
// import useSubmission from "../../hooks/useSubmission";

// import "./Submission.css";

// const Submission = () => {

//     const navigate = useNavigate();

//     const { challengeId } = useParams();

//     const {
//         artworks,
//         loading,
//         error,
//     } = useMyArtworks();
//     const { submitArtwork, loading: submitting, } = useSubmission();
//     const [selectedArtwork, setSelectedArtwork] = useState(null);
//     const handleSubmit = async () => {
//         if (!selectedArtwork) {
//             toast.warning("Please select an artwork.");
//             return;
//         }
//         try {
//             const response = await submitArtwork(
//                 challengeId,
//                 selectedArtwork
//             );
//             toast.success(
//                 response.message || "Artwork submitted successfully!"
//             );
//             navigate("/arena");
//         } catch (err) {
//             toast.error(
//                 err.response?.data?.message ||
//                 "Submission failed."
//             );
//         }
//     };
//     if (loading)
//         return <p>Loading artworks...</p>;
//     if (error)
//         return <p>{error}</p>;
//     if (!loading && artworks.length === 0) {

//         return (

//             <div className="submission-page">

//                 <h1>No Artworks Found</h1>

//                 <p>
//                     Upload an artwork before joining a challenge.
//                 </p>

//                 <Button
//                     onClick={() =>
//                         navigate("/upload-artwork")
//                     }
//                 >
//                     Upload Artwork
//                 </Button>

//             </div>

//         );

//     }
//     return (

//         <div className="submission-page">

//             <h1>Submit Artwork</h1>

//             <p>
//                 Choose one artwork to enter this challenge.
//             </p>

//             <div className="artwork-grid">

//                 {artworks.map((artwork) => (

//                     <div
//                         key={artwork._id}
//                         className={`submission-card ${selectedArtwork === artwork._id
//                             ? "selected"
//                             : ""
//                             }`}
//                         onClick={() =>
//                             setSelectedArtwork(
//                                 artwork._id
//                             )
//                         }
//                     >

//                         <img
//                             src={artwork.image}
//                             alt={artwork.title}
//                         />

//                         <h3>{artwork.title}</h3>

//                         <p>
//                             {artwork.description?.slice(0, 80)}
//                         </p>
//                     </div>

//                 ))}

//             </div>

//             <Button
//                 onClick={handleSubmit}
//                 disabled={
//                     submitting ||
//                     artworks.length === 0
//                 }
//             >

//                 {submitting
//                     ? "Submitting..."
//                     : "Submit Artwork"}

//             </Button>

//         </div>

//     );

// };

// export default Submission;
import { useNavigate, useParams } from "react-router-dom";

import ArtworkSubmissionForm from "../../components/Artwork/ArtworkSubmissionForm/ArtworkSubmissionForm";

import "./Submission.css";

const Submission = () => {

    const navigate = useNavigate();

    const { challengeId } = useParams();

    return (

        <div className="submission-page">

            <div className="submission-header">

                <h1>Submit Your Artwork</h1>

                <p>
                    Create and submit your artwork for this challenge.
                </p>

            </div>

            <ArtworkSubmissionForm
                challengeId={challengeId}
                onSuccess={() => {
                    navigate(`/gallery/${challengeId}`);
                }}
            />

        </div>

    );

};

export default Submission;