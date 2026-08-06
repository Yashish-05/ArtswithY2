import Section from "../UI/Section/Section";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import Card from "../UI/Card/Card";
import { features } from "../../constants/features";

import "./Features.css";

const Features = () => {
  return (
    <Section>
      <SectionTitle
        subtitle="Why Artists Love Artswith_y2"
        title="Creativity Deserves Recognition"
      />
      <div className="features-grid">
        {
          features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                className="feature-card"
                key={index}
              >
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>
                  {feature.title}
                </h3>
                <p>
                  {feature.description}
                </p>
              </Card>)
          })
        }
      </div>
    </Section>
  )
}
export default Features;