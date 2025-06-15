
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Globe, Database, Cloud, Zap } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using modern frameworks like React, Next.js, and Node.js.',
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications that deliver native performance and user experience.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Web Design & UX',
    description: 'Beautiful, responsive designs that convert visitors into customers.',
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Database Solutions',
    description: 'Scalable database architecture and optimization for high-performance applications.',
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Cloud & DevOps',
    description: 'Modern cloud infrastructure and deployment solutions for scalable applications.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Technical Consulting',
    description: 'Strategic technology guidance to help your business make informed technical decisions.',
  }
];

const ServicesTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive technology solutions to bring your ideas to life.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card 
            key={service.title} 
            className="hover-glow card-3d group cursor-pointer animate-scale-in text-center"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white w-fit group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-purple-400 transition-colors duration-300">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
