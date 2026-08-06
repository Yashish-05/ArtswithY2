import { useState } from "react";
import { toast } from "react-toastify";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import { submitArtwork } from "../../../services/artworkService";
import { createSubmission } from "../../../services/submissionService";
import "./ArtworkSubmissionForm.css";

const ArtworkSubmissionForm = ({
    challengeId,
    onSuccess,
}) => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            toast.warning("Please choose an image.");
            return;
        }
        try {
            setLoading(true);
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("challenge", challengeId);
            data.append("image", selectedImage);
            const response = await submitArtwork(data);

            console.log("Artwork Response:", response);

            await createSubmission({
                challengeId,
                artworkId: response.artwork._id,
            });

            console.log("Submission Created");
            
            toast.success(response.message);
            if (onSuccess) {
                onSuccess(response);
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Submission failed."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <form
            className="artwork-submission-form"
            onSubmit={handleSubmit}
        >
            <Input
                name="title"
                placeholder="Artwork Title"
                value={formData.title}
                onChange={handleChange}
            />
            <Input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <div className="image-upload-section">
                <label>
                    Upload Artwork
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {
                    preview && (
                        <div className="image-preview">
                            <img
                                src={preview}
                                alt="Preview"
                            />
                        </div>
                    )
                }
            </div>
            <Button
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? "Submitting..."
                        : "Submit Artwork"
                }
            </Button>
        </form>
    );
};
export default ArtworkSubmissionForm;