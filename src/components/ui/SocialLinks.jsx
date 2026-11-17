import { site } from "../../data/site";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

/** GitHub + LinkedIn round icon buttons. */
export default function SocialLinks({ className = "" }) {
  return (
    <div className={className} style={{ display: "flex", gap: 10 }}>
      <a className="icon-link" href={site.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <GitHubIcon />
      </a>
      <a className="icon-link" href={site.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <LinkedInIcon />
      </a>
    </div>
  );
}
