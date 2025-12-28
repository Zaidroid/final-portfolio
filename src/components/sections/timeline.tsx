import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Database, Globe, Heart, Rocket, X, Zap, BarChart3, Cpu, ExternalLink, Lightbulb, Layout } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

// --- Types ---
type TimelineItemType = "job" | "project" | "workshop";

interface CardTheme {
    accent: string;
    accentLight: string;
    gradient: string;
    iconBg: string;
    pattern: React.ReactNode;
}

interface TimelineEntry {
    id: string;
    type: TimelineItemType;
    year: string;
    dateRange: string;
    title: string;
    org: string;
    desc: string;
    longDesc: string;
    icon: any;
    tags: string[];
    link?: string;
    isOngoing?: boolean;
    span?: string;
    theme: CardTheme;
}

// --- Unique Patterns for Each Card ---
const patterns = {
    // Startup/Tech Grid Lines
    gsg: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid-gsg" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-gsg)" className="text-blue-600" />
        </svg>
    ),
    // Tatreez-inspired geometric pattern
    tatreez: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="tatreez" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M12 0L24 12L12 24L0 12Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M12 6L18 12L12 18L6 12Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tatreez)" className="text-tatreez-red" />
        </svg>
    ),
    // Circuit/Manufacturing pattern
    circuit: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="circuit" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1" fill="currentColor" />
                    <path d="M5 5 L15 5 L15 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="15" cy="15" r="1" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className="text-amber-500" />
        </svg>
    ),
    // Data stream pattern
    data: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="data" width="16" height="16" patternUnits="userSpaceOnUse">
                    <rect x="2" y="2" width="2" height="2" fill="currentColor" />
                    <rect x="8" y="6" width="2" height="2" fill="currentColor" />
                    <rect x="12" y="10" width="2" height="2" fill="currentColor" />
                    <rect x="4" y="12" width="2" height="2" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#data)" className="text-emerald-500" />
        </svg>
    ),
    // Chart lines pattern
    chart: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="chart" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 30 L10 20 L20 25 L30 10 L40 15" fill="none" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="0.3" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chart)" className="text-rose-500" />
        </svg>
    ),
    // Archive/Document grid
    archive: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="archive" width="20" height="12" patternUnits="userSpaceOnUse">
                    <rect x="1" y="1" width="18" height="10" fill="none" stroke="currentColor" strokeWidth="0.3" rx="1" />
                    <line x1="4" y1="4" x2="16" y2="4" stroke="currentColor" strokeWidth="0.3" />
                    <line x1="4" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="0.3" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#archive)" className="text-indigo-500" />
        </svg>
    ),
    // Heart/Medical pattern
    medical: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="medical" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M12 8 C12 4, 8 4, 8 8 C8 12, 12 16, 12 16 C12 16, 16 12, 16 8 C16 4, 12 4, 12 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical)" className="text-pink-400" />
        </svg>
    ),
    // Rawabi Pattern
    rawabi: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="rawabi" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                    <path d="M 0 10 L 20 10 M 10 0 L 10 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rawabi)" className="text-violet-600" />
        </svg>
    ),
    // Web Dev / Layout pattern
    layout: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="layout" width="24" height="24" patternUnits="userSpaceOnUse">
                    <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
                    <line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="8" y1="8" x2="8" y2="22" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#layout)" className="text-cyan-500" />
        </svg>
    ),
};

