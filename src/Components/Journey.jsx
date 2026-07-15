import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "motion/react";

// Theme Configuration
// Theme state is now managed globally and passed from App.jsx

const THEMES = {
  purple: {
    textGradient: "from-purple-400 via-pink-500 to-blue-400",
    underlineGradient: "from-purple-500 to-pink-500",
    indicatorActive: "bg-purple-500 border border-purple-300 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
    cardBorderActive: "border-purple-500/40 shadow-[0_8px_30px_rgba(168,85,247,0.08)] -translate-y-1",
    cardBorderHover: "border-slate-800/80 laptop:hover:border-purple-500/25 laptop:hover:shadow-[0_8px_30px_rgba(168,85,247,0.04)] laptop:hover:-translate-y-1",
    cardGlow: "from-purple-500/0 via-purple-500/10 to-purple-500/0",
    institution: "text-purple-400/90",
    badgeBorder: "bg-purple-500/5 border border-purple-500/10",
    durationActive: "text-purple-200 bg-purple-500/20 border border-purple-400/30",
    durationInactive: "text-purple-300 bg-purple-500/5 border border-purple-500/15",
    iconColor: "text-purple-400",
    timelineGradient: "from-purple-500 via-pink-400 to-blue-400",
    timelineIconBorder: "border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.35)]",
    timelineShadow: "shadow-[0_0_8px_rgba(168,85,247,0.25)]"
  },
  blue: {
    textGradient: "from-blue-400 via-cyan-400 to-teal-400",
    underlineGradient: "from-blue-500 to-cyan-500",
    indicatorActive: "bg-cyan-400 border border-cyan-300 scale-125 shadow-[0_0_10px_rgba(34,211,238,0.8)]",
    cardBorderActive: "border-cyan-500/40 shadow-[0_8px_30px_rgba(34,211,238,0.08)] -translate-y-1",
    cardBorderHover: "border-slate-800/80 laptop:hover:border-blue-500/25 laptop:hover:shadow-[0_8px_30px_rgba(59,130,246,0.04)] laptop:hover:-translate-y-1",
    cardGlow: "from-cyan-500/0 via-cyan-500/5 to-cyan-500/0",
    institution: "text-blue-400/90",
    badgeBorder: "bg-blue-500/5 border border-blue-500/10",
    durationActive: "text-cyan-200 bg-cyan-500/20 border border-cyan-400/30",
    durationInactive: "text-cyan-300 bg-cyan-500/5 border border-cyan-500/15",
    iconColor: "text-cyan-400",
    timelineGradient: "from-blue-500 via-cyan-400 to-teal-400",
    timelineIconBorder: "border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.35)]",
    timelineShadow: "shadow-[0_0_8px_rgba(34,211,238,0.25)]"
  }
};

