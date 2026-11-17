import { ArrowUpRight, Award } from "lucide-react";
import { about } from "../data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div>
          <SectionHeading id="about-title" index="04" eyebrow="About" title="AI that can be trusted in production." />

          <div className="about__copy">
            {about.paragraphs.map((text, i) => (
              <Reveal as="p" key={i} delay={i * 0.06}>
                {text}
              </Reveal>
            ))}
          </div>

          <Reveal className="certs" delay={0.15}>
            <h3 className="certs__title">
              <Award aria-hidden="true" /> Certifications
            </h3>
            <ul className="certs__list">
              {about.certifications.map((c) => (
                <li key={c.name}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer">
                      {c.name} <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    <span>{c.name}</span>
                  )}
                  <em>{c.issuer}</em>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="about__card" delay={0.1}>
          <dl>
            {about.facts.map((fact) => (
              <div key={fact.label} className="about__fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
