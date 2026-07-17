import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Card from "./Card";

const badges = [
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    date: "Mar 13, 2024",
    skills: "Generative AI",
    image: "Images/Badges/B-Introduction-to-Generative-AI.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/8308151"
  },
  {
    title: "Introduction to Large Language Models",
    issuer: "Google",
    date: "Mar 13, 2024",
    skills: "LLM's",
    image: "Images/Badges/B-Introduction-to-Large-Language-Models.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/8308268"
  },
  {
    title: "Introduction to Responsible AI",
    issuer: "Google",
    date: "Mar 13, 2024",
    skills: "Responsible AI",
    image: "Images/Badges/B-Introduction-to-Responsible-AI.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/8308377"
  },
  {
    title: "Prompt Design in Agent Platform",
    issuer: "Google",
    date: "Mar 28, 2024",
    skills: "Machine Learning, Vertex AI",
    image: "Images/Badges/B-Prompt-Design-in-Agent-Platform.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/8474001"
  },
  {
    title: "Applying AI Principles with Google Cloud",
    issuer: "Google",
    date: "Mar 28, 2024",
    skills: "AI Principles, Google Cloud",
    image: "Images/Badges/B-Applying-AI-Principles-with-Google-Cloud.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/8475224"
  },
  {
    title: "Google Workspace with Gemini",
    issuer: "Google",
    date: "Oct 10, 2024",
    skills: "Google Workspace, Gemini",
    image: "Images/Badges/B-Google-Workspace-with-Gemini.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/11963638"
  },
  {
    title: "Create Engaging Video with Google Vids",
    issuer: "Google",
    date: "Feb 4, 2025",
    skills: "Google Vids, Generative Video",
    image: "Images/Badges/B-Create-Engaging-Video-with-Google-Vids.png",
    verifyLink: "https://www.skills.google/public_profiles/d4b3e966-3009-4a5b-bd35-95eccf350fa4/badges/13819643"
  },
];

const certificatesData = [
  {
    title: "Data Analytics",
    issuer: "Deloitte, Forage",
    date: "May 2026",
    description: "I was able to analyse data and create a dashboard. I practised using Tableau and Excel and built my data analysis skills in a real-world context.",
    image: "Images/Certificates/Data-Analytics-Job-Simulation.png",
    tag: "Data Analytics Concepts",
    verifyLink: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_cQb4FSZkuuYmcNxXi_1779910274949_completion_certificate.pdf"
  },
   {
    title: "Cyber Job Simulation",
    issuer: "Deloitte, Forage",
    date: "May 2026",
    description: "I was able to help a client determine the source of a data breach and answer questions to identify suspicious user activity.",
    image: "Images/Certificates/Cyber-Job-Simulation.png",
    tag: "Cybersecurity Concepts",
    verifyLink: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_cQb4FSZkuuYmcNxXi_1779901281521_completion_certificate.pdf"
  },
  {
    title: "Tech Job Simulation",
    issuer: "Deloitte, Forage",
    date: "May 2026",
    description: "I was able to reconcile data and turn a client's desires for a project into a proposal.",
    image: "Images/Certificates/Technology-Job-Simulation.png",
    tag: "Tech Lead",
    verifyLink: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_cQb4FSZkuuYmcNxXi_1779943574933_completion_certificate.pdf"
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP",
    date: "May 2026",
    description: "I learned about some leading data science and analytics practices, methodologies, and tools, examined the benefits and challenges of a data-driven approach for businesses, and gained knowledge about some of the essential skills needed to pursue a career in the field",
    image: "Images/Certificates/Data-science-&-Analytics.png",
    tag: "Data Science & Analytics Concepts",
    verifyLink: "https://example.com/verify/hp-data-science"
  },
  {
    title: "Introduction To AI",
    issuer: "Coursera",
    date: "Mar 2026",
    description: "Introduction to various AI concepts and applications",
    image: "Images/Certificates/Introduction-to-AI.png",
    tag: "AI Concepts"
  },
  {
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP",
    date: "May 2026",
    description: "I learned about common cybersecurity threats and discovered basic ways to keep online data and information more secure",
    image: "Images/Certificates/Introduction-to-Cybersecurity-Awareness.png",
    tag: "Cybersecurity Awareness",
    verifyLink: "https://example.com/verify/hp-cybersecurity"
  },
  {
    title: "Film Editing",
    issuer: "Ramoji Academy Of Movies",
    date: "July 2025",
    description: "A 20 to 25-week adventure crafted to equip aspiring filmmakers with editing skills and insights into the dynamic world of digital cinema.",
    image: "Images/Certificates/Ramoji-Film-Editing.png",
    tag: "Advance Film Editing concepts"
  }
];

