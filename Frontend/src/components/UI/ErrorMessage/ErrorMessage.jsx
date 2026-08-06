import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {

    return (

        <div className="error-container">

            <h2>⚠️ Oops!</h2>

            <p>{message}</p>

        </div>

    );

};

export default ErrorMessage;