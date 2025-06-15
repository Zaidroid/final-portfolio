
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full-Stack Developer & Tech Innovator";
  
  useEffect(() => {
    let index = 0;
    const typingTimer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(typingTimer);
      }
    }, 100);

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * -1;
      const y = (clientY / window.innerHeight - 0.5) * -1;

      const parallaxElements = document.querySelectorAll<HTMLElement>('.parallax-effect');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed || '0');
        if (!el.classList.contains('hero-content-tilt')) {
            el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        }
      });
      
      const heroContent = document.querySelector<HTMLElement>('.hero-content-tilt');
      if (heroContent) {
        const speed = parseFloat(heroContent.dataset.speed || '0');
        const rotateY = x * -7;
        const rotateX = y * 7;
        heroContent.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(typingTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden [perspective:1000px]">
      {/* Dynamic Parallax Background Elements */}
      <div className="absolute inset-0">
        <div className="parallax-effect absolute top-20 left-20 w-72 h-72" data-speed="20">
            <div className="w-full h-full rounded-full blur-3xl floating-element opacity-10" 
                 style={{ background: 'var(--color-primary)' }} />
        </div>
        <div className="parallax-effect absolute top-40 right-20 w-96 h-96" data-speed="-30">
            <div className="w-full h-full rounded-full blur-3xl floating-element opacity-10" 
                 style={{ background: 'var(--color-accent)', animationDelay: '2s' }} />
        </div>
        <div className="parallax-effect absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80" data-speed="15">
            <div className="w-full h-full rounded-full blur-3xl floating-element opacity-10" 
                 style={{ background: 'var(--color-secondary)', animationDelay: '4s' }} />
        </div>
      </div>

      {/* Dynamic 3D Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax-effect absolute top-1/4 left-1/4 w-20 h-20" data-speed="-10">
          <div className="w-full h-full rotate-45 animate-rotate-3d opacity-30" 
               style={{ border: `1px solid var(--color-primary)`, animationDuration: '20s' }} />
        </div>
        <div className="parallax-effect absolute top-3/4 right-1/4 w-16 h-16" data-speed="25">
          <div className="w-full h-full rounded-full animate-float opacity-30" 
               style={{ border: `1px solid var(--color-accent)`, animationDelay: '3s' }} />
        </div>
        <div className="parallax-effect absolute top-1/2 right-1/3 w-12 h-12" data-speed="-5">
          <div className="w-full h-full rotate-12 animate-glow opacity-20" 
               style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }} />
        </div>
        <div className="parallax-effect absolute bottom-1/4 left-1/3 w-14 h-14" data-speed="12">
          <div className="w-full h-full animate-rotate-3d opacity-20" 
               style={{ border: `2px solid var(--color-secondary)`, animationDuration: '25s', animationDirection: 'reverse' }} />
        </div>
      </div>
      
      <div className="relative z-10 parallax-effect hero-content-tilt transition-transform duration-100 ease-out" data-speed="5" style={{ transformStyle: 'preserve-3d' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="block gradient-text">Zaid</span>
              <span className="block" style={{ color: 'var(--color-text)' }}>Salem</span>
            </h1>
            
            <div className="h-16 mb-8">
              <p className="text-xl md:text-2xl font-light" style={{ color: 'var(--color-text-muted)' }}>
                {text}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            <p className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Passionate about creating innovative digital solutions that bridge the gap between 
              cutting-edge technology and exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="theme-button px-8 py-4 text-lg hover-glow"
              >
                View My Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg transition-all duration-300 hover-glow theme-input"
                style={{ 
                  borderColor: 'var(--color-primary)', 
                  color: 'var(--color-primary)',
                }}
              >
                Let's Connect
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full flex justify-center" 
             style={{ border: `2px solid var(--color-primary)` }}>
          <div className="w-1 h-3 rounded-full mt-2 animate-pulse" 
               style={{ background: 'var(--color-primary)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
