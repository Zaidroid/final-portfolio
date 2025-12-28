import { useTheme } from "@/components/theme-provider";
import { useEffect, useRef } from "react";

export function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", resize);
        resize();

        // --- Configuration ---
        const gridGap = 40; // Spacing between grid lines
        const horizonY = height * 0.4; // Horizon line height
        const speed = 1.5; // Forward movement speed
        const focalLength = 300; // FOV

        let offsetZ = 0; // Flight distance

        // Mouse interaction
        let mouseX = width / 2;
        let mouseY = height / 2;
        let targetSpeed = 1.0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Speed up slightly when mouse is lower (closer)
            targetSpeed = 1.0 + (e.clientY / height) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Simple pseudo-noise function
        const noise = (x: number, z: number) => {
            return Math.sin(x * 0.005 + z * 0.005) * 20 +
                Math.sin(x * 0.02 + z * 0.01) * 10;
        };

        const draw = () => {
            // Background
            const isDark = theme === "dark" || !theme || theme === "system";
            const bgColor = isDark ? "#0a0a0a" : "#ffffff";
            const lineColor = isDark ? "rgba(148, 163, 184, 0.15)" : "rgba(71, 85, 105, 0.15)";
            const scanColor = "#D94A4A"; // Tatreez Red

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            // Update flight
            offsetZ += speed * targetSpeed;

            ctx.lineWidth = 1;

            // Define visible frustum roughly
            const cols = Math.ceil(width / gridGap) + 20; // Extra for peripheral
            const rows = 40; // Depth rows
            const startX = -((cols * gridGap) / 2);

            // Compute Grid Points
            const points: { x: number, y: number, z: number, px: number, py: number }[] = [];

            for (let z = 0; z < rows; z++) {
                const zWorld = (z * gridGap) - (offsetZ % gridGap) + 50;
                // We want Z to start close and go far? Or far come close?
                // Standard: decreasing Z comes to camera? Or increasing Z goes away.
                // Let's say Z=0 is camera. increasing Z is depth.

                for (let x = 0; x < cols; x++) {
                    const xWorld = startX + x * gridGap;

                    // Terrain Height (Noise) based on world coordinates
                    const yWorld = 200 + noise(xWorld, (zWorld + offsetZ));

                    const scale = focalLength / zWorld;
                    const px = (width / 2) + xWorld * scale;
                    const py = horizonY + yWorld * scale;

                    points.push({ x: x, y: z, z: zWorld, px, py });
                }
            }

            // Render Mesh
            ctx.beginPath();
            ctx.strokeStyle = lineColor;

            // Horizontal lines
            for (let z = 0; z < rows; z++) {
                let started = false;
                for (let x = 0; x < cols; x++) {
                    const p = points[z * cols + x];
                    if (p.z < 1) continue;
                    if (!started) { ctx.moveTo(p.px, p.py); started = true; }
                    else ctx.lineTo(p.px, p.py);
                }
            }
            // Vertical lines
            for (let x = 0; x < cols; x++) {
                let started = false;
                for (let z = 0; z < rows; z++) {
                    const p = points[z * cols + x];
                    if (p.z < 1) continue;
                    if (!started) { ctx.moveTo(p.px, p.py); started = true; }
                    else ctx.lineTo(p.px, p.py);
                }
            }
            ctx.stroke();

            // Render Scanner Effect
            // Find points near cursor
            points.forEach(p => {
                // Ensure point is on screen/valid
                if (p.z < 1) return;

                const dist = Math.hypot(p.px - mouseX, p.py - mouseY);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.fillStyle = scanColor;
                    const size = Math.max(0, (1 - dist / 150) * 3);
                    ctx.globalAlpha = (1 - dist / 150);
                    ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                }
            });

            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] w-full h-full bg-background"
        />
    );
}
