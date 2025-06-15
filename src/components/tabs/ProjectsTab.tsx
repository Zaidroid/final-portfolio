
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const ProjectsTab = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce site with a custom CMS and payment gateway integration.',
      tags: ['React', 'Node.js', 'Stripe'],
      image: '/placeholder.svg'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'A real-time dashboard for visualizing complex business intelligence data.',
      tags: ['Next.js', 'D3.js', 'Python'],
      image: '/placeholder.svg'
    },
    {
      title: 'Mobile Banking App',
      description: 'A secure and intuitive mobile app for a leading financial institution.',
      tags: ['React Native', 'TypeScript', 'Security'],
      image: '/placeholder.svg'
    },
    {
      title: 'SaaS Application',
      description: 'A multi-tenant SaaS product for project management and team collaboration.',
      tags: ['Vue.js', 'Firebase', 'Tailwind'],
      image: '/placeholder.svg'
    },
  ];

  return (
    <div className="mt-6">
      <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
        A selection of projects that showcase my skills in creating robust, scalable, and user-friendly applications.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="hover-glow card-3d group overflow-hidden">
            <CardHeader>
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-t-lg" />
              <CardTitle className="text-xl font-semibold text-foreground mt-4">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
