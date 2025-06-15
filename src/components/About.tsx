
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'Node.js/Express', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'Python/Django', level: 85 },
    { name: 'AWS/Cloud', level: 82 },
    { name: 'Database Design', level: 90 },
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A passionate developer with 5+ years of experience creating digital solutions 
            that make a difference. I specialize in full-stack development and love turning 
            complex problems into simple, beautiful designs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Skills Section */}
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-6 text-white">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                    <span className="text-purple-400 font-semibold text-sm">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-2 bg-gray-800" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="animate-slide-in-right">
            <h3 className="text-2xl font-bold mb-8 text-white">Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={exp.year} className="glass hover-glow card-3d" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {exp.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-1">{exp.title}</h4>
                        <p className="text-purple-400 font-medium mb-2">{exp.company}</p>
                        <p className="text-gray-300">{exp.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mt-16 text-center animate-scale-in">
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto hover-glow">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2">50+</h4>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2">5+</h4>
                <p className="text-gray-300">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold gradient-text mb-2">100%</h4>
                <p className="text-gray-300">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
