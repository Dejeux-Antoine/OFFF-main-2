import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { ProgramSection } from './components/sections/ProgramSection';
import { ArtistsSection } from './components/sections/ArtistsSection';
import { MapSection } from './components/sections/MapSection';
import { BadgeSection } from './components/sections/BadgeSection';
import { TicketsSection } from './components/sections/TicketsSection';
import { DevTools } from './components/DevTools';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <ProgramSection />
          <ArtistsSection />
          <MapSection />
          <BadgeSection />
          <TicketsSection />
        </main>
        <DevTools />
      </div>
    </LanguageProvider>
  );
}

export default App;
