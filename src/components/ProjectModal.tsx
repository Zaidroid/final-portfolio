
import { DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
}

export const ProjectModal = ({ project }: ProjectModalProps) => (
  <DialogContent className="sm:max-w-4xl w-[95vw] h-auto max-h-[90vh] p-0 border-0 bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group/dialog">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/dialog:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    </div>

    <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col space-y-5 overflow-y-auto">
      <header className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
        <Badge variant="secondary" className="mb-3 capitalize text-sm font-medium">{project.category} App</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{project.title}</h2>
      </header>

      <p className="text-muted-foreground text-base leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
        {project.description}
      </p>

      <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
        <h3 className="font-semibold text-foreground text-lg mb-4">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="px-3 py-1 text-sm border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
        {project.liveUrl && project.liveUrl !== '#' && (
          <Button asChild size="lg" className="theme-button hover-glow flex-1">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && project.githubUrl !== '#' && (
          <Button asChild size="lg" variant="outline" className="hover-glow flex-1 bg-transparent border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              Source Code
            </a>
          </Button>
        )}
      </div>
    </div>
  </DialogContent>
);
