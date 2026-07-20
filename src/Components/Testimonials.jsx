import Lanyard from "./Lanyard";

const testimonialsData = [
  {
    name: "Shaktijit Rautaray",
    role: "Software Engineer @ Equifax",
    text: "Amit translates design systems into responsive React layouts with incredible accuracy. A true asset to any frontend team.",
    initials: "SR",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "SK Imdad Hussain",
    role: "Founder @ Golden Tree Enterprises",
    text: " Amit is a brilliant developer who brought our complex e-commerce interface to life.  He delivered our WebGL landing page ahead of schedule, with pixel-perfect details.",
    initials: "SK",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Hitesh More",
    role: "Head Lead @ Private Marketing Agency",
    text: "Working with Amit was an absolute pleasure. His consistencty and sincerity to the work is top notch.",
    initials: "HM",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Amlan Tripathy",
    role: "Associate Manager @ Sundaram Finance",
    text: "Amit is a very friendly person and a very good fast learning developer. He is very consistent to his field of work.",
    initials: "AT",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Chandrakant Nakhate",
    role: "Political Member @ BJP",
    text: "The video editing and visual effects Amit produced for our channels were spectacular. Creative, fast, and highly professional.",
    initials: "CN",
    gradient: "from-amber-500 to-purple-600",
  },
  {
    name: "Biswaranjan Kar",
    role: "Associate Manager @ Physics Wallah",
    text: "Amit is consistant learner and a very good developer. He is very adaptive to the new technology.",
    initials: "BK",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const TestimonialCard = ({ item, activeTheme }) => {
  const displayGradient = activeTheme === 'blue'
    ? item.gradient
        .replace(/purple/g, 'cyan')
        .replace(/pink/g, 'teal')
        .replace(/rose/g, 'blue')
        .replace(/amber/g, 'cyan')
        .replace(/indigo/g, 'teal')
    : item.gradient;

  return (
    <div className="w-[300px] sm:w-[350px] shrink-0 p-5 rounded-2xl bg-slate-950/80 border border-accent/5 hover:border-accent/25 transition-all duration-300 flex flex-col justify-between h-[180px] hover:scale-[1.02] shadow-md group/card">
      <div className="flex-1 flex flex-col justify-start">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-2.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.378 21.24c-1.005.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <p className="text-xs sm:text-[13px] text-slate-300 font-sans italic leading-relaxed line-clamp-3">
          "{item.text}"
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-accent/5">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${displayGradient} flex items-center justify-center text-white font-bold text-xs select-none shadow-md shrink-0`}>
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white truncate font-sans leading-tight group-hover/card:text-accent-hover transition-colors">
            {item.name}
          </p>
          <p className="text-[10px] text-slate-400 font-sans truncate font-medium">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({ activeTheme }) => {
  // Stagger rows: Row 1 has items 0, 1, 2; Row 2 has items 3, 4, 5 to create different starting offsets and a brick layout
  const row1 = [testimonialsData[0], testimonialsData[1], testimonialsData[2]];
  const row2 = [testimonialsData[3], testimonialsData[4], testimonialsData[5]];

  return (
    <section className="c-space py-12 md:py-24 flex flex-col justify-start w-full h-auto" id="testimonials">
      {/* Section Header */}
      <div className="text-center md:text-left mb-6 shrink-0">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
          Client <span className="theme-text-gradient">Testimonials</span>
        </h2>
        <div className="w-12 h-1 theme-underline-gradient mt-2.5 mx-auto md:mx-0 rounded-full" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-stretch w-full mt-6 md:mt-8">
        
        {/* Left Side: 3D Physics Lanyard Card (Less Width: col-span-4) */}
        <div className="hidden laptop:flex col-span-12 laptop:col-span-4 bg-[#0a0814]/40 border border-accent/10 rounded-3xl p-6 relative overflow-hidden flex-col justify-between items-center shadow-xl h-[550px] min-h-[500px] group hover:border-accent/20 hover:shadow-[0_10px_40px_-10px_var(--primary-glow)] transition-all duration-300">
          <div className="z-10 text-center w-full pointer-events-none">
            <span className="text-[10px] text-accent-hover font-sans tracking-widest uppercase font-semibold">
              Interactive Dev Tag
            </span>
            <h4 className="font-display text-lg font-bold text-white mt-1 uppercase tracking-wide">
              Amit's Interactive ID
            </h4>
          </div>
 
          {/* 3D Lanyard Canvas */}
          <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full overflow-hidden">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} cardHeight="h-full" />
          </div>
 
          <div className="z-10 text-center w-full select-none pointer-events-none">
            <p className="text-[10px] text-slate-500 font-sans uppercase tracking-widest">
              ✦ Grab & Drag the Badge ✦
            </p>
          </div>
        </div>
 
        {/* Right Side: Auto-Scrolling Testimonial Rows (More Width: col-span-8) */}
        <div className="col-span-12 laptop:col-span-8 bg-[#0a0814]/40 border border-accent/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-center overflow-hidden relative shadow-xl h-[550px] min-h-[500px] hover:border-accent/20 hover:shadow-[0_10px_40px_-10px_var(--primary-glow)] transition-all duration-300">
          <div className="z-10 mb-6 text-center">
            <span className="text-[10px] text-accent-hover font-sans tracking-widest uppercase font-semibold block">
              Client Feedbacks
            </span>
            <h4 className="font-display text-lg font-bold text-white mt-1 uppercase tracking-wide">
              Trusted by Collaborators
            </h4>
          </div>

          {/* Scrolling Tracks */}
          <div className="flex flex-col gap-6 w-full overflow-hidden relative z-10">
            
            {/* Row 1: Right to Left (Speed: 35s) */}
            <div className="w-full overflow-hidden">
              <div className="animate-marquee-left gap-6 py-2">
                {row1.map((item, idx) => (
                  <TestimonialCard key={`row1-${idx}`} item={item} activeTheme={activeTheme} />
                ))}
                {row1.map((item, idx) => (
                  <TestimonialCard key={`row1-dup-${idx}`} item={item} activeTheme={activeTheme} />
                ))}
              </div>
            </div>

            {/* Row 2: Right to Left Staggered (Speed: 42s) */}
            <div className="w-full overflow-hidden">
              <div className="animate-marquee-left-slow gap-6 py-2">
                {row2.map((item, idx) => (
                  <TestimonialCard key={`row2-${idx}`} item={item} activeTheme={activeTheme} />
                ))}
                {row2.map((item, idx) => (
                  <TestimonialCard key={`row2-dup-${idx}`} item={item} activeTheme={activeTheme} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;