// --- Unique Themes per Card ---
const themes: Record<string, CardTheme> = {
    gsg: {
        accent: "text-blue-500",
        accentLight: "text-blue-400",
        gradient: "from-blue-500/10 via-transparent to-transparent",
        iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
        pattern: patterns.gsg
    },
    "living-thob": {
        accent: "text-tatreez-red",
        accentLight: "text-tatreez-red/80",
        gradient: "from-tatreez-red/10 via-tatreez-red/5 to-transparent",
        iconBg: "bg-tatreez-red/10 dark:bg-tatreez-red/20",
        pattern: patterns.tatreez
    },
    "goethe-workshops": {
        accent: "text-amber-500",
        accentLight: "text-amber-400",
        gradient: "from-amber-500/10 via-transparent to-transparent",
        iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
        pattern: patterns.circuit
    },
    "pal-data": {
        accent: "text-emerald-500",
        accentLight: "text-emerald-400",
        gradient: "from-emerald-500/10 via-transparent to-transparent",
        iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
        pattern: patterns.data
    },
    palboard: {
        accent: "text-rose-500",
        accentLight: "text-rose-400",
        gradient: "from-rose-500/10 via-transparent to-transparent",
        iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
        pattern: patterns.chart
    },
    pacc: {
        accent: "text-indigo-500",
        accentLight: "text-indigo-400",
        gradient: "from-indigo-500/10 via-transparent to-transparent",
        iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
        pattern: patterns.archive
    },
    "hope-hand": {
        accent: "text-pink-500",
        accentLight: "text-pink-400",
        gradient: "from-pink-500/10 via-transparent to-transparent",
        iconBg: "bg-pink-500/10 dark:bg-pink-500/20",
        pattern: patterns.medical
    },
    rawabi: {
        accent: "text-violet-500",
        accentLight: "text-violet-400",
        gradient: "from-violet-500/10 via-transparent to-transparent",
        iconBg: "bg-violet-500/10 dark:bg-violet-500/20",
        pattern: patterns.rawabi
    },
    "gsg-web": {
        accent: "text-cyan-500",
        accentLight: "text-cyan-400",
        gradient: "from-cyan-500/10 via-transparent to-transparent",
        iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
        pattern: patterns.layout
    }
};

