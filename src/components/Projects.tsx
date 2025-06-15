
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Project, Category } from '@/types/project';
import { ProjectFilters } from './ProjectFilters';
import { ProjectsGrid } from './ProjectsGrid';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { triggerOnce: true });

  const projects: Project[] = [
    {
      id: 1,
      title: 'PalTraffic',
      description: 'A web app using a Python script to analyze NLP messages to determine traffic status on checkpoints in Palestine.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Python', 'NLTK', 'Flask', 'Leaflet.js'],
      category: 'ai',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Injaz',
      description: 'A comprehensive full system to manage health, tasks, journals, personal finance, goals, and more.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'TypeScript'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'CV Personalizer',
      description: 'Reads a user\'s CV and a job description to generate a tailored CV, featuring an AI toolkit for skill gap analysis and interview prep.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'FastAPI', 'OpenAI API', 'Docker', 'PDF.js'],
      category: 'ai',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Khetyar',
      description: 'An AI narrator that curates interactive stories of Palestinians based on user choices for time period, location, and gender.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Python', 'LLM', 'TTS API', 'Firebase'],
      category: 'ai',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const categories: Category[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI/ML' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-reveal-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">My Work</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Here's a selection of projects I'm proud of. Each one was a unique challenge.
          </p>

          <ProjectFilters 
            categories={categories} 
            filter={filter} 
            setFilter={setFilter} 
          />
        </div>

        <ProjectsGrid projects={filteredProjects} />

        {/* View More Button */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'animate-reveal-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
          <Button 
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-3 transition-all duration-300 hover-glow"
          >
            View More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
