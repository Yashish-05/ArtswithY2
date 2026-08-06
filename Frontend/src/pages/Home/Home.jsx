import ChallengePreview from "../../components/ChallengePreview/ChallengePreview";
import Features from "../../components/Features/Features";
import HallOfFamePreview from "../../components/HallOfFamePreview/HallOfFamePreview";
import Hero from "../../components/Hero/Hero";
import JourneyTimeline from "../../components/JourneyTimeline/JourneyTimeline";
import EmptyState from "../../components/UI/EmptyState/EmptyState";

import { useEffect, useState } from "react";
import { getActiveChallenge } from "../../services/challengeService";

const Home = () => {
    const [challenge, setChallenge] = useState(null);
    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await getActiveChallenge();

if (response.challenge) {

    setChallenge({
        ...response.challenge,
        hasJoined: response.hasJoined,
    });

} else {

    setChallenge(null);

};
            } catch (error) {
                console.error(error);
            }
        };
        fetchChallenge();
    }, []);
    return (
        <>
            <Hero />
            <Features />
            <JourneyTimeline />
            {
    challenge ? (

        <ChallengePreview
            challenge={challenge}
        />

    ) : (

        <EmptyState
            icon="🎯"
            title="No Active Challenge"
            description="A new challenge will be announced soon. Stay tuned!"
        />

    )
}
            <HallOfFamePreview />
        </>
    );
};
export default Home;