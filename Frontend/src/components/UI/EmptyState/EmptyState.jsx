// import "./EmptyState.css";

// const EmptyState = ({
//     title = "Nothing Here Yet",
//     description = "Content will appear here once it becomes available.",
//     icon = "🎨",
//     action = null,
// }) => {

//     return (

//         <div className="empty-state">

//             <div className="empty-icon">

//                 {icon}

//             </div>

//             <h2>

//                 {title}

//             </h2>

//             <p>

//                 {description}

//             </p>

//             {

//                 action && action

//             }

//         </div>

//     );

// };

// export default EmptyState;
import "./EmptyState.css";

const EmptyState = ({
    icon,
    title,
    description,
}) => {

    return (

        <div className="empty-state">

            <div className="empty-icon">

                {icon}

            </div>

            <h2>{title}</h2>

            <p>{description}</p>

        </div>

    );

};

export default EmptyState;