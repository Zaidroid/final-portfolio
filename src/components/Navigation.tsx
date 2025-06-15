
import { ThemeToggle } from './ThemeToggle';

const Navigation = () => {
  return (
    <header className="fixed z-50 top-0 left-0 right-0">
      <div className="flex justify-center pt-4">
        <div className="glass rounded-full shadow-lg">
          <div className="container mx-auto flex items-center justify-between px-4 py-2 gap-x-6">
            <div className="text-2xl font-bold gradient-text">
              ZaidLab
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
