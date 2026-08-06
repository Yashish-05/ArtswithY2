export const getDaysRemaining = (endDate) => {

    if (!endDate) return 0;

    const today = new Date();

    const end = new Date(endDate);

    return Math.max(
        0,
        Math.ceil(
            (end - today) /
            (1000 * 60 * 60 * 24)
        )
    );

};

export const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

};  