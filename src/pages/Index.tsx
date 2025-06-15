
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutTab from '@/components/tabs/AboutTab';
import SkillsTab from '@/components/tabs/SkillsTab';
import ServicesTab from '@/components/tabs/ServicesTab';
import ProjectsTab from '@/components/tabs/ProjectsTab';
import ContactTab from '@/components/tabs/ContactTab';

const Index = () => {
  const tabs = [
    { value: 'about', label: 'About', component: <AboutTab /> },
    { value: 'skills', label: 'Skills', component: <SkillsTab /> },
    { value: 'services', label: 'Services', component: <ServicesTab /> },
    { value: 'projects', label: 'Projects', component: <ProjectsTab /> },
    { value: 'contact', label: 'Contact', component: <ContactTab /> },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center p-4">
        <Tabs defaultValue="about" className="w-full max-w-6xl">
            <Card className="w-full hub-card p-4 sm:p-6 md:p-8 animate-fade-in">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-6">
                    {tabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value} className="min-h-[400px]">
                        {tab.component}
                    </TabsContent>
                ))}
            </Card>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
