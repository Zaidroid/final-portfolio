
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '@/types/project';

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <Dialog key={project.id}>
          <DialogTrigger asChild>
            <div className="cursor-pointer h-full">
              <ProjectCard project={project} index={index} />
            </div>
          </DialogTrigger>
          <ProjectModal project={project} />
        </Dialog>
      ))}
    </div>
  );
};
