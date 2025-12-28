import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowDown, Code2, Layers, Terminal } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// --- Cycling Scramble Text Component ---
const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CyclingScrambleText = ({ phrases, className }: { phrases: string[], className?: string }) => {
    const [display, setDisplay] = useState(phrases[0]);
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Cycle index
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % phrases.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [phrases.length]);

    // Scramble on index change
    useEffect(() => {
        const newText = phrases[index];
        let iter = 0;

        // We can't easily access 'display.length' here without adding it as dependency,
        // which causes the loop. But we know the previous text should be phrases[prevIndex].
        // However, instead of tracking prev, we can just assume starting length is current display length.
        // To do this safely without deps, we can use a functional state update to get length ONCE? 
        // No, we need it for the interval logic.
        // Improved approach: just use a vastly sufficient max length or track current length in ref.

        const length = newText.length; // We target this length.
        // If we are shrinking, we might need to handle the tail. 
        // But for simplicity and stability, let's just scramble to the new text length directly.
        // If the old text was longer, it will just snap. 
        // To make it smoother (handle differing lengths), we should ideally fade/cut.
        // But for now, fixing the loop is priority. 
        // Let's use a "max width" strategy or just simple replacement.

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(prev => {
                const targetLen = Math.max(prev.length, newText.length);
                return Array.from({ length: targetLen }).map((_, i) => {
                    if (i < iter) return newText[i] || "";
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("");
            });

            if (iter >= newText.length + 5) { // Ensure we clear nicely
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplay(newText); // Ensure final state is clean
            }
            iter += 1;
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [index, phrases]); // Only re-run when index changes

    return (
        <span className={className}>
            {display}
        </span>
    );
};

// --- New Interactive Components ---

function SpotlightTitle() {
    const titleRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            if (!titleRef.current) return;
            const { left, top } = titleRef.current.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={titleRef}
            className="group relative flex items-center justify-center cursor-default bg-transparent px-4 py-2"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Base Text */}
            <h1 className="relative z-10 text-6xl md:text-9xl font-black tracking-tighter text-foreground/20 select-none">
                ZAID<span className="text-tatreez-red/20">.</span>SALEM
            </h1>

            {/* Spotlight Overlay */}
            <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                }}
            >
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground select-none">
                    ZAID<span className="text-tatreez-red">.</span>SALEM
                </h1>
            </motion.div>
        </motion.div>
    );
}

function MagneticButton({ children, className, onClick, variant = "solid" }: { children: React.ReactNode, className?: string, onClick?: () => void, variant?: "solid" | "ghost" }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.15); // Magnetic strength
        y.set((clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.button>
    );
}

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    // Parallax
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-1000"
        >
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">

                {/* 1. Status Line */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2.5 mb-12 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-foreground/10 shadow-sm"
                >
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                        System Online
                    </span>
                </motion.div>

                {/* 2. Interactive Spotlight Title */}
                <div className="mb-8">
                    <SpotlightTitle />
                </div>

                {/* 3. Cycling Role Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="h-20 flex items-center justify-center"
                >
                    <CyclingScrambleText
                        phrases={[
                            "DIGITAL HERITAGE ARCHITECT",
                            "FULL STACK OPERATIVE",
                            "DATA RIGHTS ADVOCATE",
                            "OPEN SOURCE CONTRIBUTOR"
                        ]}
                        className="text-xl md:text-3xl font-light tracking-widest text-muted-foreground/80 font-mono"
                    />
                </motion.div>

                {/* 4. Actions (Magnetic) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 flex flex-col sm:flex-row gap-6 items-center"
                >
                    <MagneticButton
                        className="group relative inline-flex items-center justify-center h-14 px-10 rounded-full bg-foreground text-background font-medium overflow-hidden transition-all hover:w-56"
                        onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <div className="absolute inset-0 w-full h-full bg-tatreez-red/0 group-hover:bg-tatreez-red transition-colors duration-300" />
                        <span className="relative flex items-center group-hover:text-white transition-colors duration-300">
                            <Layers className="mr-2 w-4 h-4" />
                            Start Journey
                        </span>
                    </MagneticButton>

                    <MagneticButton
                        className="h-14 px-10 rounded-full border border-foreground/10 hover:bg-foreground/5 hover:border-foreground/30 text-foreground transition-all duration-300 flex items-center justify-center"
                        onClick={() => window.open('https://github.com/zaidsalem', '_blank')}
                    >
                        <Code2 className="mr-2 w-4 h-4" />
                        View Source
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity, y: y1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50">Scroll</span>
                <ArrowDown className="w-4 h-4 opacity-50 animate-bounce" />
            </motion.div>

        </section>
    );
}
