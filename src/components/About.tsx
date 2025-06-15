import { Card, CardContent } from '@/components/ui/card';
import CountUp from './CountUp';

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

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate developer with 5+ years of experience creating digital solutions 
            that make a difference. I specialize in full-stack development and love turning 
            complex problems into simple, beautiful designs.
          </p>
        </div>

        <div className="space-y-12">
          {/* Experience Timeline */}
          <Card className="p-6 sm:p-8 md:p-12 animate-slide-in-right hover-glow">
            <h3 className="text-3xl font-bold mb-12 text-foreground text-center">My Journey</h3>
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
          </Card>
          
          {/* Skills & Stats Section */}
          <Card className="p-6 sm:p-8 md:p-12 animate-slide-in-left hover-glow">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-8 text-foreground text-center lg:text-left">Technical Skills</h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="glass text-foreground font-medium px-4 py-2 rounded-full text-sm hover-glow transition-all cursor-default border border-transparent hover:border-purple-500/50">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mt-8 lg:mt-0">
                  <div>
                    <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={50} suffix="+" /></h4>
                    <p className="text-muted-foreground">Projects Completed</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={5} suffix="+" /></h4>
                    <p className="text-muted-foreground">Years Experience</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={100} suffix="%" /></h4>
                    <p className="text-muted-foreground">Client Satisfaction</p>
                  </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
