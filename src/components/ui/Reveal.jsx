import { motion } from "motion/react";

/**
 * Fades + slides its children up the first time they scroll into view.
 * Usage: <Reveal delay={0.1}>...</Reveal>  or  <Reveal as="li">...</Reveal>
 */
export default function Reveal({ as = "div", delay = 0, y = 28, children, ...rest }) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
