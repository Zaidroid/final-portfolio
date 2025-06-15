
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
      title: 'PalTraffic - Real-Time Traffic Analysis',
      description: 'An intelligent web application that leverages Natural Language Processing (NLP) to analyze social media messages and real-time reports, providing up-to-the-minute traffic status updates for checkpoints across Palestine. Features an interactive map for easy visualization.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Python', 'NLTK', 'Flask', 'Leaflet.js', 'REST APIs'],
      category: 'ai',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Injaz - The All-in-One Life OS',
      description: 'A comprehensive, full-stack productivity system designed as a personal life operating system. It integrates modules for health tracking, task management, journaling, personal finance, and goal setting within a single, intuitive interface.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'TypeScript', 'Chart.js'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'AI CV Personalizer & Career Toolkit',
      description: 'An AI-powered platform that automates CV customization by intelligently analyzing a user\'s resume against a job description. It includes a suite of AI tools for skill gap analysis, interview preparation, and career guidance.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'FastAPI', 'OpenAI API', 'Docker', 'PDF.js', 'Vector DB'],
      category: 'ai',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Khetyar - The AI Storyteller',
      description: 'An innovative AI narrator that generates and curates interactive, personalized stories about Palestinian history and culture. Users can influence the narrative by selecting a time period, location, and character gender for an immersive experience.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Python', 'LLM', 'TTS API', 'Firebase', 'Next.js'],
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
