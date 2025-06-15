
import { Card, CardContent } from '@/components/ui/card';
import CountUp from '@/components/CountUp';

const AboutTab = () => {
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
    <div className="space-y-8 mt-6">
      <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
        A passionate developer with 5+ years of experience creating digital solutions
        that make a difference. I specialize in full-stack development and love turning
        complex problems into simple, beautiful designs.
      </p>

      {/* Experience Timeline */}
      <Card className="p-6 sm:p-8 hover-glow">
        <h3 className="text-2xl font-bold mb-8 text-foreground text-center">My Journey</h3>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border -z-10"></div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-4 top-1 -translate-x-1/2">
                  <div className="h-4 w-4 bg-background border-2 border-primary rounded-full"></div>
                </div>
                <Card className="hover-glow card-3d">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold w-fit">
                        {exp.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-1">{exp.title}</h4>
                        <p className="text-purple-400 font-medium text-sm mb-2">{exp.company}</p>
                        <p className="text-muted-foreground text-sm">{exp.description}</p>
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
      <Card className="p-6 sm:p-8 hover-glow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center lg:text-left">Technical Skills</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {skills.map((skill) => (
                <div key={skill.name} className="glass text-foreground font-medium px-4 py-2 rounded-full text-sm hover-glow transition-all cursor-default border border-transparent hover:border-purple-500/50">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={50} suffix="+" /></h4>
                <p className="text-muted-foreground text-sm">Projects</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={5} suffix="+" /></h4>
                <p className="text-muted-foreground text-sm">Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={100} suffix="%" /></h4>
                <p className="text-muted-foreground text-sm">Satisfaction</p>
              </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutTab;
