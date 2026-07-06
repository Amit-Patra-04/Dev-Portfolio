import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const words = [
    "INTERACTIVE USER INTERFACES",
    "MODERN REACT APPLICATIONS",
    "PIXEL-PERFECT DESIGN SYSTEMS",
    "HIGH-PERFORMANCE WEB EXPERIENCES"
];

const BlueprintGrid = () => {
    return (
        <svg
            className="absolute w-[160%] h-[160%] pointer-events-none opacity-40 z-0 select-none animate-[spin_120s_linear_infinite]"
            viewBox="0 0 500 500"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.35))' }}
        >
            {/* Outer rotating dashed circles */}
            <circle cx="250" cy="250" r="220" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="250" cy="250" r="200" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="40 10 10 10" />

            {/* Solid grid circles */}
            <circle cx="250" cy="250" r="170" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
            <circle cx="250" cy="250" r="130" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="250" cy="250" r="90" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1" />

            {/* Axis Lines with tick marks */}
            <line x1="250" y1="10" x2="250" y2="490" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="10" y1="250" x2="490" y2="250" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="6 6" />

            {/* Technical marks & coordinates */}
            <text x="265" y="80" fill="rgba(255, 255, 255, 0.3)" fontSize="7" fontFamily="monospace" letterSpacing="1.5">SYS.LOC: IN-REM</text>
            <text x="265" y="430" fill="rgba(255, 255, 255, 0.3)" fontSize="7" fontFamily="monospace" letterSpacing="1.5">ROTATION: 360°</text>
            <text x="75" y="242" fill="rgba(255, 255, 255, 0.2)" fontSize="6" fontFamily="monospace">R-170</text>
            <text x="115" y="242" fill="rgba(255, 255, 255, 0.2)" fontSize="6" fontFamily="monospace">R-130</text>

            {/* Corner crosshairs */}
            <path d="M 40 40 L 40 20 L 20 40" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            <path d="M 460 40 L 460 20 L 480 40" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            <path d="M 40 460 L 40 480 L 20 460" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            <path d="M 460 460 L 460 480 L 480 460" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />

            {/* Inner tick circles */}
            <path d="M 250 20 L 250 30 M 250 470 L 250 480 M 20 250 L 30 250 M 470 250 L 480 250" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        </svg>
    );
};

