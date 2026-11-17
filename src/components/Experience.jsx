import { ArrowUpRight, Layers } from "lucide-react";
import { experience } from "../data/site";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";
import "./Experience.css";

export default function Experience() {
  const [current, ...previous] = experience.roles;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title="AI in production."
          intro="LLM, vision and speech features I've built and shipped to real users."
        />

        <Reveal className="role">
          <div className="role__head">
            <div>
              <h3 className="role__title">{current.title}</h3>
              <p className="role__org">{experience.company}</p>
            </div>
            <p className="role__period">{current.period}</p>
          </div>
          <p className="role__intro">{current.intro}</p>

          <ul className="role__grid">
            {current.ai.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05}>
                <SpotlightCard className="work-card">
                  <h4 className="work-card__title">{item.title}</h4>
                  <p className="work-card__detail">{item.detail}</p>
                  <ul className="work-card__tags" aria-label={`${item.title} techniques`}>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>

          <p className="role__platform">
            <Layers aria-hidden="true" />
            <span>{current.platform}</span>
          </p>
        </Reveal>

        <ul className="timeline">
          {previous.map((role) => (
            <Reveal as="li" key={role.title} className="timeline__item">
              <div>
                <p className="timeline__title">
                  {role.title} <span>· {experience.company}</span>
                </p>
                <p className="timeline__intro">{role.intro}</p>
              </div>
              <p className="timeline__period">{role.period}</p>
            </Reveal>
          ))}
          {experience.earlier.map((role) => (
            <Reveal as="li" key={role.org} className="timeline__item">
              <p className="timeline__title">
                {role.title} <span>· {role.org}</span>
                {role.proof && (
                  <a className="timeline__proof" href={role.proof.href} target="_blank" rel="noreferrer">
                    {role.proof.label} <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </p>
              <p className="timeline__period">{role.period}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
