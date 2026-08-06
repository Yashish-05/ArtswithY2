import { useState } from "react";
import { message } from "antd";
import { createChallenge } from "../../services/challengeService";
import "./CreateChallenge.css";

const CreateChallenge = ({ onCreated }) => {

    const [form, setForm] = useState({

        title: "",
        theme: "",
        description: "",
        difficulty: "Beginner",
        reward: "",
        maxParticipants: 1000,
        rules: "",
        startDate: "",
        endDate: "",

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {

                ...form,

                rules: form.rules
                    .split("\n")
                    .filter(rule => rule.trim() !== ""),

            };

            await createChallenge(payload);
            await onCreated();

            message.success("Challenge created successfully");

            setForm({

                title: "",
                theme: "",
                description: "",
                difficulty: "Beginner",
                reward: "",
                maxParticipants: 1000,
                rules: "",
                startDate: "",
                endDate: "",

            });

        }

        catch (error) {

            message.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

        finally {

            setLoading(false);

        }

    };
return (

<div className="create-page">

    <div className="create-header">

        <h1>Create New Challenge</h1>

        <p>
            Launch an exciting competition and discover amazing artworks from creators around the world.
        </p>

    </div>

    <form
        className="create-form"
        onSubmit={handleSubmit}
    >

        {/* ---------------- BASIC INFO ---------------- */}

        <section className="form-card">

            <div className="card-title">

                <span>🎨</span>

                <h2>Basic Information</h2>

            </div>

            <div className="two-column">

                <div className="field">

                    <label>Challenge Title</label>

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Dreamscape Wonders"
                        required
                    />

                </div>

                <div className="field">

                    <label>Theme</label>

                    <input
                        type="text"
                        name="theme"
                        value={form.theme}
                        onChange={handleChange}
                        placeholder="Fantasy Art"
                        required
                    />

                </div>

            </div>

        </section>

        {/* ---------------- DESCRIPTION ---------------- */}

        <section className="form-card">

            <div className="card-title">

                <span>📝</span>

                <h2>Description</h2>

            </div>

            <textarea

                name="description"

                value={form.description}

                onChange={handleChange}

                placeholder="Describe the challenge..."

                required

            />

        </section>

        {/* ---------------- SETTINGS ---------------- */}

        <section className="form-card">

            <div className="card-title">

                <span>⚙</span>

                <h2>Challenge Settings</h2>

            </div>

            <div className="three-column">

                <div className="field">

                    <label>Difficulty</label>

                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                    >

                        <option>Beginner</option>

                        <option>Intermediate</option>

                        <option>Advanced</option>

                    </select>

                </div>

                <div className="field">

                    <label>Reward</label>

                    <input
                        type="text"
                        name="reward"
                        value={form.reward}
                        onChange={handleChange}
                        placeholder="₹5000 + Certificate"
                    />

                </div>

                <div className="field">

                    <label>Max Participants</label>

                    <input
                        type="number"
                        name="maxParticipants"
                        value={form.maxParticipants}
                        onChange={handleChange}
                    />

                </div>

            </div>

        </section>

        {/* ---------------- RULES ---------------- */}

        <section className="form-card">

            <div className="card-title">

                <span>📜</span>

                <h2>Rules</h2>

            </div>

            <textarea

                name="rules"

                value={form.rules}

                onChange={handleChange}

                placeholder="Write one rule per line..."

            />

        </section>

        {/* ---------------- SCHEDULE ---------------- */}

        <section className="form-card">

            <div className="card-title">

                <span>📅</span>

                <h2>Schedule</h2>

            </div>

            <div className="two-column">

                <div className="field">

                    <label>Start Date</label>

                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="field">

                    <label>End Date</label>

                    <input
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

        </section>

        <button

            className="publish-btn"

            type="submit"

            disabled={loading}

        >

            {loading ? "Publishing..." : "🚀 Publish Challenge"}

        </button>

    </form>

</div>

);

};

export default CreateChallenge;