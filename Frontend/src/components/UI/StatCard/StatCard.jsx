import "./StatCard.css";

const StatCard = ({
    value,
    label,
}) => {

    return (

        <div className="stat-card">

            <h2>{value}</h2>

            <span>{label}</span>

        </div>

    );

};

export default StatCard;