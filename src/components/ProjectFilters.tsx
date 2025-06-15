
import { Button } from '@/components/ui/button';
import { Category } from '@/types/project';

interface ProjectFiltersProps {
  categories: Category[];
  filter: string;
  setFilter: (filter: string) => void;
}

export const ProjectFilters = ({ categories, filter, setFilter }: ProjectFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => setFilter(category.id)}
          variant={filter === category.id ? "default" : "outline"}
          size="lg"
          className="rounded-full transition-all duration-300 ease-in-out"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
