import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMousePosition } from '@/hooks/useMousePosition';
import AnimatedBackground from '@/components/AnimatedBackground';

const phrases = [
  "Full-Stack Developer & Tech Innovator",
  "Crafting Seamless User Experiences",
  "Transforming Ideas into Reality",
];
const TYPING_SPEED = 75;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

const Hero = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { x: clientX, y: clientY } = useMousePosition();
  
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeoutId: number;

    if (isDeleting) {
      if (text.length > 0) {
        timeoutId = window.setTimeout(() => {
          setText(text.substring(0, text.length - 1));
        }, DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (text.length < currentPhrase.length) {
        timeoutId = window.setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, [text, isDeleting, phraseIndex]);

  useEffect(() => {
    if (clientX === 0 && clientY === 0) return;

    const animationFrameId = requestAnimationFrame(() => {
      const x = (clientX / window.innerWidth - 0.5) * -1;
      const y = (clientY / window.innerHeight - 0.5) * -1;
      
      const heroContent = document.querySelector<HTMLElement>('.hero-content-tilt');
      if (heroContent) {
        const speed = parseFloat(heroContent.dataset.speed || '0');
        const rotateY = x * -7;
        const rotateX = y * 7;
        heroContent.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [clientX, clientY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden [perspective:1000px]">
      <AnimatedBackground />
      
      <div className="relative z-10 parallax-effect hero-content-tilt transition-transform duration-100 ease-out" data-speed="5" style={{ transformStyle: 'preserve-3d' }}>
        <div className="container mx-auto px-6 text-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <span className="block gradient-text">Zaid</span>
              <span className="block" style={{ color: 'var(--color-text)' }}>Salem</span>
            </h1>
            
            <div className="h-16 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <p className="text-xl md:text-2xl font-light" style={{ color: 'var(--color-text-muted)' }}>
                {text}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            <p className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '300ms', color: 'var(--color-text-muted)' }}>
              Passionate about creating innovative digital solutions that bridge the gap between 
              cutting-edge technology and exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '400ms' }}>
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