// --- Data (Grid: 3 cols, all fit perfectly) ---
const timelineData: TimelineEntry[] = [
    {
        id: "gsg",
        type: "job",
        year: "2025",
        dateRange: "Aug 2025 - Present",
        title: "Market Access Officer",
        org: "Gaza Sky Geeks",
        desc: "Supporting startups in highlighting Palestine's innovation ecosystem.",
        longDesc: "Leading strategic initiatives to connect Palestinian startups with global markets and venture capital. Designing market-entry frameworks and facilitating cross-border partnerships to expand the reach of the local innovation ecosystem.",
        icon: Rocket,
        tags: ["Strategy", "Partnerships", "Venture Capital"],
        isOngoing: true,
        span: "md:col-span-2", // Row 1: spans 2
        theme: themes.gsg
    },
    {
        id: "gsg-web",
        type: "project",
        year: "2025",
        dateRange: "2024 - Present",
        title: "GSG Platform Revamp",
        org: "Pro Bono Project",
        desc: "Modern digital presence & admin dashboard for Gaza Sky Geeks.",
        longDesc: "A complete overhaul of the Gaza Sky Geeks digital presence, built as a gift to the community. This project includes a high-performance public website and a custom administrative dashboard to streamline operations for the GSG team.",
        icon: Layout,
        tags: ["React", "Dashboard", "UI/UX", "Community"],
        link: "https://gsg.zaidlab.xyz",
        isOngoing: true,
        // Row 1: spans 1
        theme: themes["gsg-web"]
    },
    {
        id: "goethe-workshops",
        type: "workshop",
        year: "2024",
        dateRange: "2024 - 2025",
        title: "3D Printing Instructor",
        org: "Goethe Institute",
        desc: "Led workshops on additive manufacturing and parametric design.",
        longDesc: "Designed and delivered a comprehensive curriculum on 3D printing technologies and design thinking. Mentored students in creating their own functional prototypes using CAD tools and Prusa printers.",
        icon: Cpu,
        tags: ["Teaching", "CAD", "Manufacturing"],
        // Row 1: spans 1
        theme: themes["goethe-workshops"]
    },
    {
        id: "living-thob",
        type: "project",
        year: "2025",
        dateRange: "Aug 2025 - Aug 2026",
        title: "Living Thob",
        org: "Installation Art",
        desc: "Reimagining Palestinian heritage through digital fabrication & IoT.",
        longDesc: "A fusion of traditional Tatreez embroidery and modern digital fabrication. This installation uses 1,500 addressable LEDs and custom TPU 3D-printed grids to treat ancient motifs as dynamic digital pixels. It creates a breathing, living representation of heritage that reacts to presence.",
        icon: Zap,
        tags: ["IoT", "3D Printing", "Art", "Heritage"],
        link: "https://livingthob.zaidlab.xyz/",
        isOngoing: true,
        // Row 2: spans 1
        theme: themes["living-thob"]
    },
    {
        id: "pal-data",
        type: "project",
        year: "2024",
        dateRange: "2024 - Present",
        title: "Palestine Data Backend",
        org: "Open Source",
        desc: "Automated unified databank for humanitarian data.",
        longDesc: "Architected a robust, automated backend system that aggregates, cleans, and standardizes data from multiple humanitarian sources (UN, MoH, etc.). Provides a unified API for developers and researchers to access accurate, real-time data about Palestine.",
        icon: Database,
        tags: ["Python", "ETL", "API Design"],
        link: "https://github.com/Zaidroid/palestine-data-backend",
        isOngoing: true,
        // Row 2: spans 1
        theme: themes["pal-data"]
    },
    {
        id: "palboard",
        type: "project",
        year: "2023",
        dateRange: "Oct 2023 - Present",
        title: "Palestine Pulse",
        org: "Data Intelligence",
        desc: "Real-time data-driven insights on the crisis in Gaza.",
        longDesc: "An independent, open-source dashboard that visualizes the crisis in Gaza through interactive maps, casualty counters, and aid flow metrics. Serves as a critical source of truth for international observers.",
        icon: BarChart3,
        tags: ["Data Viz", "React", "Open Source"],
        link: "https://www.palboard.net/gaza",
        isOngoing: true,
        // Row 2: spans 1
        theme: themes.palboard
    },
    {
        id: "pacc",
        type: "job",
        year: "2020",
        dateRange: "Jan 2020 - July 2025",
        title: "Digitization Manager",
        org: "PACC",
        desc: "Spearheading digitized archive systems and national records.",
        longDesc: "Led the national digital transformation strategy for archival records. Digitized over 50,000 documents and implemented secure automated workflow systems. Managed a cross-functional team of 10 developers and archivists.",
        icon: Globe,
        tags: ["System Arch", "Digital Archives", "Team Lead"],
        span: "md:col-span-2", // Row 3: spans 2
        theme: themes.pacc
    },
    {
        id: "hope-hand",
        type: "project",
        year: "2019",
        dateRange: "2019",
        title: "Hope in Hand",
        org: "Medical Tech",
        desc: "Personalized, 3D-printed prosthetics covers.",
        longDesc: "Leveraging parametric design and 3D printing to create low-cost, highly personalized cosmetic covers for prosthetics. The goal is to restore confidence and agency to children injured in conflict, turning medical devices into superhero armor.",
        icon: Heart,
        tags: ["Parametric Design", "3D Print", "Medical"],
        link: "#",
        // Row 3: spans 1
        theme: themes["hope-hand"]
    },
    {
        id: "rawabi",
        type: "job",
        year: "2017",
        dateRange: "Oct 2017 - Aug 2019",
        title: "Innovation Strategist",
        org: "Rawabi City",
        desc: "Established business incubator & community engagement ecosystem.",
        longDesc: "Established an effective business incubator for tenants' startups & entrepreneurs with strong links to community engagement activities as well as global incubators and coworking spaces. As the leading strategist I planned & managed networking events & lectures at 'COnnect' (the project's coworking space), including 2 global annual events such as 'Forbes 30 under 30'. Partnered with the 'Massarak Tech' team to manage administrative processes including procurement, budgeting, & hiring.",
        icon: Lightbulb,
        tags: ["Strategy", "Incubation", "Community", "Events"],
        link: "http://co.city.rawabi.ps/",
        // Row 3: spans 1
        theme: themes.rawabi
    }
];

const skills = [
    "Python", "TypeScript", "React", "Docker", "Kubernetes", "Linux", "AI Agents", "LLMs", "IoT"
];

const filterOptions = [
    { id: "all", label: "All" },
    { id: "job", label: "Work" },
    { id: "project", label: "Projects" },
    { id: "workshop", label: "Workshops" }
];

