import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const projectsData1 = [
    {
        id: 1,
        title: "Premium Watches Website",
        tag: "E-Commerce",
        image: "Images/Projects/Watch-Store.png",
        shortDesc: "A fully responsive, elegant, and modern e-commerce landing page showcasing Timex watch collections.",
        fullDesc: "A fully responsive, elegant, and modern e-commerce landing page showcasing Timex watch collections. Time-Vault features a dark and light theme, seamless interactive sliders, smooth scroll navigation, and a luxury-themed aesthetic tailored to captivate users.",
        features: [
            "Dynamic Theme Toggle",
            "Fully Responsive Design",
            "Micro-Animations & Hover Effects",
            "Swiper Integration",
            "Interactive Smooth Navigation",
            "Scroll-to-Top Action",
            "Professional E-Commerce Sections"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Swiper JS"],
        liveUrl: "https://time-vault-x.netlify.app",
        githubUrl: "https://github.com/Amit-Patra-04/Watches-Website-Timex-FW"
    },
    {
        id: 2,
        title: "Construction Enterprises",
        tag: "Business Showcase",
        image: "/Images/Projects/Construction.png",
        shortDesc: "An elegant, fully responsive, and modern multi-page landing website developed for Golden Tree Enterprises",
        fullDesc: "Rooted in Trust, Building Your Future. An elegant, fully responsive, and modern multi-page landing website developed for Golden Tree Enterprises, a premier construction and interior designing company based in Bhubaneswar, Odisha.",
        features: [
            "Responsive Design",
            "Dynamic Header Effect",
            "Intersection Observer Counters",
            "Infinite Running Slider",
            "Interactive Projects Showcase",
            "Web3Forms Integration",
            "Interactive FAQ Accordion",
            "Google Maps Integration",
            "Client Testimonial Carousel",
            "Partner Banner"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Web3Forms", "Google Map API"],
        liveUrl: "https://golden-tree.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/Construction-Golden-Tree-FW"
    },
    {
        id: 3,
        title: "Trekking Site",
        tag: "Tourism & Travel",
        image: "Images/Projects/Trekking.png",
        shortDesc: "A modern, responsive, and high-performance landing page designed for mountain trekking enthusiasts",
        fullDesc: "A modern, responsive, and high-performance landing page designed for mountain trekking enthusiasts. Developed with clean semantic HTML, modular vanilla CSS, and custom interactive JavaScript features, this portal integrates swiper carousels, smooth scroll-reveal effects, and an elegant dark/light theme toggle.",
        features: [
            "Dynamic Dark/Light Theme",
            "Fluid Responsive Layout",
            "ScrollReveal Animations",
            "Coverflow Discover Carousel",
            "Integrated Custom Video Player",
            "Interactive Place Cards",
            "Performance Optimized",
            "Scroll-Active Navigation",
            "Quick Scroll-to-Top"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Swiper JS", "ScrollReveal JS", "Remix Icon"],
        liveUrl: "https://peak-quest-trek.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/Mountain-Trek-Nomads-FW"
    }, {
        id: 4,
        title: "Plant Store",
        tag: "E-Commerce",
        image: "Images/Projects/Plant-store.png",
        shortDesc: "An elegant, fully responsive, and interactive multi-section landing page for a modern plant e-commerce shop called Plantex",
        fullDesc: "Plantex is a modern, fully responsive, and interactive multi-section landing page for a modern plant e-commerce shop. It features a sleek, elegant design with a focus on user experience and visual appeal.",
        features: [
            "Persistent Dark/Light Mode",
            "Fully Responsive Design",
            "ScrollReveal Animations",
            "Interactive FAQ Accordion",
            "Active Section Navigation",
            "Scroll Up Feature",
            "Custom Design Tokens"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "ScrollReveal JS", "Remix Icon", "Google Fonts"],
        liveUrl: "https://plant-store-plantex.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/Plants-Store-Ugaoo-FW"
    },
];

const projectsData2 = [
    {
        id: 1,
        title: "Soft Drinks Store",
        tag: "E-Commerce",
        image: "Images/Projects/Soft-Drinks.png",
        shortDesc: "A modern, highly interactive, and visually stunning single-page landing website showcasing emerging flavors, limited editions, and classic products.",
        fullDesc: "A modern, highly interactive, and visually stunning single-page landing website showcasing emerging flavors, limited editions, and classic products. Crafted with premium aesthetics, responsive layouts, smooth scroll-reveal animations, and swiper-powered product sliders.",
        features: [
            "Dynamic Hero Swiper Carousel",
            "Flavoured Category Grid",
            "Floating 3D Mascot",
            "Product Highlights (Trick or Treat)",
            "Dual-Carousel Galleries",
            "ScrollReveal Animations",
            "Fully Responsive Layout",
            "Interactive Navigation Menu"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Swiper JS", "ScrollReveal JS", "Box Icon", "Google Fonts"],
        liveUrl: "https://drinks-store.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/Drinks-Coca-Cola-FW"
    },
    {
        id: 2,
        title: "Schooling Website",
        tag: "Education",
        image: "Images/Projects/Schooling.png",
        shortDesc: "A modern, fully responsive, and feature-rich redesign concept for ODM Public School, Bhubaneswar.",
        fullDesc: "A modern, fully responsive, and feature-rich redesign concept for ODM Public School, Bhubaneswar. Designed and crafted with custom styling, interactive elements, and multi-page layouts.",
        features: [
            "Fully Responsive Design",
            "Multi-Page Layouts",
            "Micro-Animations & Hover Effects",
            "Interactive Map Integration",
            "Feedback & Inquiry Forms",
            "External Integrations"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Google Map API"],
        liveUrl: "https://odm-unofficial.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/ODM-Public-School-New-Website"
    },
    {
        id: 3,
        title: "Christmas Gift Store",
        tag: "E-Commerce",
        image: "Images/Projects/Christmas-Gift.png",
        shortDesc: "A beautiful, premium, and fully responsive multi-section landing page designed to celebrate the festive spirit.",
        fullDesc: "A beautiful, premium, and fully responsive multi-section landing page designed to celebrate the festive spirit. This project showcases an interactive web experience featuring modern layouts, smooth ScrollReveal animations, localized dark-mode caching, and a responsive shopping grid.",
        features: [
            "Dynamic Theme Toggle",
            "ScrollReveal Animations",
            "Fully Responsive Layout",
            "Interactive Shopping & Accessory Grid",
            "Interactive Gift Form",
            "Scroll-to-Top Navigation",
            "Smart Active Link Highlighting"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "BoxIcons", "ScrollReveal JS"],
        liveUrl: "https://christmas-gift-store.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/Christmas-Store-FW"
    },
    {
        id: 4,
        title: "Lamborghini",
        tag: "Automotive",
        image: "Images/Projects/Lamborghini.png",
        shortDesc: "A premium, interactive single-page web showcase dedicated to the legendary Lamborghini Aventador.",
        fullDesc: "A premium, interactive single-page web showcase dedicated to the legendary Lamborghini Aventador. Built with modern frontend development techniques, dynamic data visualization, and sleek dark-mode aesthetics, this project highlights the engineering, evolution, and technological milestones of Lamborghini's iconic V12 flagship.",
        features: [
            "Dynamic Hero Section",
            "Technical Specifications Carousel",
            "Evolution Timeline",
            "Performance Data Visualization",
            "Detaled Media Gallery"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Chart JS", "Remix Icon", "Google Fonts"],
        liveUrl: "https://lamborghini-aventador.netlify.app/",
        githubUrl: "https://github.com/Amit-Patra-04/Lamborghini-Aventador-Desc-FW"
    },
];

// const projectsData3 = [
//   {
//     id: 1,
//     title: "QuantumCrypt VPN",
//     tag: "Cybersecurity",
//     image: "/Images/quantum_crypt.png",
//     shortDesc: "A decentralized VPN client dashboard with quantum-resistant encryption protocols.",
//     fullDesc: "QuantumCrypt is a next-generation decentralized VPN client that runs quantum-resistant encryption handshakes compiled to WebAssembly. It offers multi-hop routing node visualization and active latency metrics in a sleek, cyber-inspired UI.",
//     features: [
//       "Quantum-resistant cryptography algorithms (Kyber and Dilithium)",
//       "Multi-hop routing nodes visualization on an interactive 3D map",
//       "Automatic kill-switch and zero-logs performance verification",
//       "High-speed WebRTC data channels for low-latency connections"
//     ],
//     tech: ["React", "Tailwind CSS", "Rust", "WebAssembly", "WebRTC", "Go"],
//     liveUrl: "https://example.com/quantumcrypt",
//     githubUrl: "https://github.com/example/quantumcrypt"
//   },
// ];

// Gather rows dynamically based on defined projectsDataX variables
const projectRows = [
    projectsData1,
    typeof projectsData2 !== 'undefined' ? projectsData2 : null,
    typeof projectsData3 !== 'undefined' ? projectsData3 : null,
    typeof projectsData4 !== 'undefined' ? projectsData4 : null
].filter(Boolean);

export default function Project({ activeTheme }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const rowRefs = useRef([]);

    // Close modal when pressing Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedProject(null);
            }
        };
        if (selectedProject) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Lock background scrolling
            if (window.lenis) {
                window.lenis.stop();
            }
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; // Restore scrolling
            if (window.lenis) {
                window.lenis.start();
            }
        };
    }, [selectedProject]);

    const scroll = (rowIndex, direction) => {
        const rowEl = rowRefs.current[rowIndex];
        if (rowEl) {
            const scrollAmount = direction === 'left' ? -380 : 380;
            rowEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const renderProjectCard = (project) => (
        <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 border border-white/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_var(--primary-glow)] overflow-hidden w-[290px] sm:w-[340px] h-[420px] sm:h-[440px] shrink-0"
            style={{
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Project Image & Tag */}
            <div className="relative overflow-hidden w-full aspect-video border-b border-white/10">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-black/60 text-accent-hover font-display font-medium text-[11px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {project.tag}
                </div>
            </div>

            {/* Project Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-accent-hover transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.shortDesc}
                    </p>
                </div>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                        <span
                            key={idx}
                            className="bg-white/5 border border-white/5 text-slate-300 font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="text-slate-500 font-mono text-[9px] sm:text-[10px] self-center">
                            +{project.tech.length - 4} more
                        </span>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 grid grid-cols-3 gap-2.5">
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative overflow-hidden flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-700 hover:border-transparent font-display text-xs font-semibold text-slate-300 hover:text-slate-950 transition-all duration-300 bg-white/5 hover:scale-105 active:scale-95"
                >
                    <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover/btn:scale-x-100 origin-right group-hover/btn:origin-left transition-transform duration-300 ease-out z-0" />
                    <span className="relative z-10 flex items-center gap-1">
                        Live
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </span>
                </a>

                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative overflow-hidden flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-700 hover:border-transparent font-display text-xs font-semibold text-slate-300 hover:text-slate-950 transition-all duration-300 bg-white/5 hover:scale-105 active:scale-95"
                >
                    <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover/btn:scale-x-100 origin-right group-hover/btn:origin-left transition-transform duration-300 ease-out z-0" />
                    <span className="relative z-10 flex items-center gap-1">
                        GitHub
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                        </svg>
                    </span>
                </a>

                <button
                    onClick={() => setSelectedProject(project)}
                    className="group/btn relative overflow-hidden flex items-center justify-center py-2 px-3 rounded-lg font-display text-xs font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer theme-btn-primary"
                >
                    <span className="relative z-10">Details</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-start px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 relative select-none">
            {/* Section Header */}
            <div className="text-center md:text-left mb-6 shrink-0">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
                    Featured <span className="theme-text-gradient">Projects</span>
                </h2>
                <div className="w-12 h-1 theme-underline-gradient mt-2.5 mx-auto md:mx-0 rounded-full" />
            </div>

            {/* Rows of Horizontally Scrollable Projects */}
            <div className="space-y-8 relative pb-6">
                {projectRows.map((rowProjects, rowIndex) => (
                    <div key={rowIndex} className="relative group/row shrink-0 laptop:px-12">
                        {/* Left Navigation Arrow */}
                        <button
                            onClick={() => scroll(rowIndex, 'left')}
                            className="absolute left-2 laptop:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white hover:bg-slate-900 hover:border-accent/50 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 invisible laptop:visible opacity-0 laptop:opacity-100 group-hover/row:visible group-hover/row:opacity-100 focus:visible focus:opacity-100"
                            aria-label={`Scroll left row ${rowIndex + 1}`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Scrollable Container */}
                        <div
                            ref={(el) => (rowRefs.current[rowIndex] = el)}
                            className="flex gap-6 overflow-x-auto no-scrollbar py-3 px-1 w-full shrink-0"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {rowProjects.map(renderProjectCard)}
                        </div>

                        {/* Right Navigation Arrow */}
                        <button
                            onClick={() => scroll(rowIndex, 'right')}
                            className="absolute right-2 laptop:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white hover:bg-slate-900 hover:border-accent/50 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 invisible laptop:visible opacity-0 laptop:opacity-100 group-hover/row:visible group-hover/row:opacity-100 focus:visible focus:opacity-100"
                            aria-label={`Scroll right row ${rowIndex + 1}`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Detailed Description Popup Modal */}
            {typeof document !== "undefined" && selectedProject && createPortal(
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out_forwards]"
                    onClick={() => setSelectedProject(null)}
                >
                    {/* Modal Content Card */}
                    <div
                        data-lenis-prevent
                        className="relative bg-slate-950/95 border border-white/10 rounded-2xl w-[90vw] max-w-[1440px] h-auto max-h-[85vh] max-h-[850px] overflow-y-auto p-5 sm:p-8 md:p-10 shadow-2xl animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card body
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                            aria-label="Close details"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Layout Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-4">
                            {/* Left Column: Title, Info, Description, Features */}
                            <div className="lg:col-span-7 space-y-6">
                                <div>
                                    <span className="text-accent-hover font-display font-semibold text-xs tracking-wider uppercase">
                                        {selectedProject.tag}
                                    </span>
                                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                                        {selectedProject.title}
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                                        Project Overview
                                    </h4>
                                    <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                                        {selectedProject.fullDesc}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                                        Key Features
                                    </h4>
                                    <ul className="space-y-2 text-slate-400 font-sans text-xs sm:text-sm">
                                        {selectedProject.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 animate-pulse" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column: Hero Image, Tech Stack, Links */}
                            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                                <div className="rounded-xl overflow-hidden border border-white/10 w-full aspect-video bg-slate-950/60">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
                                        Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-accent/10 border border-accent/10 text-accent-hover font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Final CTA Buttons */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/cta relative overflow-hidden flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-accent/30 hover:border-transparent font-display text-sm font-bold text-slate-200 hover:text-slate-950 transition-all duration-300 bg-white/5 hover:scale-105 active:scale-95"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover/cta:scale-x-100 origin-right group-hover/cta:origin-left transition-transform duration-300 ease-out z-0" />
                                        <span className="relative z-10 flex items-center gap-1.5">
                                            Live View
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </span>
                                    </a>

                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/cta relative overflow-hidden flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-700/80 hover:border-transparent font-display text-sm font-bold text-slate-300 hover:text-slate-950 transition-all duration-300 bg-white/5 hover:scale-105 active:scale-95"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover/cta:scale-x-100 origin-right group-hover/cta:origin-left transition-transform duration-300 ease-out z-0" />
                                        <span className="relative z-10 flex items-center gap-1.5">
                                            Source Code
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/cta:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
