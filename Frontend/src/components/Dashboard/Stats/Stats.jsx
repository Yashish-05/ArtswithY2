import { dashboardStats }from "../../../constants/dashboardStats";

import "./Stats.css";

const Stats = ({ data }) => {
    return (
        <div className="stats-grid">
            {
                dashboardStats.map((item,index)=>{
                    const Icon=item.icon;
                    return(
                        <div
                        className="stat-card"
                        key={index}
                        >
                            <div className="stat-icon">
                                <Icon/>
                            </div>
                            <h2>
                                {data?.[item.key] || 0}
                            </h2>
                            <p>
                                {item.title}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Stats;