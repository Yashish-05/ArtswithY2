import "./Section.css";

const Section = ({ children, className = "" }) => {
  return (
    <section className={`section ${className}`}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
};

export default Section;