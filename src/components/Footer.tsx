
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/10 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">ZaidLab</h3>
            <p className="text-gray-300 mb-4">
              Creating innovative digital solutions with cutting-edge technology 
              and exceptional design.
            </p>
            <div className="flex gap-4">
              {['📧', '💼', '🐱', '🐦'].map((emoji, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © {currentYear} ZaidLab. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
