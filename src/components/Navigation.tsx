
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

type NavLink = {
  id: string;
  title: string;
};

const navLinks: NavLink[] = [
  { id: 'about', title: 'About' },
  { id: 'services', title: 'Services' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

const Navigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold gradient-text" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>
          ZaidLab
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeTab === link.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.title}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  activeTab === link.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
