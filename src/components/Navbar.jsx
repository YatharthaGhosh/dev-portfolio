import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks, site } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";
import "./Navbar.css";

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  // Switch from transparent to blurred once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape or on resize to desktop.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 900px)");
    const onResize = (e) => e.matches && setMenuOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const [first, last] = site.brand.split(". ");

  return (
    <header className={`nav ${scrolled || menuOpen ? "nav--solid" : ""}`}>
      <nav className="container nav__inner" aria-label="Primary">
        <a href="#home" className="nav__brand" onClick={closeMenu}>
          {first}
          <span className="accent">.</span> {last}
        </a>

        <ul className="nav__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav__link ${active === link.id ? "is-active" : ""}`}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn--primary btn--sm nav__cta">
          Let&apos;s talk <ArrowRight />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  <a
                    href={`#${link.id}`}
                    className={`nav__mobile-link ${active === link.id ? "is-active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span className="nav__mobile-index">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="nav__mobile-cta">
                <a href="#contact" className="btn btn--primary" onClick={closeMenu}>
                  Start a project <ArrowRight />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