const TimelineItem = ({ title, institution, duration, details, delay, grade, viewportOffset, theme }) => {
  const triggerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Track the scroll progress of the trigger div instead of the card container
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: [`start ${viewportOffset || "50%"}`, `end ${viewportOffset || "50%"}`]
  });

  // Set active state when the card intersects the scroll trigger line
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsActive(latest > 0 && latest < 1);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative flex flex-col w-full"
    >
      {/* Invisible dummy trigger container starting at top-6 (aligned with circle indicator) */}
      <div ref={triggerRef} className="absolute top-6 bottom-0 left-0 right-0 pointer-events-none" />

      {/* Tiny circle indicator centered on the vertical line */}
      <div
        className={`absolute left-[-37px] top-6 w-2.5 h-2.5 rounded-full transition-all duration-300 z-10 ${isActive
            ? theme.indicatorActive
            : "bg-slate-900 border border-slate-700/60"
          }`}
      />

      {/* Glassmorphic Card */}
      <div
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className={`p-6 rounded-2xl bg-slate-950/40 backdrop-blur-md relative overflow-hidden transition-all duration-500 w-full select-none border ${isActive
            ? theme.cardBorderActive
            : theme.cardBorderHover
          } group`}
      >
        {/* Internal Glow */}
        <div
          className={`absolute -inset-px bg-gradient-to-r ${theme.cardGlow} transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 laptop:group-hover:opacity-100"
            }`}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              {title}
            </h4>
            <p className={`text-sm ${theme.institution} font-semibold tracking-wide mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1`}>
              <span>{institution}</span>
              {grade && (
                <>
                  <span className="text-slate-600 font-normal select-none">•</span>
                  <span className={`text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-md ${theme.badgeBorder} tracking-normal normal-case`}>
                    {grade}
                  </span>
                </>
              )}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full w-fit h-fit shrink-0 font-medium transition-colors duration-300 ${isActive
                ? theme.durationActive
                : theme.durationInactive
              }`}
          >
            {duration}
          </span>
        </div>

        <ul className="mt-4 text-xs sm:text-sm leading-relaxed list-disc pl-4 space-y-2 relative z-10">
          {details.map((detail, idx) => (
            <li
              key={idx}
              className={`transition-colors duration-300 ${isActive ? "text-slate-200" : "text-slate-400"
                }`}
            >
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Journey = ({ activeTheme = "purple" }) => {
  const theme = THEMES[activeTheme];
  const briefcaseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-4 h-4 ${theme.iconColor}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0a9.003 9.003 0 00-16.5 0m16.5 0L19.5 11.25H4.5L3.75 14.15M15 11.25V4.875A1.125 1.125 0 0013.875 3.75H10.125A1.125 1.125 0 009 4.875V11.25m6 0H9"
      />
    </svg>
  );

  const academicIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-4 h-4 ${theme.iconColor}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 017.368 5.832 50.707 50.707 0 00-2.658.813m-11.128 0A48.536 48.536 0 0012 11.25c2.107 0 4.14-.132 6.128-.388m-12.128 0L4 19.5"
      />
    </svg>
  );

  const [isMobile, setIsMobile] = useState(false);

  // Set up resize observer to dynamically switch viewport offsets for timeline tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1400);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use 50% (center) trigger for desktop side-by-side view, and 35% (upper-screen) trigger for stacked mobile/tablet view
  const viewportOffset = isMobile ? "35%" : "50%";

  const experienceRef = useRef(null);
  const educationRef = useRef(null);

  // Track scrolling of the items containers relative to the dynamic viewport trigger line
  const { scrollYProgress: expScrollYRaw } = useScroll({
    target: experienceRef,
    offset: [`start ${viewportOffset}`, `end ${viewportOffset}`]
  });

  const { scrollYProgress: eduScrollYRaw } = useScroll({
    target: educationRef,
    offset: [`start ${viewportOffset}`, `end ${viewportOffset}`]
  });

  // Use springs to smooth out the raw scroll progress on all viewports, especially mobile/tablet!
  const expScrollY = useSpring(expScrollYRaw, { stiffness: 80, damping: 25, mass: 0.2 });
  const eduScrollY = useSpring(eduScrollYRaw, { stiffness: 80, damping: 25, mass: 0.2 });

  // Map scroll progress to top offset of the floating icon, with a 5% buffer at start/end
  const expTop = useTransform(expScrollY, [0.05, 0.95], ["0%", "100%"]);
  const expHeight = useTransform(expScrollY, [0.05, 0.95], ["0%", "100%"]);

  const eduTop = useTransform(eduScrollY, [0.05, 0.95], ["0%", "100%"]);
  const eduHeight = useTransform(eduScrollY, [0.05, 0.95], ["0%", "100%"]);

  const experiences = [
    {
      title: "Freelancer (Web Developer & Video Editor)",
      institution: "Upwork, Twine, Open Dors",
      duration: "August 2023 - Present",
      details: [
        "Provide customized frontend web development solutions using React, JavaScript, and responsive design systems.",
        "Deliver professional video editing services, optimizing pacing, syncing audio tracks, and applying custom color grading.",
        "Collaborate with international clients to gather requirements, manage timelines, and deliver high-quality digital assets."
      ]
    },
    {
      title: "Web Developer",
      institution: "Golden Tree Enterprises",
      duration: "August 2025 - December 2025",
      details: [
        "Designed and built a modern, highly responsive website from scratch for this medium-scale business to enhance their online reach.",
        "Optimized page responsiveness, assets loading speeds, and overall SEO performance for better search visibility.",
        "Implemented smooth navigation, forms, and custom components to elevate user interaction and business conversion."
      ]
    },
    {
      title: "Web Developer Intern",
      institution: "Pinnacle Labs, Prodigy InfoTech, CODTECH IT SOLUTIONS",
      duration: "February 2025 - July 2025",
      details: [
        "Gained hands-on production experience building user-facing web pages and responsive layouts.",
        "Worked alongside design and engineering teams to transform UI wireframes into clean, standard code templates.",
        "Enhanced knowledge of version control systems, cross-browser compatibility, and modular codebase styling."
      ]
    }
  ];

  const educations = [
    {
      title: "Graduation (BCA)",
      institution: "College of Management and Technology",
      duration: "Completed in 2026",
      grade: "CGPA will be updated soon",
      details: [
        "Specialized in computer applications, programming paradigms, and software systems engineering.",
        "Gained hands-on experience in building relational databases, object-oriented software, and interactive web applications.",
        "Participated in practical code labs and collaborative projects to design digital interfaces and system frameworks."
      ]
    },
    {
      title: "Senior Secondary (Class XII)",
      institution: "ODM Public School",
      duration: "Completed in 2023",
      grade: "83.2%",
      details: [
        "Graduated with a strong academic aggregate of 83.2%.",
        "Subject Combination: Physics, Chemistry, Math, Computer, English, Painting.",
        "Acquired early foundations in logical thinking, data arrays, science methodologies, and creative arts."
      ]
    },
    {
      title: "Matriculation (Class X)",
      institution: "Chandra Sekhar Academy",
      duration: "Completed in 2021",
      grade: "80.6%",
      details: [
        "Graduated with an overall aggregate score of 80.6%.",
        "Engaged in science seminars, logic quizzes, and mathematical contests.",
        "Fostered essential analytical, computational, and problem-solving skills."
      ]
    }
  ];

  return (
    <section className="c-space pt-12 pb-32 md:pt-24 md:pb-56 flex flex-col justify-start w-full h-auto" id="journey">
      {/* Section Header */}
      <div className="text-center md:text-left mb-10 shrink-0">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
          My <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient}`}>Journey</span>
        </h2>
        <div className={`w-12 h-1 bg-gradient-to-r ${theme.underlineGradient} mt-2.5 mx-auto md:mx-0 rounded-full`} />
      </div>

      {/* Grid: Dual columns on large viewports, stacked on small viewports */}
      <div key={viewportOffset} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full mt-6">

        {/* Work Experience Column */}
        <div className="flex flex-col gap-8 relative">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 ml-4 flex items-center gap-2">
            <span>Work Experience</span>
          </h3>

          {/* Sub-container holding the items and the animated vertical line */}
          <div ref={experienceRef} className="relative pl-8 flex flex-col gap-8">

            {/* The vertical timeline track line */}
            <div className="absolute left-0 top-0 bottom-12 w-[2px] bg-slate-800/60 rounded-full">
              {/* Colorful gradient line that trails behind the icon */}
              <motion.div
                className={`absolute top-0 left-0 w-full bg-gradient-to-b ${theme.timelineGradient} origin-top rounded-full ${theme.timelineShadow}`}
                style={{ height: expHeight }}
              />
              {/* Floating scroll-driven icon */}
              <motion.div
                className={`absolute left-[-15px] w-8 h-8 rounded-full bg-[#05070f] flex items-center justify-center z-20 ${theme.timelineIconBorder}`}
                style={{ top: expTop, y: "-50%" }}
              >
                {briefcaseIcon}
              </motion.div>
            </div>

            {experiences.map((exp, idx) => (
              <TimelineItem
                key={`exp-${idx}`}
                title={exp.title}
                institution={exp.institution}
                duration={exp.duration}
                details={exp.details}
                delay={idx * 0.15}
                viewportOffset={viewportOffset}
                theme={theme}
              />
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="flex flex-col gap-8 relative mt-10 lg:mt-0">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 ml-4 flex items-center gap-2">
            <span>Education</span>
          </h3>

          {/* Sub-container holding the items and the animated vertical line */}
          <div ref={educationRef} className="relative pl-8 flex flex-col gap-8">

            {/* The vertical timeline track line */}
            <div className="absolute left-0 top-0 bottom-12 w-[2px] bg-slate-800/60 rounded-full">
              {/* Colorful gradient line that trails behind the icon */}
              <motion.div
                className={`absolute top-0 left-0 w-full bg-gradient-to-b ${theme.timelineGradient} origin-top rounded-full ${theme.timelineShadow}`}
                style={{ height: eduHeight }}
              />
              {/* Floating scroll-driven icon */}
              <motion.div
                className={`absolute left-[-15px] w-8 h-8 rounded-full bg-[#05070f] flex items-center justify-center z-20 ${theme.timelineIconBorder}`}
                style={{ top: eduTop, y: "-50%" }}
              >
                {academicIcon}
              </motion.div>
            </div>

            {educations.map((edu, idx) => (
              <TimelineItem
                key={`edu-${idx}`}
                title={edu.title}
                institution={edu.institution}
                duration={edu.duration}
                details={edu.details}
                grade={edu.grade}
                delay={idx * 0.15}
                viewportOffset={viewportOffset}
                theme={theme}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Journey;
