import Section from "../UI/Section/Section";
import SectionTitle from "../UI/SectionTitle/SectionTitle";

import { FaPaintBrush, FaPencilAlt, FaUpload, FaUsers, FaTrophy, } from "react-icons/fa";

import { MdMuseum } from "react-icons/md";

import "./HowItWorks.css";

const steps = [
  {
    icon: <FaPaintBrush />,
    title: "Join Challenge",
    description: "Choose an active art challenge and participate."
  },
  {
    icon: <FaPencilAlt />,
    title: "Create Artwork",
    description: "Bring your creativity to life using your favorite medium."
  },
  {
    icon: <FaUpload />,
    title: "Submit Artwork",
    description: "Upload your artwork before the challenge deadline."
  },
  {
    icon: <FaUsers />,
    title: "Community Voting",
    description: "Receive votes and feedback from fellow artists."
  },
  {
    icon: <FaTrophy />,
    title: "Become Winner",
    description: "Top artworks earn recognition and exclusive rewards."
  },
  {
    icon: <MdMuseum />,
    title: "Hall of Fame",
    description: "Winning artworks become part of the Virtual Museum."
  }
];

const HowItWorks = () => {
  return (
    <Section className="journey">
      <SectionTitle
        subtitle="Your Artistic Journey"
        title="Every Masterpiece Begins With One Challenge"
      />
      <div className="journey-grid">
        {steps.map((step, index) => (
          <div className="journey-item" key={index}>
            <div className="journey-card">
              <div className="journey-icon">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {
              index !== steps.length - 1 && (
                <div className="journey-line"></div>
              )
            }
          </div>
        ))}
      </div>
    </Section>
  );
};
export default HowItWorks;