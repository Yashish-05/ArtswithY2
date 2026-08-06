import "./SectionTitle.css";

const SectionTitle = ({ subtitle, title }) => {
  return (
    <div className="section-title">

      <span>{subtitle}</span>

      <h2>{title}</h2>

    </div>
  );
};

export default SectionTitle;