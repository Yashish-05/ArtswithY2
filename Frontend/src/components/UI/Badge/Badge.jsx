import "./Badge.css";

const Badge = ({
    type = "default",
    children,
}) => {

    const badgeType = type.toLowerCase();

    return (

        <span
            className={`badge badge-${badgeType}`}
        >

            {children || type}

        </span>

    );

};

export default Badge;