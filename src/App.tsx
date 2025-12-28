import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { ModeToggle } from "@/components/ui/mode-toggle";

function App() {
  return (
    <main className="min-h-screen relative text-foreground overflow-x-hidden selection:bg-tatreez-red selection:text-white transition-colors duration-300">
      <div className="fixed top-6 right-6 z-[60]">
        <ModeToggle />
      </div>
      <InteractiveBackground />
      <Hero />
      <Timeline />
      <Contact />
    </main>
  );
}

export default App;
