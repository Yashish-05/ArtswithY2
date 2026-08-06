import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import useChallengeOptions from "../../hooks/useChallengeOptions";
import { submitArtwork } from "../../services/artworkService";

import "./UploadArtwork.css";

const SubmitArtwork = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        challenge: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");
    const { challenges, } = useChallengeOptions();
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

        try {

            const data = new FormData();

            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("challenge", formData.challenge);
            data.append("image", selectedImage);

            const response = await submitArtwork(data);

            toast.success(response.message);

            navigate("/my-artworks");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Submission failed."

            );

        }

    };
    return (
        <div className="submit-artwork-page">
            <form
                className="submit-artwork-form"
                onSubmit={handleSubmit}
            >
                <h2>
                    Submit Artwork
                </h2>
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

                    <label className="upload-label">

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
                <Select
                    label="Challenge"
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                >

                    <option value="">

                        Select Challenge

                    </option>

                    {

                        challenges.map((challenge) => (

                            <option
                                key={challenge._id}
                                value={challenge._id}
                            >

                                {challenge.title}

                            </option>

                        ))

                    }

                </Select>
                <Button type="submit">
                    Submit Artwork
                </Button>
            </form>
        </div>
    );
};

export default SubmitArtwork;