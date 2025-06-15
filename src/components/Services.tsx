import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Globe, Database, Cloud, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

        <div className="max-w-4xl mx-auto animate-slide-up">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {services.map((service, index) => (
              <AccordionItem value={`item-${index}`} key={service.title} className="glass rounded-lg hover-glow border-none">
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(to right, var(--color-primary), var(--color-accent))`,
                        color: `var(--color-surface)`
                      }}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 pl-4 border-l-2 border-primary/30">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground/80 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              className="theme-button hover-glow card-3d"
            >
              Get Started Today
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
