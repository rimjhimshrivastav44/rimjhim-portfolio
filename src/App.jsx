import ContactForm from './contact';
import React, { useState } from "react";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BriefcaseBusiness, Code2, Github, GraduationCap,
  Linkedin, Mail, Menu, Send, X, MapPin, CheckCircle2, Sparkles
} from "lucide-react";

const skills = [
  { name: "HTML5", level: "Learning & practicing", symbol: "01" },
  { name: "CSS3", level: "Responsive layouts", symbol: "02" },
  { name: "JavaScript", level: "Core concepts & DOM", symbol: "03" },
  { name: "React", level: "Building components", symbol: "04" },
  { name: "Node.js", level: "Backend fundamentals", symbol: "05" },
  { name: "Express.js", level: "REST API basics", symbol: "06" },
  { name: "MongoDB", level: "Learning databases", symbol: "07" },
  { name: "Git & GitHub", level: "Version control", symbol: "08" }
];

const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    category: "Frontend",
    description: "A responsive personal website to introduce myself, showcase skills, and share projects.",
    stack: ["React", "CSS", "Lucide"],
    icon: "✳",
    link: ""
  },
  {
    number: "02",
    title: "Restaurant Website",
    category: "Web Design",
    description: "A restaurant website concept with clear sections, menu information, and contact details.",
    stack: ["HTML", "CSS", "JavaScript"],
    icon: "⌘",
    link: ""
  },
  {
    number: "03",
    title: "Contact Manager API",
    category: "Full-stack practice",
    description: "A learning project for practicing form handling, REST APIs, and database operations.",
    stack: ["Node.js", "Express", "MongoDB"],
    icon: "↗",
    link: ""
  }
];

const journey = [
  { number: "01", title: "BCA studies", description: "Building a foundation in computer applications and programming." },
  { number: "02", title: "Frontend fundamentals", description: "Practicing HTML, CSS, JavaScript, responsive design, and user interfaces." },
  { number: "03", title: "Full-stack learning", description: "Exploring React, Node.js, Express, databases, and REST APIs." },
  { number: "04", title: "Keep building", description: "Turning what I learn into practical projects and improving one step at a time." }
];

