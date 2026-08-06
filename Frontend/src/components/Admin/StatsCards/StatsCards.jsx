import "./StatsCards.css";

const StatsCards = ({ stats }) => {
    const cards = [

        {
            title: "Active Challenges",
            value: stats.activeChallenges,
            icon: "🎯",
            color: "purple",
            subtitle: "Currently Running",
        },

        {
            title: "Completed",
            value: stats.completedChallenges,
            icon: "🏆",
            color: "gold",
            subtitle: "Finished Challenges",
        },

        {
            title: "Museum Artworks",
            value: stats.hallOfFame,
            icon: "🏛️",
            color: "green",
            subtitle: "Hall of Fame",
        },

        {
            title: "Artists",
            value: stats.artists,
            icon: "👨‍🎨",
            color: "blue",
            subtitle: "Registered Artists",
        },

    ];

    return (
        <section className="stats-grid">
            {
                cards.map((stat) => (
                    <div
                        key={stat.title}
                        className={`stats-card ${stat.color}`}
                    >
                        <div className={`stats-icon ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <h3>
                            {stat.value}
                        </h3>
                        <p>
                            {stat.title}
                        </p>
                        <span className="stats-subtitle">

                            {stat.subtitle}

                        </span>
                    </div>
                ))
            }
        </section>
    );
};
export default StatsCards;