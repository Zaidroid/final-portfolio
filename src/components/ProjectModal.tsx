
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, X } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
}

export const ProjectModal = ({ project }: ProjectModalProps) => (
  <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[90vh] p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-2xl">
    <div className="relative h-full max-h-[90vh] overflow-hidden">
      {/* Header Image Section */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {project.featured && (
          <Badge className="absolute top-4 right-4 bg-blue-600 text-white shadow-lg border-0">
            Featured
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6 max-h-[calc(90vh-16rem)] sm:max-h-[calc(90vh-20rem)] overflow-y-auto">
        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0">
              {project.category} Application
            </Badge>
          </div>
          
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {project.title}
          </DialogTitle>
          
          <DialogDescription className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description}
          </DialogDescription>
        </div>

        {/* Technologies Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && project.liveUrl !== '#' && (
            <Button 
              asChild 
              size="lg" 
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
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
              className="flex-1 h-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
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
