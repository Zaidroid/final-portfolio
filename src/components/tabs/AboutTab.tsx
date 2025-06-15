
import { Card, CardContent } from '@/components/ui/card';

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

const AboutTab = () => {
  return (
    <div className="animate-fade-in">
        <h3 className="text-2xl font-bold mb-8 text-foreground text-center">My Journey</h3>
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border -z-10"></div>
          <div className="space-y-8">
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
    </div>
  );
};

export default AboutTab;
