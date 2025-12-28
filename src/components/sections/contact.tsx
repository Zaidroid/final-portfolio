import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Send, MapPin, Clock, ArrowUpRight, Github } from "lucide-react";
import { useRef, useState } from "react";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const [formState, setFormState] = useState({ email: '', message: '' });

    const socialLinks = [
        {
            icon: Mail,
            label: "Email",
            value: "zaidsalem@live.com",
            href: "mailto:zaidsalem@live.com",
            color: "hover:text-tatreez-red"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: "/in/zaidsalem",
            href: "https://linkedin.com/in/zaidsalem",
            color: "hover:text-blue-500"
        },
        {
            icon: Github,
            label: "GitHub",
            value: "/Zaidroid",
            href: "https://github.com/Zaidroid",
            color: "hover:text-slate-900 dark:hover:text-white"
        }
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 md:py-32 relative z-10 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-tatreez-red/[0.02] rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 md:px-6 max-w-5xl mx-auto relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-16"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            Let's <span className="text-tatreez-red">Create</span> Impact.
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-white/50 max-w-xl mx-auto">
                            Open for collaborations on AI, Humanitarian Tech, and Digital Infrastructure.
                        </p>
                    </motion.div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Left: Contact Links */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-slate-300 dark:bg-white/20"></span>
                                    Get in Touch
                                </h3>

                                <div className="space-y-4">
                                    {socialLinks.map((link, i) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className={`group flex items-center justify-between p-4 rounded-xl
                                                       bg-white/50 dark:bg-white/[0.03]
                                                       border border-slate-200/60 dark:border-white/[0.06]
                                                       hover:border-slate-300 dark:hover:border-white/[0.12]
                                                       transition-all duration-300 cursor-pointer`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.05]">
                                                    <link.icon className="w-5 h-5 text-slate-600 dark:text-white/60" />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 dark:text-white/40 uppercase tracking-wider">
                                                        {link.label}
                                                    </span>
                                                    <p className={`text-base md:text-lg font-medium text-slate-800 dark:text-white ${link.color} transition-colors`}>
                                                        {link.value}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/30 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Location Info */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.04]"
                            >
                                <div className="flex items-center gap-2 text-slate-500 dark:text-white/50">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">Ramallah, Palestine</span>
                                </div>
                                <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10" />
                                <div className="flex items-center gap-2 text-slate-500 dark:text-white/50">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">GMT+2</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Contact Form */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-slate-300 dark:bg-white/20"></span>
                                Send a Message
                            </h3>

                            <form
                                className="space-y-6"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={formState.email}
                                            onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                                            className="w-full bg-white/50 dark:bg-white/[0.03] 
                                                       border border-slate-200 dark:border-white/[0.08] 
                                                       rounded-xl px-4 py-4 
                                                       text-slate-900 dark:text-white 
                                                       placeholder:text-slate-400 dark:placeholder:text-white/30 
                                                       focus:outline-none focus:border-tatreez-red dark:focus:border-tatreez-red
                                                       focus:ring-2 focus:ring-tatreez-red/10
                                                       transition-all duration-200"
                                            placeholder="Your email"
                                        />
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            value={formState.message}
                                            onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                                            rows={5}
                                            className="w-full bg-white/50 dark:bg-white/[0.03] 
                                                       border border-slate-200 dark:border-white/[0.08] 
                                                       rounded-xl px-4 py-4 
                                                       text-slate-900 dark:text-white 
                                                       placeholder:text-slate-400 dark:placeholder:text-white/30 
                                                       focus:outline-none focus:border-tatreez-red dark:focus:border-tatreez-red
                                                       focus:ring-2 focus:ring-tatreez-red/10
                                                       transition-all duration-200 resize-none"
                                            placeholder="What's on your mind?"
                                        />
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full py-6 text-base font-semibold
                                                   bg-slate-900 text-white hover:bg-tatreez-red
                                                   dark:bg-white dark:text-black dark:hover:bg-tatreez-red dark:hover:text-white
                                                   rounded-xl transition-all duration-300"
                                    >
                                        Send Message
                                        <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>

                    </div>

                    {/* Footer */}
                    <motion.footer
                        variants={itemVariants}
                        className="mt-8 pt-8 border-t border-slate-200/50 dark:border-white/[0.04]"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-tatreez-red/10 flex items-center justify-center">
                                    <span className="text-tatreez-red font-bold text-sm">ZS</span>
                                </div>
                                <span className="text-sm text-slate-500 dark:text-white/40">
                                    © 2025 Zaid Salem
                                </span>
                            </div>

                            <p className="text-xs text-slate-400 dark:text-white/30 font-mono">
                                Designed & built with purpose
                            </p>
                        </div>
                    </motion.footer>

                </motion.div>
            </div>
        </section>
    );
}
