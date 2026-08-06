const Challenge = require("../models/challenge.model");

const updateChallengeStatus = async () => {
    try {
        const today = new Date();

        // Normalize to the start of today
        today.setHours(0, 0, 0, 0);

        const challenges = await Challenge.find();

        for (const challenge of challenges) {

            const startDate = new Date(challenge.startDate);
            const endDate = new Date(challenge.endDate);

            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            let newStatus = "upcoming";

            if (today >= startDate && today <= endDate) {
                newStatus = "active";
            }

            if (today > endDate) {
                newStatus = "completed";
            }

            if (challenge.status !== newStatus) {

                challenge.status = newStatus;

                await challenge.save();

            }
        }

    } catch (error) {

        console.error(
            "Challenge Status Update Error:",
            error.message
        );

    }
};

module.exports = updateChallengeStatus;