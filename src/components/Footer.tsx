
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">ZaidLab</h3>
            <p className="text-muted-foreground mb-4">
              Creating innovative digital solutions with cutting-edge technology 
              and exceptional design.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline" size="icon"><a href="mailto:hello@zaidlab.xyz"><Mail /></a></Button>
              <Button asChild variant="outline" size="icon"><a href="#" target="_blank" rel="noopener noreferrer"><Linkedin /></a></Button>
              <Button asChild variant="outline" size="icon"><a href="#" target="_blank" rel="noopener noreferrer"><Github /></a></Button>
              <Button asChild variant="outline" size="icon"><a href="#" target="_blank" rel="noopener noreferrer"><Twitter /></a></Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © {currentYear} ZaidLab. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