const Hero = ({ isLoaded }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const wordRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimationDone, setIsAnimationDone] = useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth < 1400 : false;
    });

    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    // Entrance animation trigger
    useEffect(() => {
        if (isLoaded) {
            const container = containerRef.current;
            if (!container) return;

            // Bypass intro animations on mobile/tablet viewports (< 1400px width)
            const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1400;
            if (isMobileOrTablet) {
                setIsAnimationDone(true);
                gsap.set(container, { visibility: 'visible' });
                return;
            }

            const title = container.querySelector('.hero-title');
            const badge = container.querySelector('.hero-badge');
            const desc = container.querySelector('.hero-desc');
            const buttons = container.querySelectorAll('.hero-btn');
            const socials = container.querySelectorAll('.hero-social-btn');
            const img = imageRef.current;

            // Set initial states
            gsap.set([title, badge, desc, buttons, socials], { opacity: 0, y: 30 });
            gsap.set(img, { opacity: 0, scale: 0.92, rotate: -2 });
            gsap.set(container, { visibility: 'visible' });

            const tl = gsap.timeline({
                onComplete: () => {
                    setIsAnimationDone(true);
                }
            });

            tl.to(img, {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: 'power3.out'
            });

            tl.to(badge, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.7');

            tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.7');

            tl.to(desc, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.5');

            tl.to(buttons, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4');

            tl.to(socials, {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: 'power3.out'
            }, '-=0.4');
        }
    }, [isLoaded]);

    // Clean GSAP inline styles only after React has finished rendering the completed state to avoid blinking
    useEffect(() => {
        if (isAnimationDone) {
            const container = containerRef.current;
            if (!container) return;

            const title = container.querySelector('.hero-title');
            const badge = container.querySelector('.hero-badge');
            const desc = container.querySelector('.hero-desc');
            const buttons = container.querySelectorAll('.hero-btn');
            const socials = container.querySelectorAll('.hero-social-btn');
            const img = imageRef.current;

            gsap.set([title, badge, desc, buttons, socials, img], { clearProps: 'all' });
        }
    }, [isAnimationDone]);

    // Infinite word rotator loop
    useEffect(() => {
        if (!isLoaded) return;

        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % words.length;

            const tl = gsap.timeline();

            // Slide old word out upwards
            tl.to(wordRef.current, {
                y: -35,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    // Update text in state
                    setCurrentIndex(nextIndex);
                    setCurrentWord(words[nextIndex]);

                    // Reset position to bottom
                    gsap.set(wordRef.current, { y: 35 });
                }
            });

            // Slide new word in from bottom to center
            tl.to(wordRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(1.5)'
            });

        }, 3200);

        return () => clearInterval(interval);
    }, [currentIndex, isLoaded]);

    return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 laptop:grid-cols-12 items-center gap-8 laptop:gap-10 w-full max-w-7xl px-4 md:px-0 pt-28 pb-12 laptop:pt-36 laptop:pb-16 mx-auto relative z-10 select-none text-center laptop:text-left"
      style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
    >
      {/* Left Column: Text Content */}
      <div className="laptop:col-span-7 space-y-6 flex flex-col items-center laptop:items-start">
                {/* Project Availability Badge */}
                <div className={`hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-display text-[11px] sm:text-xs tracking-wide ${!isAnimationDone ? 'opacity-0' : ''}`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                    <span>Available for Projects ( Remote / Freelance )</span>
                </div>

                {/* Dynamic Punchline */}
        <h1 className={`hero-title font-display text-2xl sm:text-3xl md:text-4xl laptop:text-5xl font-extrabold text-white leading-[1.2] tracking-tight uppercase ${!isAnimationDone ? 'opacity-0' : ''}`}>
          Shaping Code & Design Into <br />
          <span className="inline-block relative overflow-hidden align-bottom h-[1.15em] transition-all duration-300">
            <span ref={wordRef} className="inline-block theme-text-gradient text-center laptop:text-left">
              {currentWord}
            </span>
          </span>
        </h1>

                {/* Description */}
                <p className={`hero-desc text-slate-400 text-xs sm:text-sm md:text-base max-w-xl font-normal leading-relaxed ${!isAnimationDone ? 'opacity-0' : ''}`}>
                    I am a versatile tech professional focused on creating seamless, production-ready digital experiences with a strong emphasis on clean architecture, performance optimization, responsive design, and efficient development practices. From crafting visually engaging interfaces to integrating AI-driven functionalities and managing reliable cloud-native environments, I aim to deliver innovative and impactful solutions that enhance both functionality and user experience.
                </p>

        <div className="flex flex-wrap items-center justify-center laptop:justify-start gap-4 pt-2">
                    <a
                        href="mailto:k2amitpatra@gmail.com"
                        className={`hero-btn group relative overflow-hidden px-8 py-3 rounded-xl font-display font-semibold text-white transform hover:-translate-y-1 hover:scale-105 active:scale-95 theme-btn-primary ${isAnimationDone ? 'transition-all duration-300' : 'opacity-0 !transition-none'}`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Let's Connect
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        {/* Shimmer gradient fill on hover */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </a>

                    <a
                        href="Images/Resume.pdf"
                        download
                        className={`hero-btn group relative overflow-hidden px-8 py-3 rounded-xl font-display font-semibold text-slate-300 border border-slate-700/80 hover:text-slate-950 hover:border-transparent transform hover:-translate-y-1 hover:scale-105 active:scale-95 bg-white/5 ${isAnimationDone ? 'transition-all duration-300' : 'opacity-0 !transition-none'}`}
                    >
                        {/* Sweep fill element - Horizontal sweep from left, exits to right */}
                        <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-out z-0" />
                        <span className="relative z-10 flex items-center gap-2">
                            Resume
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </span>
                    </a>
                </div>

        <div className="flex items-center justify-center laptop:justify-start gap-4 pt-4">
                    <a
                        href="https://github.com/Amit-Patra-04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hero-social-btn group relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_var(--btn-shadow-light)] hover:scale-110 hover:-translate-y-1 ${isAnimationDone ? 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 !transition-none'}`}
                        aria-label="GitHub"
                    >
                        <span className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-color)] to-[var(--accent-hover)] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0" />
                        <svg className="w-5 h-5 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-6 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                        </svg>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/k-amit-patra/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hero-social-btn group relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_var(--btn-shadow-light)] hover:scale-110 hover:-translate-y-1 ${isAnimationDone ? 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 !transition-none'}`}
                        aria-label="LinkedIn"
                    >
                        <span className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-color)] to-[var(--accent-hover)] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0" />
                        <svg className="w-5 h-5 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                    </a>

                    <a
                        href="https://x.com/amyth_04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hero-social-btn group relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_var(--btn-shadow-light)] hover:scale-110 hover:-translate-y-1 ${isAnimationDone ? 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'opacity-0 !transition-none'}`}
                        aria-label="X"
                    >
                        <span className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-color)] to-[var(--accent-hover)] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0" />
                        <svg className="w-4 h-4 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-6 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </div>
            </div>

      {/* Right Column: User Photo & Technical Blueprint Grid */}
      <div className="laptop:col-span-5 flex justify-center laptop:justify-end items-center relative w-full h-[380px] sm:h-[460px] md:h-[520px] laptop:h-[600px]">
                {/* Glow backlight behind blueprint */}
                <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] bg-white/5 rounded-full blur-[70px] pointer-events-none z-0" />

                {/* Blueprint Tech Grid */}
                <BlueprintGrid />

                {/* Developer Image Card - Wrapper for entrance animation */}
                <div ref={imageRef} className={`relative z-10 flex items-center justify-center ${!isAnimationDone ? 'opacity-0' : ''}`}>
                    {/* Card Container for 3D Tilt interaction */}
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
            className="w-[280px] h-[340px] sm:w-[340px] sm:h-[420px] md:w-[390px] md:h-[480px] laptop:w-[440px] laptop:h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-200 ease-out cursor-pointer relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                            backdropFilter: 'blur(8px)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
            <img
              src="Images/Hero.png"
              alt="Developer portrait"
              className="w-full h-full object-cover laptop:grayscale laptop:hover:grayscale-0 transition-all duration-700 ease-out"
            />

                        {/* Tech Corner Brackets on the frame */}
                        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/60 pointer-events-none" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/60 pointer-events-none" />

                        {/* Glass Overlay Border */}
                        <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
