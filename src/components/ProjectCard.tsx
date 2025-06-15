
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { triggerOnce: true, threshold: 0.2 });

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "group overflow-hidden relative rounded-lg border-border/50 hover:border-primary/80 transition-all duration-300 ease-in-out transform hover:-translate-y-2 h-full flex flex-col",
        "opacity-0",
        isVisible && "animate-reveal-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {project.featured && (
          <Badge variant="default" className="absolute top-3 right-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
