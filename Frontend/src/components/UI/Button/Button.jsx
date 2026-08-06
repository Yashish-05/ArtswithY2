
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      type={type}
      onClick={onClick}
disabled={disabled || loading}
    >

    {loading && <span className="btn-spinner"></span>}
    {children}

    </button>
  );
};

export default Button;