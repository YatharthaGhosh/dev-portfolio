import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Copy, LoaderCircle, Mail } from "lucide-react";
import { contact, site } from "../data/site";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import Reveal from "./ui/Reveal";
import "./Contact.css";

// Set in .env.local (see .env.example). Vite only exposes variables that start with VITE_.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const emptyForm = { name: "", email: "", message: "", company: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  function update(event) {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (form.company) return; // hidden "honeypot" field: only bots fill it in

    const { company, ...payload } = form;

    // No form service configured yet: fall back to opening the visitor's email app.
    if (!ENDPOINT) {
      if (!site.email) {
        setStatus("error");
        return;
      }
      const body = `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Hello from your portfolio: ${payload.name}`
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <Reveal as="p" className="contact__eyebrow">
            <span className="accent">05</span>
            <span className="contact__rule" aria-hidden="true" />
            Contact
          </Reveal>
          <Reveal as="h2" id="contact-title" className="contact__title" delay={0.05}>
            {contact.headline[0]}
            <br />
            <span className="accent">{contact.headline[1]}</span>
          </Reveal>
          <Reveal as="p" className="contact__lead" delay={0.1}>
            {contact.intro}
          </Reveal>

          <Reveal as="ul" className="contact__channels" delay={0.15}>
            {site.email && (
              <li className="contact__channel">
                <Mail aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <button type="button" className="contact__copy" onClick={copyEmail} aria-label="Copy email address">
                  {copied ? <Check /> : <Copy />}
                </button>
              </li>
            )}
            <li className="contact__channel">
              <LinkedInIcon />
              <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/yatharthaghosh
              </a>
            </li>
            <li className="contact__channel">
              <GitHubIcon />
              <a href={site.links.github} target="_blank" rel="noreferrer">
                github.com/YatharthaGhosh
              </a>
            </li>
          </Reveal>
        </div>

        <Reveal className="contact__card" delay={0.1}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="done"
                className="contact__success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <span className="contact__success-icon">
                  <Check aria-hidden="true" />
                </span>
                <h3>Thanks, your message is in.</h3>
                <p>I&apos;ll get back to you within a day or two.</p>
                <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="form__title">Send a message</h3>

                <div className="form__row">
                  <label className="field">
                    <span className="field__label">Name</span>
                    <input name="name" value={form.name} onChange={update} required autoComplete="name" placeholder="Your name" />
                  </label>
                  <label className="field">
                    <span className="field__label">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={update}
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="field">
                  <span className="field__label">Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    required
                    rows={5}
                    minLength={20}
                    placeholder="The role or project, and how I can help."
                  />
                </label>

                {/* Honeypot: hidden from people, but bots fill it in */}
                <label className="visually-hidden" aria-hidden="true">
                  Company
                  <input name="company" value={form.company} onChange={update} tabIndex={-1} autoComplete="off" />
                </label>

                <button type="submit" className="btn btn--primary form__submit" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      Sending <LoaderCircle className="spin" />
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="form__error" role="alert">
                    Sorry, the message couldn&apos;t be sent. Please reach me on{" "}
                    <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>{" "}
                    instead.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
