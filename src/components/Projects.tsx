import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Projects = () => {
  const [filter, setFilter] = useState('all');

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

  const categories = [
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A showcase of my recent work spanning web applications, mobile apps, and AI-powered solutions.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setFilter(category.id)}
                variant={filter === category.id ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  filter !== category.id
                    && 'border-purple-500 text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl p-0 border-0 overflow-hidden">
                <div className="grid md:grid-cols-[_1fr,1.5fr] group/dialog">
                    <div className="relative overflow-hidden h-64 md:h-auto">
                        <img 
                            src={`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&crop=center`}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/dialog:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/80" />
                    </div>

                    <div className="p-8 flex flex-col space-y-4 overflow-y-auto bg-card">
                        <div className="animate-slide-up" style={{animationDelay: '0.1s', animationFillMode: 'backwards'}}>
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold gradient-text mb-2">{project.title}</DialogTitle>
                                <DialogDescription className="text-purple-400 capitalize -mt-2">{project.category} App</DialogDescription>
                            </DialogHeader>
                        </div>

                        <p className="text-muted-foreground animate-slide-up" style={{animationDelay: '0.2s', animationFillMode: 'backwards'}}>
                            {project.description}
                        </p>

                        <div className="animate-slide-up" style={{animationDelay: '0.3s', animationFillMode: 'backwards'}}>
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

                        <div className="mt-auto pt-6 flex gap-4 animate-slide-up" style={{animationDelay: '0.4s', animationFillMode: 'backwards'}}>
                            <Button asChild className="theme-button hover-glow flex-1">
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="hover-glow flex-1">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 animate-slide-up">
          <Button 
            variant="outline"
            size="lg"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 transition-all duration-300 hover-glow"
          >
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
