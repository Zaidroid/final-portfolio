
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const projects = [
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
];

const categories = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' }
];

const ProjectsTab = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 gradient-text">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setFilter(category.id)}
                variant={filter === category.id ? "default" : "outline"}
                size="sm"
                className={`transition-all duration-300 ${
                  filter !== category.id
                    && 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                {category.label}
              </Button>
            ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <Card 
                  className="hover-glow card-3d group overflow-hidden animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center`}
                      alt={project.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl glass p-0">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&crop=center`}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
                <div className="p-6 pt-0 -mt-16 relative z-10">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-3xl font-bold text-foreground">{project.title}</DialogTitle>
                    <DialogDescription className="text-purple-400 capitalize">{project.category} App</DialogDescription>
                  </DialogHeader>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button asChild className="hover-glow">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="hover-glow">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
    </div>
  );
};

export default ProjectsTab;
