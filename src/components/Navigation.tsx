
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      const sections = ['home', 'about', 'services', 'projects', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed z-50 top-0 left-0 right-0">
      <div className={`flex justify-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled && !isMenuOpen ? 'pt-4' : 'pt-0'}`}>
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled && !isMenuOpen ? 'glass rounded-full shadow-lg' : 'w-full'}`}>
          <div className={`container mx-auto flex items-center justify-between transition-all ${isScrolled && !isMenuOpen ? 'px-4 py-2 gap-x-6' : 'px-6 py-4'}`}>
            <div className="text-2xl font-bold gradient-text">
              ZaidLab
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-colors duration-300 hover:text-purple-400 ${
                    activeSection === item.id ? 'text-purple-400' : 'text-foreground/80'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                onClick={() => scrollToSection('contact')}
                className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover-glow"
              >
                Get In Touch
              </Button>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-background/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="container h-full mx-auto flex flex-col justify-center items-center gap-y-8">
            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => {
                    scrollToSection(item.id);
                    setIsMenuOpen(false);
                }}
                className={`relative text-2xl font-medium transition-colors duration-300 hover:text-purple-400 ${
                    activeSection === item.id ? 'text-purple-400' : 'text-foreground/80'
                }`}
                >
                {item.label}
                </button>
            ))}
            <Button 
                onClick={() => {
                    scrollToSection('contact');
                    setIsMenuOpen(false);
                }}
                size="lg"
                className="sm:hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover-glow"
            >
                Get In Touch
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
