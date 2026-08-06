import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import ArtworkImage from "../../components/Artwork/ArtworkImage/ArtworkImage";
import ArtworkMeta from "../../components/Artwork/ArtworkMeta/ArtworkMeta";
import ArtworkTimeline from "../../components/Artwork/ArtworkTimeline/ArtworkTimeline";
import ArtworkActions from "../../components/Artwork/ArtworkActions/ArtworkActions";

import useArtwork from "../../hooks/useArtwork";
import useVote from "../../hooks/useVote";

import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../../components/UI/ConfirmationModal/ConfirmationModal";

import { deleteArtwork } from "../../services/artworkService";

import { getUser } from "../../utils/auth";
import "./ArtworkDetails.css";

const ArtworkDetails = () => {
    const { id } = useParams();
const navigate = useNavigate();

const currentUser = getUser();

const [deleteOpen, setDeleteOpen] = useState(false);

const [deleteLoading, setDeleteLoading] = useState(false);
    const { artwork, loading, error, } = useArtwork(id);
    const { vote, loading: voteLoading } = useVote();
   
    const [voteCount, setVoteCount] = useState(0);
    useEffect(() => {


    if (artwork) {

        setVoteCount(artwork.voteCount);

    }

}, [artwork]);
    const [hasVoted,setHasVoted]=useState(false);
    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    if (!artwork) {

    return null;

}
    const handleVote = async () => {
    try{
        const response = await vote(artwork._id);
        toast.success(response.message);
        setVoteCount(prev=>prev+1);
        setHasVoted(true);
    }catch(error){
        toast.error(
            error.response?.data?.message ||
            "Voting failed."
        );
    }
};
const handleDelete = async () => {

    try {

        setDeleteLoading(true);

        const response = await deleteArtwork(

            artwork._id

        );

        toast.success(response.message);

        navigate("/my-artworks");

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Failed to delete artwork."

        );

    }

    finally {

        setDeleteLoading(false);

        setDeleteOpen(false);

    }

};
const isOwner =

    artwork.artist?._id === currentUser?.id;

    return (
        <div className="artwork-details-page">
<div className="artwork-page-header">

    <h1>🎨 Artwork Details</h1>

    <p>
        Explore this artwork, follow its challenge journey,
        and support your favorite artists with your vote.
    </p>

</div>
    <div className="artwork-hero">

        <ArtworkImage
            image={artwork.image}
            title={artwork.title}
        />

        <ArtworkMeta
            artwork={artwork}
        />

    </div>

    <ArtworkTimeline
        status={artwork.status}
    />

    <ArtworkActions
        voteCount={voteCount}
        loading={voteLoading}
        hasVoted={hasVoted}
        onVote={handleVote}
    />
    {

    isOwner && (

        <div className="artwork-owner-actions">

            <button

                className="delete-artwork-btn"

                onClick={() =>

                    setDeleteOpen(true)

                }

            >

                🗑 Delete Artwork

            </button>

        </div>

    )

}
<ConfirmationModal

    open={deleteOpen}

    title="Delete Artwork"

    description="Are you sure you want to permanently delete this artwork? This action cannot be undone."

    confirmText="Delete"

    loading={deleteLoading}

    onConfirm={handleDelete}

    onCancel={() => setDeleteOpen(false)}

/>

</div>
    );
};

export default ArtworkDetails;