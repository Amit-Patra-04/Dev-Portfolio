import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyEmailButton from "./CopyEmailButton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Client Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFormStatus("error");
      setErrorMessage("Please fill in all mandatory fields.");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "",
          name: formData.name,
          email: formData.email,
          phone: formData.mobile, // Maps optional mobile number to phone
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="c-space py-12 md:py-24 flex flex-col justify-start w-full h-auto" id="contact">
      {/* Section Header */}
      <div className="text-center md:text-left mb-6 shrink-0">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
          Contact <span className="theme-text-gradient">Me</span>
        </h2>
        <div className="w-12 h-1 theme-underline-gradient mt-2.5 mx-auto md:mx-0 rounded-full" />
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full mt-6 md:mt-8">
        
        {/* Left Side: Contact Information Cards (col-span-5) */}
        <div className="col-span-12 lg:col-span-5 bg-[var(--grid-bg)] backdrop-blur-md border border-accent/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-between items-start gap-8 shadow-xl">
          <div className="space-y-4">
            <span className="text-[10px] text-accent-hover font-sans tracking-widest uppercase font-semibold">
              Get in Touch
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">
              Let's build something epic together
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Have a project concept, work opportunity, or questions? Leave a message, and I'll respond as soon as possible.
            </p>
          </div>

          <div className="space-y-6 w-full">
            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-accent/5 hover:border-accent/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-hover">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">Location</p>
                <p className="text-sm text-white font-sans font-medium mt-0.5">Bhubaneswar, Odisha, India</p>
              </div>
            </div>

            {/* Email Address details */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-accent/5 hover:border-accent/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-hover">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold">Email</p>
                <p className="text-sm text-white font-sans font-medium mt-0.5">k2amitpatra@gmail.com  </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-start pt-2">
            <CopyEmailButton />
          </div>
        </div>

        {/* Right Side: Interactive Form Card (col-span-7) */}
        <div className="col-span-12 lg:col-span-7 bg-[var(--grid-bg)] backdrop-blur-md border border-accent/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-xl min-h-[500px]">
          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-slate-400 font-sans max-w-sm">
                  Thank you for reaching out. Your message has been received, and I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="px-6 py-2.5 rounded-xl border border-accent/20 bg-accent/10 text-accent-hover hover:bg-accent/20 hover:text-white transition-all font-display text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col justify-between gap-6"
              >
                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-semibold">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-slate-950/60 border border-accent/10 focus:border-accent/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-accent/5 font-sans"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-semibold">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-slate-950/60 border border-accent/10 focus:border-accent/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-accent/5 font-sans"
                    />
                  </div>

                  {/* Phone (Mobile Number) Input - Optional */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-semibold">
                      Mobile Number <span className="text-slate-500 text-[9px] font-normal lowercase italic">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-950/60 border border-accent/10 focus:border-accent/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-accent/5 font-sans"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-semibold">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Discussion"
                      required
                      className="w-full bg-slate-950/60 border border-accent/10 focus:border-accent/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-accent/5 font-sans"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-semibold">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project concept, timelines, or key questions..."
                    required
                    className="w-full bg-slate-950/60 border border-accent/10 focus:border-accent/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-accent/5 resize-none font-sans leading-relaxed"
                  />
                </div>

                {/* Submit button & Error notice */}
                <div className="flex flex-col items-center justify-center gap-4 pt-2 w-full">
                  <AnimatePresence>
                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-xs text-rose-400 font-sans font-medium flex items-center gap-1.5 justify-center"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-center w-full">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full sm:w-auto relative group/submit overflow-hidden flex items-center justify-center gap-2 py-3 px-8 rounded-xl theme-btn-primary text-white font-display text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer animate-[fadeIn_0.3s]"
                    >
                      {formStatus === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Submit Message
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Contact;
