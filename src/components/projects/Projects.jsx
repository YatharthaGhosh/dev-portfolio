import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/site";
import { GitHubIcon } from "../ui/BrandIcons";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import BarChart from "./BarChart";
import "./Projects.css";

/** Main screenshot plus thumbnails to switch between them. */
function Gallery({ shots, title }) {
  const [active, setActive] = useState(0);
  const shot = shots[active];

  return (
    <figure className="gallery">
      <div className="gallery__frame">
        <div className="gallery__chrome" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <a href={shot.src} target="_blank" rel="noreferrer" title="Open full size">
          <img key={shot.src} src={shot.src} alt={`${title}: ${shot.caption}`} loading="lazy" decoding="async" />
        </a>
      </div>
      <figcaption className="gallery__caption">{shot.caption}</figcaption>
      {shots.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label={`${title} screenshots`}>
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Screenshot ${i + 1}: ${s.caption}`}
              className={`gallery__thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <img src={s.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

function CaseStudy({ project, index }) {
  const { kicker, title, summary, shots, metrics, chart, highlights, stack, links } = project;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal as="article" className="case" aria-labelledby={`${project.id}-title`}>
      <header className="case__head">
        <p className="case__kicker">
          <span className="case__num">{number}</span>
          {kicker}
        </p>
        <h3 id={`${project.id}-title`} className="case__title">
          {title}
        </h3>
        <p className="case__summary">{summary}</p>
      </header>

      <div className="case__grid">
        <Gallery shots={shots} title={title} />

        <div className="case__side">
          <dl className="case__metrics">
            {metrics.map((m) => (
              <div key={m.label} className="metric">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          {chart && <BarChart {...chart} />}
        </div>
      </div>

      <div className="case__details">
        <div>
          <h4 className="case__label">How it works</h4>
          <ul className="case__highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="case__aside">
          <h4 className="case__label">Stack</h4>
          <ul className="tag-list" aria-label="Technologies used">
            {stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
          <div className="case__links">
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                <GitHubIcon /> {link.label} <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          index="01"
          eyebrow="Projects"
          title="AI systems, measured."
          intro="Two end-to-end builds, each with tests, an evaluation set and the numbers it produced."
        />
        <div className="cases">
          {projects.map((project, i) => (
            <CaseStudy key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
