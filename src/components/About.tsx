import { Card, CardContent } from '@/components/ui/card';
import CountUp from './CountUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Code, Smartphone, Globe, Database, Cloud, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'React/Next.js' },
    { name: 'Node.js/Express' },
    { name: 'TypeScript' },
    { name: 'Python/Django' },
    { name: 'AWS/Cloud' },
    { name: 'Database Design' },
    { name: 'Tailwind CSS' },
    { name: 'GraphQL' },
    { name: 'Docker' },
  ];

  const experiences = [
    {
      year: '2024',
      title: 'Senior Full-Stack Developer',
      company: 'ZaidLab Solutions',
      description: 'Leading development of enterprise-scale applications with modern tech stack.'
    },
    {
      year: '2023',
      title: 'Technical Lead',
      company: 'Innovation Hub',
      description: 'Managed cross-functional teams and architected scalable solutions.'
    },
    {
      year: '2022',
      title: 'Full-Stack Developer',
      company: 'Tech Startup',
      description: 'Built MVP products and implemented CI/CD pipelines.'
    },
  ];

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
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate developer with 5+ years of experience creating digital solutions 
            that make a difference. I specialize in full-stack development and love turning 
            complex problems into simple, beautiful designs.
          </p>
        </div>

        {/* Personal Info */}
        <div className="mb-16 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="p-8 rounded-2xl max-w-4xl mx-auto hover-glow">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={50} suffix="+" /></h4>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={7} suffix="+" /></h4>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={30} suffix="+" /></h4>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </Card>
        </div>

        <div id="services" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Tabs defaultValue="services" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="journey">My Journey</TabsTrigger>
                <TabsTrigger value="skills">Technical Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="journey" className="animate-scale-in">
                <div className="relative max-w-2xl mx-auto">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-border -z-10"></div>
                  <div className="space-y-12">
                    {experiences.map((exp, index) => (
                      <div key={index} className="relative pl-12">
                        <div className="absolute left-4 top-1 -translate-x-1/2">
                          <div className="h-4 w-4 bg-background border-2 border-primary rounded-full"></div>
                        </div>
                        <Card className="hover-glow card-3d" style={{ animationDelay: `${index * 0.1}s` }}>
                          <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold w-fit">
                                {exp.year}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-foreground mb-1">{exp.title}</h4>
                                <p className="text-purple-400 font-medium mb-2">{exp.company}</p>
                                <p className="text-muted-foreground">{exp.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="skills" className="animate-scale-in">
                  <Card className="max-w-3xl mx-auto">
                    <CardContent className="p-8">
                      <div className="flex flex-wrap justify-center gap-4">
                        {skills.map((skill) => (
                          <div key={skill.name} className="glass text-foreground font-medium px-4 py-2 rounded-full text-sm hover-glow transition-all cursor-default border border-transparent hover:border-purple-500/50">
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="services" className="animate-scale-in">
                <div className="w-full grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card key={service.title} className="glass rounded-lg hover-glow border-none flex flex-col">
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 mb-4">
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
                        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </section>
  );
};

export default About;