const initialForm = { name: "", email: "", subject: "", message: "" };

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title} <span>{accent}</span></h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formStatus, setFormStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const navItems = ["About", "Skills", "Projects", "Journey", "Contact"];

  function updateForm(event) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setFormStatus({ type: "", text: "" });

    const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "The message could not be sent.");

      setFormStatus({ type: "success", text: "Thanks! Your message has been saved." });
      setForm(initialForm);
    } catch (error) {
      setFormStatus({
        type: "error",
        text: error.message || "Could not connect to the server. Please try again later."
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav wrap" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            rimjhim<span>.</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Let's talk <ArrowUpRight size={15} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" /> BCA STUDENT · ASPIRING DEVELOPER</div>
            <h1>Hi, I'm Rimjhim.<br /><span>I build for the web.</span></h1>
            <p className="hero-lead">
              I'm learning to turn ideas into thoughtful, useful digital experiences — one project at a time.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowDown size={17} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={17} /></a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
              <a href="mailto:your-email@example.com"><Mail size={18} /> Email</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Developer illustration">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-card">
              <div className="window-dots"><i /><i /><i /></div>
              <div className="code-line muted-code">const developer = {"{"}</div>
              <div className="code-line"><span>name:</span> "Rimjhim",</div>
              <div className="code-line"><span>learning:</span> [</div>
              <div className="code-line indent">"React",</div>
              <div className="code-line indent">"Node.js"</div>
              <div className="code-line">],</div>
              <div className="code-line"><span>mindset:</span> "keep growing"</div>
              <div className="code-line muted-code">{"}"};</div>
              <div className="visual-sticker"><Sparkles size={18} /> made with curiosity</div>
            </div>
            <div className="floating-chip chip-code"><Code2 size={17} /> Code</div>
            <div className="floating-chip chip-idea"><Sparkles size={17} /> Ideas → UI</div>
          </div>
          <a className="scroll-cue" href="#about"><span /> Scroll to explore</a>
        </section>

        <section className="section section-tint" id="about">
          <div className="wrap">
            <SectionHeading eyebrow="A LITTLE INTRODUCTION" title="Curious mind." accent="Creative builder."
              description="A little about who I am, what I enjoy, and where I'm headed." />
            <div className="about-grid">
              <div className="about-feature">
                <div className="feature-icon"><GraduationCap size={27} /></div>
                <p className="feature-kicker">CURRENTLY</p>
                <h3>Learning by doing.</h3>
                <p>I'm pursuing BCA and growing my web development skills through practice, small experiments, and projects.</p>
                <div className="feature-line"><span /> Always learning, always improving</div>
              </div>
              <div className="about-details">
                <p className="large-copy">
                  I enjoy the process of taking a blank screen and gradually shaping it into something clear, useful, and easy to use.
                </p>
                <p>
                  Right now, I'm strengthening my frontend fundamentals while exploring how the backend works — from APIs to databases.
                  My goal is to become a confident developer who can build complete web applications.
                </p>
                <div className="detail-grid">
                  <div><span>01 / EDUCATION</span><strong>Bachelor of Computer Applications</strong></div>
                  <div><span>02 / FOCUS</span><strong>Web & full-stack development</strong></div>
                  <div><span>03 / APPROACH</span><strong>Practice, build, improve</strong></div>
                  <div><span>04 / BASE</span><strong><MapPin size={15} /> India</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap" id="skills">
          <SectionHeading eyebrow="TOOLS IN MY TOOLKIT" title="Learning the" accent="building blocks."
            description="Technologies I'm practicing as I work toward full-stack development." />
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-tile" key={skill.name}>
                <span className="skill-number">{skill.symbol}</span>
                <div><h3>{skill.name}</h3><p>{skill.level}</p></div>
                <ArrowUpRight className="tile-arrow" size={18} />
              </article>
            ))}
          </div>
          <p className="honesty-note"><Sparkles size={16} /> Skill labels describe my learning focus, not certified proficiency ratings.</p>
        </section>

        <section className="section section-dark" id="projects">
          <div className="wrap">
            <SectionHeading eyebrow="A FEW THINGS I'M BUILDING" title="Learning through" accent="projects."
              description="Practice projects that help me turn concepts into real, working experiences." />
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <div className={`project-art art-${project.number}`}>
                    <span className="project-art-number">{project.number}</span>
                    <span className="project-glyph">{project.icon}</span>
                    <Code2 size={20} className="project-code-icon" />
                  </div>
                  <div className="project-meta"><span>{project.category}</span><span>PROJECT {project.number}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">View project <ArrowUpRight size={16} /></a> : <span className="project-link project-in-progress">Project link to be added <ArrowUpRight size={16} /></span>}
                </article>
              ))}
            </div>
            <p className="projects-footnote">These are portfolio examples/learning project descriptions. Replace them with your actual completed projects and links before applying for jobs.</p>
          </div>
        </section>

        <section className="section wrap" id="journey">
          <SectionHeading eyebrow="ONE STEP AT A TIME" title="My learning" accent="journey."
            description="The path I'm following as I grow from fundamentals to full-stack projects." />
          <div className="journey-list">
            {journey.map((step) => (
              <article className="journey-row" key={step.number}>
                <span className="journey-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <CheckCircle2 size={19} className="journey-check" />
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="wrap">
            <SectionHeading eyebrow="HAVE A QUESTION OR IDEA?" title="Let's start a" accent="conversation."
              description="Use the form below to send a message. The backend needs to be configured for messages to be saved." />
            <div className="contact-grid">
              <div className="contact-aside">
                <div className="contact-icon"><Mail size={25} /></div>
                <h3>Say hello.</h3>
                <p>I'm always interested in learning, sharing ideas, and connecting with people who enjoy building things.</p>
                <a href="mailto:rimjhimshrivastav44@gmail.com">rimjhimshrivastav44@gmail.com <ArrowUpRight size={16} /></a>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>Your name<input name="name" value={form.name} onChange={updateForm} placeholder="Name" required maxLength={80} /></label>
                  <label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required maxLength={254} /></label>
                </div>
                <label>Subject<input name="subject" value={form.subject} onChange={updateForm} placeholder="What would you like to discuss?" required maxLength={150} /></label>
                <label>Message<textarea name="message" value={form.message} onChange={updateForm} placeholder="Write your message..." required minLength={5} maxLength={3000} rows={5} /></label>
                <button className="button button-primary send-button" type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send message"} <Send size={16} />
                </button>
                {formStatus.text && <p className={`form-status ${formStatus.type}`} role="status">{formStatus.text}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="#home">rimjhim<span>.</span></a>
          <p>Built with patience, curiosity, and code.</p>
          <a className="back-top" href="#home" aria-label="Back to top"><ArrowUp size={18} /></a>
          <small>© {new Date().getFullYear()} Rimjhim Shrivastav · Personal portfolio</small>
        </div>
      </footer>
    </>
  );
}
