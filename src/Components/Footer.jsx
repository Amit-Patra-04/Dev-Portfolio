import { motion } from "motion/react";

const Footer = ({ activeTheme = "purple", setActiveTheme }) => {
  const currentYear = 2025;

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Amit-Patra-04",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/k-amit-patra/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/amyth_04",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-8 z-20 relative select-none">
      <div className="c-space flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright info */}
        <p className="text-xs text-slate-500 font-sans text-center sm:text-left">
          &copy; {currentYear} <span className="text-white font-medium">K Amit Patra</span>. All rights reserved.
        </p>

        {/* Dynamic Theme Toggle Pill Switch */}
        {setActiveTheme && (
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-white/5 p-1 rounded-full text-xs shadow-inner shrink-0 relative z-20">
            <button 
              onClick={() => setActiveTheme('purple')} 
              className={`px-3 py-1 rounded-full font-display font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer text-[9px] ${
                activeTheme === 'purple' 
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.15)] font-semibold' 
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
              Purple
            </button>
            <button 
              onClick={() => setActiveTheme('blue')} 
              className={`px-3 py-1 rounded-full font-display font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer text-[9px] ${
                activeTheme === 'blue' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_12px_rgba(34,211,238,0.15)] font-semibold' 
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
              Blue
            </button>
          </div>
        )}

        {/* Social Icons links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-slate-950/60 border border-accent/10 hover:border-accent/35 hover:bg-accent/5 text-slate-400 hover:text-accent-hover transition-all flex items-center justify-center cursor-pointer shadow-md"
              aria-label={`Visit my ${social.name}`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
