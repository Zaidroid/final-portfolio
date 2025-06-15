
import CountUp from '@/components/CountUp';

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

const SkillsTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-8 text-foreground text-center lg:text-left">Technical Skills</h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
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
              <p className="text-muted-foreground">Projects</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={5} suffix="+" /></h4>
              <p className="text-muted-foreground">Experience</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold gradient-text mb-2"><CountUp end={100} suffix="%" /></h4>
              <p className="text-muted-foreground">Satisfaction</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
