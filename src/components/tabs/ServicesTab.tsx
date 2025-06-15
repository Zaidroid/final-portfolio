
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Globe, Database, Cloud, Zap } from 'lucide-react';

const ServicesTab = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Full-Stack Development',
      description: 'End-to-end web application development using modern frameworks.',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications with native performance.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Web Design & UX',
      description: 'Beautiful, responsive designs that convert visitors.',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Database Solutions',
      description: 'Scalable database architecture and optimization.',
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud & DevOps',
      description: 'Modern cloud infrastructure and deployment solutions.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Technical Consulting',
      description: 'Strategic technology guidance to help your business grow.',
    }
  ];

  return (
    <div className="mt-6">
       <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
        Comprehensive technology solutions to bring your ideas to life and accelerate your business growth.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card 
            key={service.title} 
            className="hover-glow card-3d group cursor-pointer"
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white w-fit group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-purple-400 transition-colors duration-300">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed text-sm">
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
