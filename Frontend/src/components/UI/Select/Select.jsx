// import "./Select.css";

// const Select = ({
//     name,
//     value,
//     onChange,
//     children,
// }) => {
//     return (
//         <select
//             className="select"
//             name={name}
//             value={value}
//             onChange={onChange}
//         >
//             {children}
//         </select>
//     );
// };

// export default Select;
import "./Select.css";

const Select = ({
    label,
    name,
    value,
    onChange,
    children,
    disabled = false,
    error = "",
}) => {

    return (

        <div className="select-group">

            {

                label && (

                    <label className="select-label">

                        {label}

                    </label>

                )

            }

            <select
                className={`select ${error ? "select-error" : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >

                {children}

            </select>

            {

                error && (

                    <span className="select-error-text">

                        {error}

                    </span>

                )

            }

        </div>

    );

};

export default Select;