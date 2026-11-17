import { Code2 } from "lucide-react";
import { alsoShips, skillGroups } from "../data/site";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="Skills"
          title="The AI toolkit."
          intro="What I use to build, ground, evaluate and run LLM systems, plus the engineering to ship them."
        />

        <ul className="skills__grid">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal as="li" key={group.title} delay={i * 0.06} className="skills__item">
                <SpotlightCard className="skill-card">
                  <div className="skill-card__head">
                    <span className="icon-tile">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="skill-card__title">{group.title}</h3>
                  </div>
                  <ul className="tag-list" aria-label={`${group.title} skills`}>
                    {group.items.map((item) => (
                      <li key={item} className="tag skill-card__tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="also" delay={0.1}>
          <p className="also__label">
            <Code2 aria-hidden="true" /> Also ships
          </p>
          <ul className="also__list" aria-label="Engineering skills">
            {alsoShips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
