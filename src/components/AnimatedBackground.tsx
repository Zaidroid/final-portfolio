import { useEffect, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

const AnimatedBackground = () => {
  const { x: clientX, y: clientY } = useMousePosition();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Only run if there is interaction (mouse move or scroll)
    if (clientX === 0 && clientY === 0 && scrollY === 0) return;

    const animationFrameId = requestAnimationFrame(() => {
      const x = (clientX / window.innerWidth - 0.5) * -1;
      const y = (clientY / window.innerHeight - 0.5) * -1;
      
      // Fades out over the first 80% of the viewport height scroll.
      const scrollFactor = Math.max(0, 1 - scrollY / (window.innerHeight * 0.8));

      const parallaxElements = document.querySelectorAll<HTMLElement>('.parallax-bg-element');
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed || '0');
        const parallaxTranslateX = x * speed;
        const parallaxTranslateY = y * speed;

        const rect = el.getBoundingClientRect();
        // Skip elements that are not rendered or off-screen.
        if (rect.width === 0 && rect.height === 0) return; 

        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(Math.pow(clientX - elCenterX, 2) + Math.pow(clientY - elCenterY, 2));
        
        const maxDistance = 250;
        let scale = 1;
        
        if (distance < maxDistance) {
          // Proximity is a value from 0 (at maxDistance) to 1 (at 0 distance).
          const proximity = 1 - (distance / maxDistance);
          scale = 1 + proximity * 0.2; // Scale up to 1.2
        }

        // Add a smooth transition to the transformations.
        el.style.transition = 'transform 0.1s ease-out, opacity 0.3s ease-out';
        el.style.transform = `translateX(${parallaxTranslateX}px) translateY(${parallaxTranslateY}px) scale(${scale})`;
        el.style.opacity = `${scrollFactor}`;
      });
    });

    return () => cancelAnimationFrame(animationFrameId);

  }, [clientX, clientY, scrollY]);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* Dynamic Parallax Background Elements */}
      <div className="absolute inset-0">
        <div className="parallax-bg-element absolute top-20 left-20 w-72 h-72" data-speed="20">
            <div className="w-full h-full rounded-full blur-3xl floating-element opacity-10" 
                 style={{ background: 'var(--color-primary)' }} />
        </div>
        <div className="parallax-bg-element absolute top-40 right-20 w-96 h-96" data-speed="-30">
            <div className="w-full h-full rounded-full blur-3xl floating-element opacity-10" 
                 style={{ background: 'var(--color-accent)', animationDelay: '2s' }} />
        </div>
        <div className="parallax-bg-element absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80" data-speed="15">
            <div className="w-full h-full rounded-full blur-3xl floating-element opacity-10" 
                 style={{ background: 'var(--color-secondary)', animationDelay: '4s' }} />
        </div>
      </div>

      {/* Dynamic 3D Floating Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="parallax-bg-element absolute top-1/4 left-1/4 w-20 h-20" data-speed="-10">
          <div className="w-full h-full rotate-45 animate-rotate-3d opacity-30" 
               style={{ border: `1px solid var(--color-primary)`, animationDuration: '20s' }} />
        </div>
        <div className="parallax-bg-element absolute top-3/4 right-1/4 w-16 h-16" data-speed="25">
          <div className="w-full h-full rounded-full animate-float opacity-30" 
               style={{ border: `1px solid var(--color-accent)`, animationDelay: '3s' }} />
        </div>
        <div className="parallax-bg-element absolute top-1/2 right-1/3 w-12 h-12" data-speed="-5">
          <div className="w-full h-full rotate-12 animate-glow opacity-20" 
               style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }} />
        </div>
        <div className="parallax-bg-element absolute bottom-1/4 left-1/3 w-14 h-14" data-speed="12">
          <div className="w-full h-full animate-rotate-3d opacity-20" 
               style={{ border: `2px solid var(--color-secondary)`, animationDuration: '25s', animationDirection: 'reverse' }} />
        </div>
        <div className="parallax-bg-element absolute top-1/3 right-1/2 w-10 h-10" data-speed="18">
            <div className="w-full h-full rounded-full animate-float opacity-20" 
                 style={{ background: 'var(--color-primary)', animationDelay: '1s' }} />
        </div>
        <div className="parallax-bg-element absolute bottom-1/3 left-3/4 w-8 h-8" data-speed="-15">
            <div className="w-full h-full rotate-45 animate-rotate-3d opacity-25" 
                 style={{ background: 'var(--color-accent)', animationDuration: '30s' }} />
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
