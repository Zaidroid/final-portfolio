
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
}

export const ProjectModal = ({ project }: ProjectModalProps) => (
  <DialogContent className="sm:max-w-5xl w-[95vw] max-h-[85vh] p-0 border-0 rounded-3xl overflow-hidden bg-card shadow-2xl">
    <div className="flex flex-col lg:flex-row h-full">
      {/* Image Section */}
      <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {project.featured && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg">
            Featured
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 lg:p-12 bg-card text-card-foreground flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
              {project.category} Application
            </Badge>
            <DialogTitle className="text-3xl lg:text-4xl font-bold text-card-foreground leading-tight">
              {project.title}
            </DialogTitle>
          </div>

          <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </DialogDescription>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="px-3 py-1.5 text-sm bg-muted/50 border-border hover:bg-muted transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-border">
          {project.liveUrl && project.liveUrl !== '#' && (
            <Button 
              asChild 
              size="lg" 
              className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="flex-1 h-12 text-base font-medium border-2 hover:bg-muted transition-all duration-200"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  </DialogContent>
);
