import "./Input.css";

const Input = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    error = "",
    prefix,
    suffix,
    onSuffixClick,
}) => {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label">
                    {label}
                </label>
            )}
           <div className="input-wrapper">

    {

        prefix && (

            <span className="input-prefix">

                {prefix}

            </span>

        )

    }

    <input
        className={`input ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
    />

    {

        suffix && (

            <span
                className="input-suffix"
                onClick={onSuffixClick}
            >

                {suffix}

            </span>

        )

    }

</div>
            {
                error && (
                    <span className="input-error-text">
                        {error}
                    </span>
                )
            }
        </div>
    );
};
export default Input;