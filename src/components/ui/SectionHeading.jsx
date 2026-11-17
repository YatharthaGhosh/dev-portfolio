import Reveal from "./Reveal";
import "./SectionHeading.css";

/** The "01 / Stack" eyebrow, big title and optional intro used at the top of each section. */
export default function SectionHeading({ index, eyebrow, title, intro, id }) {
  return (
    <header className="section-heading">
      <Reveal as="p" className="section-heading__eyebrow">
        <span className="section-heading__index">{index}</span>
        <span className="section-heading__rule" aria-hidden="true" />
        {eyebrow}
      </Reveal>
      <Reveal as="h2" id={id} className="section-heading__title" delay={0.05}>
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" className="section-heading__intro" delay={0.1}>
          {intro}
        </Reveal>
      )}
    </header>
  );
}
