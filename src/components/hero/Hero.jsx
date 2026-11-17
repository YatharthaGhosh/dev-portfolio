import { Component, Fragment, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { hero, site } from "../../data/site";
import SocialLinks from "../ui/SocialLinks";
import "./Hero.css";

// React.lazy splits Three.js into its own file that loads AFTER the text is on screen.
const HeroScene = lazy(() => import("./HeroScene"));

// Animation "recipes". The parent staggers its children one after another.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const word = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/** If WebGL is unavailable (old device, disabled GPU), show a CSS glow instead of crashing. */
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <div className="hero__orb-fallback" /> : this.props.children;
  }
}

export default function Hero() {
  const words = [
    ...hero.headline.map((text) => ({ text, accent: false })),
    ...hero.headlineAccent.map((text) => ({ text, accent: true })),
  ];

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <motion.div className="hero__copy" variants={container} initial="hidden" animate="show">
          {site.status && (
            <motion.p variants={fadeUp} className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              {site.status}
            </motion.p>
          )}

          <motion.p variants={fadeUp} className="hero__greeting">
            {hero.greeting}
          </motion.p>

          <motion.h1 id="hero-title" className="hero__title" variants={container}>
            {words.map(({ text, accent }, i) => (
              <Fragment key={i}>
                <span className="hero__word-mask">
                  <motion.span variants={word} className={`hero__word ${accent ? "accent" : ""}`}>
                    {text}
                  </motion.span>
                </span>{" "}
              </Fragment>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="hero__positioning">
            {hero.positioning}
          </motion.p>

          <motion.p variants={fadeUp} className="hero__lead">
            {hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              See the projects <ArrowRight />
            </a>
            <a href="#experience" className="btn btn--ghost">
              Experience
            </a>
          </motion.div>

          <motion.dl variants={fadeUp} className="hero__proof">
            {hero.proof.map((item) => (
              <div key={item.label} className="hero__proof-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="hero__meta">
            <span className="hero__location">
              <MapPin aria-hidden="true" /> {site.location}
            </span>
            <span className="hero__divider" aria-hidden="true" />
            <SocialLinks />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <SceneBoundary>
            <Suspense fallback={<div className="hero__orb-fallback" />}>
              <HeroScene />
            </Suspense>
          </SceneBoundary>
        </motion.div>
      </div>

      <a href="#projects" className="hero__scroll" aria-label="Scroll to projects">
        <span>Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
