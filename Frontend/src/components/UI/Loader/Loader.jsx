// import "./Loader.css";

// const Loader = ({
//     text = "Loading...",
//     size = "md",
// }) => {

//     return (

//         <div className="loader-container">

//             <div
//                 className={`loader loader-${size}`}
//             />

//             <p>{text}</p>

//         </div>

//     );

// };

// export default Loader;
import { Spin } from "antd";
import "./Loader.css";

const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="loader-container">
            <Spin size="large" />
            <p>{text}</p>
        </div>
    );
};

export default Loader;