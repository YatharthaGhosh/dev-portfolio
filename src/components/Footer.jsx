import { ArrowUp } from "lucide-react";
import { navLinks, site } from "../data/site";
import SocialLinks from "./ui/SocialLinks";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            Y<span className="accent">.</span> GHOSH
          </a>
          <p>
            {site.role} · {site.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. Designed and built by me.
        </p>
        <a href="#home" className="footer__top">
          Back to top <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
