import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import EmptyState from "../../UI/EmptyState/EmptyState";

import "./ActiveChallenge.css";

const ActiveChallenge = ({ challenge }) => {

    if (!challenge) {
        return (
            <EmptyState
                icon="🏆"
                title="No Active Challenge"
                description="A new challenge will be announced soon."
            />
        );
    }

    return (
        <section className="active-challenge">

            <div className="challenge-content">

                <h2>{challenge.title}</h2>

                <p>
                    Join the current community challenge and showcase your creativity.
                </p>

                <Link to={`/arena/${challenge.slug}`}>
                    <Button>
                        View Challenge
                    </Button>
                </Link>

            </div>

        </section>
    );
};

export default ActiveChallenge;