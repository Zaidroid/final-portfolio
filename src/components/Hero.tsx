
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full-Stack Developer & Tech Innovator";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl floating-element" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl floating-element" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating-element" style={{ animationDelay: '4s' }} />
      </div>

      {/* 3D floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-purple-500/30 rotate-45 animate-rotate-3d" style={{ animationDuration: '20s' }} />
        <div className="absolute top-3/4 right-1/4 w-16 h-16 border border-pink-500/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rotate-12 animate-glow" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="block gradient-text">Zaid</span>
            <span className="block text-white">Mabrouki</span>
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              {text}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Passionate about creating innovative digital solutions that bridge the gap between 
            cutting-edge technology and exceptional user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg transition-all duration-300 hover-glow card-3d"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg transition-all duration-300 hover-glow"
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