const Internships = [
  {
    title: "Web Development Internship",
    issuer: "Prodigy Infotech",
    date: "Feb 15, 2025 - Mar 15, 2025",
    description: "A One Month Intensive Training program focused on in-demand web development skills.",
    image: "/Images/Internships/Prodigy.png",
    tag: "Frontend Development",
    verifyLink: "https://example.com/verify/prodigy-internship"
  },
  {
    title: "Letter Of Recommendation",
    issuer: "Prodigy Infotech",
    date: "Mar 16, 2025",
    description: "Letter of Recommendation for the Web Development Internship program.",
    image: "/Images/Internships/Prodigy-LoR.png",
    tag: "LoR"
  },
  {
    title: "Web Development Internship",
    issuer: "Pinnacle Labs ",
    date: "May 09, 2025 - Jun 09, 2025",
    description: "A One month Intensive Training program focused on in-demand web development skills.",
    image: "Images/Internships/Pinnacle.png",
    tag: "Web Development ",
    verifyLink: "https://example.com/verify/pinnacle-internship"
  }
];

const techStackLogos = [
  { name: "GSAP", url: "https://cdn.simpleicons.org/greensock/82B541" },
  { name: "Three JS", url: "https://cdn.simpleicons.org/threedotjs/white" },
  { name: "WebGL", url: "https://cdn.simpleicons.org/webgl" },
  { name: "C", url: "Images/C.png" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "HTML", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "React JS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "R", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" },
  { name: "SQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Vite", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", url: "https://cdn.simpleicons.org/github/white" },
  { name: "Spline", url: "/Images/spline.png" },
];

const companyLogos = [
  { name: "Pinnacle", url: "/Images/Companies/Pinnacle.png" },
  { name: "Prodigy Infotech", url: "/Images/Companies/Prodigy.png" },
  { name: "Golden Tree Enterprises", url: "/Images/Companies/Golden-Tree.png" },
];

const About = () => {
  const [showCertModal, setShowCertModal] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("badges");
  const [selectedCertImage, setSelectedCertImage] = useState(null);
  const grid2Container = useRef();

  // Pauses background page scrolling (via body overflow styles and Lenis controls) when modal or lightbox is opened
  useEffect(() => {
    const isOpened = showCertModal || !!selectedCertImage;
    if (isOpened) {
      document.body.style.overflow = "hidden";
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [showCertModal, selectedCertImage]);

  return (
    <section className="c-space py-12 md:py-24 flex flex-col justify-start w-full h-auto" id="about">
      {/* Section Header */}
      <div className="text-center md:text-left mb-6 shrink-0">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
          About <span className="theme-text-gradient">Me</span>
        </h2>
        <div className="w-12 h-1 theme-underline-gradient mt-2.5 mx-auto md:mx-0 rounded-full" />
      </div>
      <div className="about-grid mt-6 md:mt-8">
        {/* Grid 1 - Intro/Profile */}
        <div className="flex items-end grid-default-color grid-1 relative overflow-hidden group" style={{ padding: 0 }}>
          <img 
            src="/Images/Me.jpg" 
            alt="Amit" 
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 z-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0814]/95 via-[#0a0814]/40 to-transparent z-5 pointer-events-none" />
          
          {/* Content overlay */}
          <div className="z-10 relative mt-auto p-6 w-full">
            <p className="headtext">Hi, I'm K Amit Patra</p>
            <p className="subtext">
              Over the last 5 years, I developed a strong coding background and getting improvising it day by day.
              I am passionate about creating responsive, interactive, and visually engaging digital experiences that combine creativity with functionality.
            </p>
          </div>
        </div>

        {/* Grid 2 - Certificates */}
        {/* Grid 2 - Expertise in (vertical animated list) */}
        <div className="grid-default-color grid-2 flex flex-col !justify-center relative overflow-hidden group">
          <div className="z-10 w-full text-center flex flex-col items-center justify-center">
            <p className="headtext text-center !mb-3">Expertise in</p>
            <ul className="space-y-2 mt-1.5 w-full flex flex-col items-center">
              {["Frontend Developer", "AI / ML", "Cloud Computing", "DevOps"].map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex items-center gap-4 text-slate-300 hover:text-white bg-slate-950/40 border border-accent/5 hover:border-accent/25 px-5 py-2 rounded-2xl transition-all duration-300 group/item transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 w-full max-w-sm justify-start cursor-default"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 text-xs text-accent-hover group-hover/item:bg-accent group-hover/item:text-white group-hover/item:border-accent transition-all duration-300 font-mono font-bold select-none shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-bold tracking-wide font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grid 3 - Certificates (Click to View Certificates) */}
        <div 
          onClick={() => setShowCertModal(true)}
          className="grid-default-color grid-3 flex flex-col !justify-center items-center cursor-pointer group"
        >
          <div className="flex flex-col items-center justify-center gap-2 size-full text-center relative z-10 p-4 select-none">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/50 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-accent-light group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 017.368 5.832 50.707 50.707 0 00-2.658.813m-11.128 0A48.536 48.536 0 0012 11.25c2.107 0 4.14-.132 6.128-.388m-12.128 0L4 19.5"
                />
              </svg>
            </div>
            <p className="headtext text-center !mb-1 group-hover:text-accent-hover transition-colors">
              Click to View Certificates
            </p>
            <p className="subtext text-accent-light/60 text-xs max-w-[85%] font-sans">
              Explore my technical certifications, badges, and academic credentials.
            </p>
          </div>
        </div>

        {/* Grid 5 - Tech Stack & Experienced from companies (divided horizontally into two boxes) */}
        <div className="grid-5 flex flex-col gap-4 h-full">
          {/* Upper Box: Tech Stack */}
          <div className="grid-default-color flex-1 flex flex-col !justify-center relative overflow-hidden">
            <div className="z-10 relative text-center flex flex-col items-center w-full">
              <p className="headtext">Tech Stack</p>
            </div>
            <div className="w-full overflow-hidden py-3 z-10 relative mt-2 select-none">
              <div className="flex w-max animate-marquee items-center">
                {techStackLogos.map((logo, idx) => (
                  <div 
                    key={`logo-1-${idx}`} 
                    className="flex items-center gap-3 bg-slate-950/60 border border-accent/10 hover:border-accent/30 px-5 py-2 rounded-2xl hover:scale-105 transition-all duration-300 group mr-8"
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      className="h-5 w-auto object-contain transition-all duration-300" 
                    />
                    <span className="text-white/60 group-hover:text-white font-medium text-sm tracking-wide transition-all duration-300">
                      {logo.name}
                    </span>
                  </div>
                ))}
                {techStackLogos.map((logo, idx) => (
                  <div 
                    key={`logo-2-${idx}`} 
                    className="flex items-center gap-3 bg-slate-950/60 border border-accent/10 hover:border-accent/30 px-5 py-2 rounded-2xl hover:scale-105 transition-all duration-300 group mr-8"
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      className="h-5 w-auto object-contain transition-all duration-300" 
                    />
                    <span className="text-white/60 group-hover:text-white font-medium text-sm tracking-wide transition-all duration-300">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Box: Experienced from companies */}
          <div className="grid-default-color flex-1 flex flex-col !justify-center relative overflow-hidden">
            <div className="z-10 relative text-center flex flex-col items-center w-full">
              <p className="headtext">Experienced from</p>
            </div>
            <div className="w-full overflow-hidden py-3 z-10 relative mt-2 select-none">
              <div className="flex w-max animate-marquee items-center">
                {companyLogos.map((logo, idx) => (
                  <div 
                    key={`company-1-${idx}`} 
                    className="flex items-center gap-3 bg-slate-950/60 border border-accent/10 hover:border-accent/30 px-5 py-2 rounded-2xl hover:scale-105 transition-all duration-300 group mr-8"
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      className="h-5 w-auto object-contain transition-all duration-300" 
                    />
                    <span className="text-white/60 group-hover:text-white font-medium text-sm tracking-wide transition-all duration-300">
                      {logo.name}
                    </span>
                  </div>
                ))}
                {companyLogos.map((logo, idx) => (
                  <div 
                    key={`company-2-${idx}`} 
                    className="flex items-center gap-3 bg-slate-950/60 border border-accent/10 hover:border-accent/30 px-5 py-2 rounded-2xl hover:scale-105 transition-all duration-300 group mr-8"
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      className="h-5 w-auto object-contain transition-all duration-300" 
                    />
                    <span className="text-white/60 group-hover:text-white font-medium text-sm tracking-wide transition-all duration-300">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid 4 - Hobbies & Passions */}
        <div className="grid-default-color grid-4 relative overflow-hidden">
          <div
            ref={grid2Container}
            className="w-full h-full relative"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none select-none">
              <p className="text-2xl md:text-3xl font-extrabold tracking-wider text-accent/15 uppercase">
                Life Beyond Code
              </p>
              <p className="text-[10px] md:text-xs text-slate-500/40 mt-1 max-w-[80%] font-sans">
                Drag to explore my hobbies and interests
              </p>
            </div>
            <Card
              style={{ rotate: "12deg", top: "8%", left: "6%" }}
              text="Video editing"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-15deg", top: "38%", left: "8%" }}
              text="Drawing"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "68%", left: "6%" }}
              text="Sketching"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-8deg", top: "10%", left: "48%" }}
              text="Color grading"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "10deg", top: "48%", left: "28%" }}
              text="Riding bikes"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-12deg", top: "65%", left: "50%" }}
              text="Badminton"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-20deg", top: "22%", left: "24%" }}
              text="Cricket"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "15deg", top: "38%", left: "52%" }}
              text="Photography"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-6deg", top: "74%", left: "25%" }}
              text="Cinematography"
              containerRef={grid2Container}
            />
          </div>
        </div>
      </div>

      {/* Certificates, Badges, and Offer Letters Modal Overlay rendered via Portal */}
      {typeof document !== "undefined" && showCertModal && createPortal(
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out_forwards]"
          onClick={() => setShowCertModal(false)}
        >
          <div 
            data-lenis-prevent
            className="bg-slate-950/95 border border-accent/25 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative scrollbar-thin animate-[scaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-accent/10 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-accent-hover"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 017.368 5.832 50.707 50.707 0 00-2.658.813m-11.128 0A48.536 48.536 0 0012 11.25c2.107 0 4.14-.132 6.128-.388m-12.128 0L4 19.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                    Credentials & Documents
                  </h3>
                  <p className="text-[10px] text-accent-hover font-sans tracking-widest uppercase mt-0.5">
                    Verified Academic & Career Records
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCertModal(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-accent/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-accent/40 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Custom Accordion Layout */}
            <div className="w-full space-y-4">
              
              {/* Accordion 1: Badges */}
              <div 
                className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === "badges" ? "border-accent/25 bg-slate-900/60" : "border-accent/10 bg-slate-900/40"}`}
              >
                <div 
                  onClick={() => setActiveAccordion(activeAccordion === "badges" ? null : "badges")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveAccordion(activeAccordion === "badges" ? null : "badges");
                    }
                  }}
                  className="flex items-center justify-between p-4 md:p-5 cursor-pointer outline-none select-none hover:bg-accent/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent-hover">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <span className="font-display text-sm md:text-base font-bold text-white uppercase tracking-wider group-hover:text-accent-light transition-colors">
                      Badges & Micro-Credentials
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs text-accent-hover/60 bg-accent/5 px-2 py-0.5 rounded border border-accent/10 font-mono">
                      {badges.length} Items
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-4 h-4 text-accent-hover transition-transform duration-300 ${activeAccordion === "badges" ? "rotate-180" : ""}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${activeAccordion === "badges" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="p-4 md:p-5 border-t border-accent/10 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {badges.map((cert, index) => (
                          <div 
                            key={index}
                            className="bg-slate-900/60 border border-accent/10 hover:border-accent/30 p-4 md:p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group/badgecard"
                          >
                            <div className="flex items-start gap-4">
                              <div 
                                onClick={() => setSelectedCertImage(cert.image)}
                                className="w-14 h-14 rounded-xl bg-slate-950/60 border border-accent/10 flex items-center justify-center p-1 shrink-0 overflow-hidden hover:border-accent/40 transition-all cursor-zoom-in group/badge"
                              >
                                <img 
                                  src={cert.image} 
                                  alt={cert.title} 
                                  className="w-full h-full object-contain transition-transform duration-300 group-hover/badge:scale-105" 
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className="font-display text-sm md:text-md font-bold text-white leading-tight group-hover/badgecard:text-accent-light transition-colors">
                                    {cert.title}
                                  </h4>
                                  <span className="text-[9px] md:text-[10px] bg-accent/10 text-accent-hover px-2 py-0.5 rounded-full border border-accent/25 shrink-0 font-sans">
                                    {cert.date}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 font-sans mb-1 font-semibold">
                                  {cert.issuer}
                                </p>
                                <p className="text-[10px] md:text-[11px] text-slate-500 font-sans leading-relaxed">
                                  <span className="text-accent-hover/80 font-medium">Skills:</span> {cert.skills}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-accent/5 flex items-center justify-between">
                              <span className="text-[10px] text-green-400 flex items-center gap-1 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Verified
                              </span>
                              <a
                                href={cert.verifyLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-accent-hover hover:text-accent-light transition-colors font-medium flex items-center gap-1"
                              >
                                Verify
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                  <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0L13.5 9.54a.75.75 0 0 1 0 1.06L9.975 14.12a.75.75 0 0 1-1.06-1.06l2.48-2.48H3a.75.75 0 0 1 0-1.5h8.394L8.914 7.085a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 2: Certificates */}
              <div 
                className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === "certificates" ? "border-accent/25 bg-slate-900/60" : "border-accent/10 bg-slate-900/40"}`}
              >
                <div 
                  onClick={() => setActiveAccordion(activeAccordion === "certificates" ? null : "certificates")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveAccordion(activeAccordion === "certificates" ? null : "certificates");
                    }
                  }}
                  className="flex items-center justify-between p-4 md:p-5 cursor-pointer outline-none select-none hover:bg-accent/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent-hover">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 017.368 5.832 50.707 50.707 0 00-2.658.813m-11.128 0A48.536 48.536 0 0012 11.25c2.107 0 4.14-.132 6.128-.388m-12.128 0L4 19.5" />
                      </svg>
                    </div>
                    <span className="font-display text-sm md:text-base font-bold text-white uppercase tracking-wider group-hover:text-accent-light transition-colors">
                      Certifications & Coursework
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs text-accent-hover/60 bg-accent/5 px-2 py-0.5 rounded border border-accent/10 font-mono">
                      {certificatesData.length} Items
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-4 h-4 text-accent-hover transition-transform duration-300 ${activeAccordion === "certificates" ? "rotate-180" : ""}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${activeAccordion === "certificates" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="p-4 md:p-5 border-t border-accent/10 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certificatesData.map((cert, index) => (
                          <div 
                            key={index}
                            className="bg-slate-900/60 border border-accent/10 hover:border-accent/30 p-4 md:p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group/certcard"
                          >
                            <div>
                              <div 
                                onClick={() => setSelectedCertImage(cert.image)}
                                className="w-full h-44 rounded-xl bg-slate-950/80 border border-accent/10 hover:border-accent/30 transition-all flex items-center justify-center p-2 mb-4 overflow-hidden cursor-zoom-in relative group/img"
                              >
                                <img 
                                  src={cert.image} 
                                  alt={cert.title} 
                                  className="max-w-full max-h-full object-contain rounded transition-transform duration-500 group-hover/img:scale-105" 
                                />
                                <div className="absolute inset-0 bg-slate-950/20 hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                                  <span className="bg-slate-950/80 border border-accent/30 text-accent-light text-[10px] px-2.5 py-1 rounded-full font-sans tracking-wide">
                                    Click to View
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-display text-sm md:text-md font-bold text-white leading-tight group-hover/certcard:text-accent-light transition-colors">
                                  {cert.title}
                                </h4>
                                <span className="text-[9px] md:text-[10px] bg-accent/10 text-accent-hover px-2 py-0.5 rounded-full border border-accent/25 shrink-0 font-sans">
                                  {cert.date}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 font-sans mb-2 font-semibold">
                                {cert.issuer}
                              </p>
                              <p className="text-[10px] md:text-[11px] text-slate-500 font-sans leading-relaxed">
                                {cert.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-accent/5 flex items-center justify-between">
                              {cert.verifyLink ? (
                                <a
                                  href={cert.verifyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-accent-hover hover:text-accent-light transition-colors font-medium flex items-center gap-1"
                                >
                                  Verify
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0L13.5 9.54a.75.75 0 0 1 0 1.06L9.975 14.12a.75.75 0 0 1-1.06-1.06l2.48-2.48H3a.75.75 0 0 1 0-1.5h8.394L8.914 7.085a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                  </svg>
                                </a>
                              ) : cert.tag ? (
                                <span className="text-[10px] text-accent-hover flex items-center gap-1.5 font-sans font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent-hover animate-pulse" />
                                  {cert.tag}
                                </span>
                              ) : (
                                <div />
                              )}
                              <button
                                onClick={() => setSelectedCertImage(cert.image)}
                                className="text-[11px] text-accent-hover hover:text-accent-light transition-colors font-medium flex items-center gap-1 cursor-pointer"
                              >
                                View Full Doc
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                  <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0L13.5 9.54a.75.75 0 0 1 0 1.06L9.975 14.12a.75.75 0 0 1-1.06-1.06l2.48-2.48H3a.75.75 0 0 1 0-1.5h8.394L8.914 7.085a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 3: Offer Letters */}
              <div 
                className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === "offers" ? "border-accent/25 bg-slate-900/60" : "border-accent/10 bg-slate-900/40"}`}
              >
                <div 
                  onClick={() => setActiveAccordion(activeAccordion === "offers" ? null : "offers")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveAccordion(activeAccordion === "offers" ? null : "offers");
                    }
                  }}
                  className="flex items-center justify-between p-4 md:p-5 cursor-pointer outline-none select-none hover:bg-accent/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent-hover">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <span className="font-display text-sm md:text-base font-bold text-white uppercase tracking-wider group-hover:text-accent-light transition-colors">
                      Internships & Letter Of Recommendation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] md:text-xs text-accent-hover/60 bg-accent/5 px-2 py-0.5 rounded border border-accent/10 font-mono">
                      {Internships.length} Items
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-4 h-4 text-accent-hover transition-transform duration-300 ${activeAccordion === "offers" ? "rotate-180" : ""}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${activeAccordion === "offers" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="p-4 md:p-5 border-t border-accent/10 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Internships.map((letter, index) => (
                          <div 
                            key={index}
                            className="bg-slate-900/60 border border-accent/10 hover:border-accent/30 p-4 md:p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group/offercard"
                          >
                            <div>
                              <div 
                                onClick={() => setSelectedCertImage(letter.image)}
                                className="w-full h-44 rounded-xl bg-slate-950/80 border border-accent/10 hover:border-accent/30 transition-all flex items-center justify-center p-2 mb-4 overflow-hidden cursor-zoom-in relative group/img"
                              >
                                <img 
                                  src={letter.image} 
                                  alt={letter.title} 
                                  className="max-w-full max-h-full object-contain rounded transition-transform duration-500 group-hover/img:scale-105" 
                                />
                                <div className="absolute inset-0 bg-slate-950/20 hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                                  <span className="bg-slate-950/80 border border-accent/30 text-accent-light text-[10px] px-2.5 py-1 rounded-full font-sans tracking-wide">
                                    Click to View
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-display text-sm md:text-md font-bold text-white leading-tight group-hover/offercard:text-accent-light transition-colors">
                                  {letter.title}
                                </h4>
                                <span className="text-[9px] md:text-[10px] bg-accent/10 text-accent-hover px-2 py-0.5 rounded-full border border-accent/25 shrink-0 font-sans">
                                  {letter.date}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 font-sans mb-2 font-semibold">
                                {letter.issuer}
                              </p>
                              <p className="text-[10px] md:text-[11px] text-slate-500 font-sans leading-relaxed">
                                {letter.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-accent/5 flex items-center justify-between">
                              {letter.verifyLink ? (
                                <a
                                  href={letter.verifyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-accent-hover hover:text-accent-light transition-colors font-medium flex items-center gap-1"
                                >
                                  Verify
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0L13.5 9.54a.75.75 0 0 1 0 1.06L9.975 14.12a.75.75 0 0 1-1.06-1.06l2.48-2.48H3a.75.75 0 0 1 0-1.5h8.394L8.914 7.085a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                  </svg>
                                </a>
                              ) : letter.tag ? (
                                <span className="text-[10px] text-accent-hover flex items-center gap-1.5 font-sans font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent-hover animate-pulse" />
                                  {letter.tag}
                                </span>
                              ) : (
                                <div />
                              )}
                              <button
                                onClick={() => setSelectedCertImage(letter.image)}
                                className="text-[11px] text-accent-hover hover:text-accent-light transition-colors font-medium flex items-center gap-1 cursor-pointer"
                              >
                                View Full Doc
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                  <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0L13.5 9.54a.75.75 0 0 1 0 1.06L9.975 14.12a.75.75 0 0 1-1.06-1.06l2.48-2.48H3a.75.75 0 0 1 0-1.5h8.394L8.914 7.085a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Lightbox for viewing full-size images */}
      {typeof document !== "undefined" && selectedCertImage && createPortal(
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-black/95 backdrop-blur-lg z-[10000] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out_forwards]"
          onClick={() => setSelectedCertImage(null)}
        >
          <button 
            onClick={() => setSelectedCertImage(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-white hover:bg-slate-800 transition-all cursor-pointer z-[10001]"
          >
            ✕
          </button>
          <div 
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center relative animate-[scaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedCertImage} 
              alt="High-resolution document preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-accent/20 shadow-2xl select-none"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default About;
