
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AboutTab from '@/components/tabs/AboutTab';
import ServicesTab from '@/components/tabs/ServicesTab';
import Projects from '@/components/Projects';
import ContactTab from '@/components/tabs/ContactTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Hero />

      <main className="container mx-auto px-6 py-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center">
            <TabsList className="glass p-2 rounded-full h-auto">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          <TabsContent value="projects">
            <Projects />
          </TabsContent>
          <TabsContent value="contact">
            <ContactTab />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
