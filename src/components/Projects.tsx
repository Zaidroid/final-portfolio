
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Project, Category } from '@/types/project';
import { ProjectFilters } from './ProjectFilters';
import { ProjectsGrid } from './ProjectsGrid';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and real-time inventory tracking.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TypeScript'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team collaboration features, and advanced analytics dashboard.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Socket.io', 'Tailwind'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking application with workout routines, progress tracking, and social features.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
      category: 'mobile',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'AI Chat Assistant',
      description: 'Intelligent chatbot with natural language processing capabilities and integration with multiple AI services.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'OpenAI API', 'FastAPI', 'React', 'WebSocket'],
      category: 'ai',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 5,
      title: 'Real Estate Platform',
      description: 'Property listing and management platform with advanced search, virtual tours, and CRM integration.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3', 'Maps API'],
      category: 'web',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Crypto Trading Dashboard',
      description: 'Real-time cryptocurrency trading dashboard with portfolio tracking and market analysis tools.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'WebSocket', 'Chart.js', 'Express', 'Redis'],
      category: 'web',
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
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
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
        <div className="text-center mt-16 animate-slide-up">
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
