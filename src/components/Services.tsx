
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Globe, Database, Cloud, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Full-Stack Development',
      description: 'End-to-end web application development using modern frameworks like React, Next.js, and Node.js.',
      features: ['Custom Web Applications', 'API Development', 'Database Design', 'Performance Optimization']
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications that deliver native performance and user experience.',
      features: ['React Native Apps', 'iOS & Android', 'Cross-Platform Solutions', 'App Store Deployment']
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Web Design & UX',
      description: 'Beautiful, responsive designs that convert visitors into customers with exceptional user experience.',
      features: ['Responsive Design', 'UI/UX Design', 'Wireframing', 'User Research']
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Database Solutions',
      description: 'Scalable database architecture and optimization for high-performance applications.',
      features: ['Database Design', 'Query Optimization', 'Data Migration', 'Performance Tuning']
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud & DevOps',
      description: 'Modern cloud infrastructure and deployment solutions for scalable applications.',
      features: ['AWS/Azure Deployment', 'CI/CD Pipelines', 'Docker Containers', 'Monitoring & Analytics']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Technical Consulting',
      description: 'Strategic technology guidance to help your business make informed technical decisions.',
      features: ['Technology Strategy', 'Code Reviews', 'Architecture Planning', 'Team Training']
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology solutions to bring your ideas to life and accelerate your business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="hover-glow card-3d group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground/80 flex items-center justify-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-up">
          <Card className="p-8 rounded-2xl max-w-2xl mx-auto hover-glow">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can bring your vision to life with cutting-edge technology.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover-glow card-3d"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