// --- Spotlight Card ---
const SpotlightCard = React.forwardRef<HTMLDivElement, {
    item: TimelineEntry;
    index: number;
    onClick: () => void;
}>(({ item, index, onClick }, ref) => {
    const internalRef = useRef(null);
    const isInView = useInView(internalRef, { once: true, margin: "-30px" });
    const { theme } = item;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onClick={onClick}
            className={`
                group relative cursor-pointer overflow-hidden
                rounded-2xl min-h-[160px]
                bg-white/80 dark:bg-white/[0.03]
                border border-slate-200/70 dark:border-white/[0.06]
                backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:border-slate-300 dark:hover:border-white/[0.12]
                hover:shadow-lg dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)]
                hover:-translate-y-1
                ${item.span || ''}
            `}
        >
            {/* Unique Pattern Background */}
            {theme.pattern}

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-80`} />

            {/* Content */}
            <div className="relative z-10 p-5 h-full flex flex-col" ref={internalRef}>

                {/* Top Row */}
                <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${theme.iconBg} border border-white/10`}>
                        <item.icon className={`w-4 h-4 ${theme.accent}`} />
                    </div>

                    {item.isOngoing && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/60 dark:bg-white/10">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tatreez-red opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-tatreez-red"></span>
                            </span>
                            <span className="text-[9px] font-semibold text-slate-600 dark:text-white/60 uppercase">Active</span>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="mt-auto">
                    <span className={`text-[10px] font-mono ${theme.accentLight} uppercase tracking-wider`}>
                        {item.type} · {item.year}
                    </span>

                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mt-0.5 mb-0.5 line-clamp-1">
                        {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-white/50 mb-1.5">
                        {item.org}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed line-clamp-2">
                        {item.desc}
                    </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                    <div className={`p-1.5 rounded-full ${theme.iconBg}`}>
                        <ArrowUpRight className={`w-3 h-3 ${theme.accent}`} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
SpotlightCard.displayName = "SpotlightCard";

// --- Modal ---
function DetailModal({ item, onClose }: { item: TimelineEntry; onClose: () => void }) {
    const { theme } = item;
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <>
            {/* Backdrop - Click to close */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Modal Container - Centered */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                    mass: 0.8
                }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
                <div
                    ref={modalRef}
                    className="pointer-events-auto w-full max-w-3xl max-h-[90vh] overflow-hidden
                               rounded-3xl
                               bg-white dark:bg-[#0a0a0a]
                               border border-slate-200/80 dark:border-white/10
                               shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)]
                               relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Pattern Background */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                        {theme.pattern}
                    </div>

                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2.5 rounded-full 
                                   bg-white/80 dark:bg-white/10 
                                   hover:bg-white dark:hover:bg-white/20 
                                   text-slate-600 dark:text-white/80
                                   backdrop-blur-sm border border-slate-200/50 dark:border-white/10
                                   transition-all duration-200 hover:scale-105"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    {/* Header Section */}
                    <div className={`relative p-8 md:p-10 bg-gradient-to-br ${theme.gradient} border-b border-slate-100 dark:border-white/5`}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="flex items-start gap-5"
                        >
                            {/* Icon */}
                            <div className={`p-4 rounded-2xl ${theme.iconBg} border border-white/20 shadow-lg`}>
                                <item.icon className={`w-7 h-7 ${theme.accent}`} />
                            </div>

                            {/* Title Area */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                    <span className={`text-xs font-mono ${theme.accent} uppercase tracking-wider font-semibold`}>
                                        {item.type}
                                    </span>
                                    <span className="text-slate-300 dark:text-white/20">•</span>
                                    <span className="text-xs text-slate-500 dark:text-white/40">
                                        {item.dateRange}
                                    </span>
                                    {item.isOngoing && (
                                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tatreez-red/10 dark:bg-tatreez-red/20 text-tatreez-red text-xs font-semibold">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tatreez-red opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-tatreez-red"></span>
                                            </span>
                                            Active
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h2>

                                <p className={`text-lg font-medium ${theme.accent}`}>
                                    {item.org}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scrollable Body */}
                    <div className="relative flex-1 overflow-y-auto p-8 md:p-10 bg-white/50 dark:bg-transparent">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-8"
                        >
                            {/* Overview Section */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-slate-300 dark:bg-white/20"></span>
                                    Overview
                                </h4>
                                <p className="text-base md:text-lg text-slate-700 dark:text-white/80 leading-relaxed">
                                    {item.longDesc}
                                </p>
                            </div>

                            {/* Technologies Section */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-slate-300 dark:bg-white/20"></span>
                                    Technologies & Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, i) => (
                                        <motion.span
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.15 + i * 0.03 }}
                                            className={`${theme.iconBg} ${theme.accent} 
                                                       px-4 py-2 rounded-xl text-sm font-medium
                                                       border border-white/10`}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Year/Timeline Info */}
                            <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-white/5">
                                <div>
                                    <span className="text-xs text-slate-400 dark:text-white/40 uppercase tracking-wider">Year</span>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">{item.year}</p>
                                </div>
                                <div className="w-[1px] h-10 bg-slate-200 dark:bg-white/10"></div>
                                <div>
                                    <span className="text-xs text-slate-400 dark:text-white/40 uppercase tracking-wider">Category</span>
                                    <p className={`text-xl font-bold capitalize ${theme.accent}`}>{item.type}</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            {item.link && item.link !== "#" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Button
                                        onClick={() => window.open(item.link, '_blank')}
                                        size="lg"
                                        className={`w-full sm:w-auto px-8 py-6 text-base font-semibold
                                                   bg-slate-900 text-white hover:bg-slate-800 
                                                   dark:bg-white dark:text-black dark:hover:bg-slate-100
                                                   rounded-xl transition-all duration-200 hover:scale-[1.02]`}
                                    >
                                        <ExternalLink className="mr-2 h-5 w-5" />
                                        View Live Project
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export function Timeline() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedItem, setSelectedItem] = useState<TimelineEntry | null>(null);
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

    const filteredData = activeFilter === "all"
        ? timelineData
        : timelineData.filter(item => item.type === activeFilter);

    return (
        <section id="timeline" className="py-20 md:py-28 relative z-10 w-full">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 -left-32 w-80 h-80 bg-tatreez-red/[0.02] rounded-full blur-[80px]" />
            </div>

            <div className="container px-4 md:px-6 max-w-5xl mx-auto relative">

                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-3">
                        Career & Impact
                    </h2>
                    <p className="max-w-md mx-auto text-slate-500 dark:text-white/50 text-sm md:text-base">
                        Professional roles, deployed projects, and community initiatives.
                    </p>
                </motion.div>

                {/* Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex p-1 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/50 dark:border-white/[0.04]">
                        {filterOptions.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`
                                    relative px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                                    ${activeFilter === filter.id
                                        ? 'text-white'
                                        : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                                    }
                                `}
                            >
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="filterPill"
                                        className="absolute inset-0 bg-slate-900 dark:bg-white rounded-lg"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <span className={`relative z-10 ${activeFilter === filter.id ? 'dark:text-black' : ''}`}>
                                    {filter.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Bento Grid - 3 cols, perfectly filled */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((item, index) => (
                            <SpotlightCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Technical Expertise - Clean Text Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 pt-16 border-t border-slate-200/30 dark:border-white/[0.04]"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                            Technical Expertise
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-white/40 max-w-md mx-auto">
                            Core technologies in my daily workflow
                        </p>
                    </div>

                    {/* Skills as elegant text blocks */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 max-w-4xl mx-auto">
                        {[
                            { name: "Python", weight: "bold" },
                            { name: "TypeScript", weight: "bold" },
                            { name: "React", weight: "bold" },
                            { name: "Docker", weight: "normal" },
                            { name: "Kubernetes", weight: "normal" },
                            { name: "Linux", weight: "normal" },
                            { name: "AI Agents", weight: "bold" },
                            { name: "LLMs", weight: "bold" },
                            { name: "IoT", weight: "normal" },
                            { name: "3D Printing", weight: "normal" }
                        ].map((skill, i) => (
                            <motion.span
                                key={skill.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className={`
                                    text-lg md:text-xl lg:text-2xl
                                    ${skill.weight === 'bold'
                                        ? 'font-bold text-slate-900 dark:text-white'
                                        : 'font-medium text-slate-500 dark:text-white/50'
                                    }
                                    hover:text-tatreez-red dark:hover:text-tatreez-red
                                    transition-all duration-300 cursor-default
                                `}
                            >
                                {skill.name}
                            </motion.span>
                        ))}
                    </div>

                    {/* Subtle separator */}
                    <div className="flex justify-center items-center gap-3 mt-10">
                        <div className="w-12 h-[1px] bg-slate-200 dark:bg-white/10" />
                        <span className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest">
                            & more
                        </span>
                        <div className="w-12 h-[1px] bg-slate-200 dark:bg-white/10" />
                    </div>
                </motion.div>

            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <DetailModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
