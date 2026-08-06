import "./AdminQuickActions.css";

const actions = [

    {
        key: "create",
        title: "Create Challenge",
        icon: "➕",
        description: "Launch a new art competition.",
        color: "purple",
    },

    {
        key: "manage",
        title: "Manage Challenges",
        icon: "📋",
        description: "View and manage all challenges.",
        color: "blue",
    },

    {
        key: "winners",
        title: "Select Winners",
        icon: "🏆",
        description: "Choose winners for completed challenges.",
        color: "gold",
    },

    {
        key: "museum",
        title: "Hall of Fame",
        icon: "🏛️",
        description: "View museum-winning artworks.",
        color: "green",
    },

];
const AdminQuickActions = ({ onSelect }) => {


    return (

        <section className="admin-actions">

            <h2>

                ⚡ Quick Actions

            </h2>

            <div className="admin-actions-grid">

                {
                    actions.map((action) => (

                        <div
                            key={action.title}
                           className={`admin-action-card ${action.color}`}
                            onClick={() => onSelect(action.key)}
                        >

                            <div className={`admin-action-icon ${action.color}`}>

                                {action.icon}

                            </div>

                            <h3>

                                {action.title}

                            </h3>

                            <p>

                                {action.description}

                            </p>

                            <span className="action-link">

                                Click to Continue →

                            </span>

                        </div>

                    ))
                }

            </div>

        </section>

    );

};

export default AdminQuickActions;