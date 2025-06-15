
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Globe, Cloud, Zap } from 'lucide-react';

const serviceCategories = [
  {
    value: "development",
    title: "Development Services",
    icon: <Code className="w-8 h-8" />,
    description: "Building robust and scalable software solutions from scratch.",
    subServices: [
      {
        title: "Full-Stack Development",
        description: "End-to-end web application development using modern frameworks.",
        price: "$5,000+",
        technologies: ["React", "Node.js", "Python", "Go"]
      },
      {
        title: "Mobile Development",
        description: "Cross-platform mobile applications with native performance.",
        price: "$8,000+",
        technologies: ["React Native", "Swift", "Kotlin"]
      },
    ]
  },
  {
    value: "design",
    title: "Design & UX Services",
    icon: <Globe className="w-8 h-8" />,
    description: "Creating beautiful, intuitive, and user-centered designs.",
    subServices: [
      {
        title: "Web Design & UX",
        description: "Beautiful, responsive designs that convert visitors into customers.",
        price: "$3,000+",
        technologies: ["Figma", "Adobe XD", "User Research"]
      },
      {
        title: "UI/UX Design",
        description: "Crafting seamless user experiences and visually appealing interfaces.",
        price: "$4,000+",
        technologies: ["Wireframing", "Prototyping", "A/B Testing"]
      }
    ]
  },
  {
    value: "infrastructure",
    title: "Infrastructure & DevOps",
    icon: <Cloud className="w-8 h-8" />,
    description: "Ensuring your applications are scalable, reliable, and secure.",
    subServices: [
      {
        title: "Cloud Solutions",
        description: "Modern cloud infrastructure and deployment solutions on AWS, GCP, Azure.",
        price: "$4,500+",
        technologies: ["AWS", "Docker", "Kubernetes"]
      },
      {
        title: "Database Solutions",
        description: "Scalable database architecture, optimization, and management.",
        price: "$3,500+",
        technologies: ["PostgreSQL", "MongoDB", "Redis"]
      }
    ]
  },
   {
    value: "consulting",
    title: "Consulting Services",
    icon: <Zap className="w-8 h-8" />,
    description: "Expert guidance to solve your most complex technical challenges.",
    subServices: [
      {
        title: "Technical Consulting",
        description: "Strategic technology guidance to help your business grow.",
        price: "$150/hr",
        technologies: ["Architecture", "Roadmapping", "Strategy"]
      },
      {
        title: "Code Review",
        description: "In-depth code analysis to improve quality, performance, and maintainability.",
        price: "$1,000+",
        technologies: ["Best Practices", "Security", "Performance"]
      }
    ]
  }
];


const ServicesTab = () => {
  return (
    <div className="mt-6">
       <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
        I offer a range of services designed to bring your digital vision to life. Explore my core areas of expertise below.
      </p>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
        {serviceCategories.map((category) => (
          <AccordionItem value={category.value} key={category.value} className="glass rounded-lg border-none hover-glow">
            <AccordionTrigger className="p-6 text-left hover:no-underline [&[data-state=open]>div>div:first-child]:scale-110">
              <div className="flex items-center gap-6 w-full">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white w-fit transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <div className="border-t border-white/10 my-4"></div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.subServices.map(service => (
                  <Card key={service.title} className="bg-white/5 border border-white/10 card-3d">
                    <CardContent className="p-4 flex flex-col h-full">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="text-lg font-semibold gradient-text">{service.price}</div>
                        <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                          Get Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ServicesTab;
