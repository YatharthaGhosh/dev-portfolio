import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in the middle of the screen.
 * IntersectionObserver tells us when an element enters the viewport,
 * which is much cheaper than measuring every section on each scroll event.
 *
 * `ids` must be a stable array (defined outside the component).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Only count a section as active when it crosses a thin band in the middle of the screen.
      { rootMargin: "-45% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
