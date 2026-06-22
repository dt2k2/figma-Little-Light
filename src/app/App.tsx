import { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { MediaGallery } from '@/app/components/MediaGallery';
import { PurchasePanel } from '@/app/components/PurchasePanel';
import { ContentSections } from '@/app/components/ContentSections';
import { RecommendedGames } from '@/app/components/RecommendedGames';
import { PhilosophyGame } from '@/app/components/PhilosophyGame';

export default function App() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <div className="min-h-screen w-full" style={{ 
      backgroundColor: 'var(--steam-darker-bg)',
      maxWidth: '1440px',
      margin: '0 auto',
      height: '1024px',
      overflow: 'auto'
    }}>
      <Navigation />
      
      <main className="relative">
        {/* Hero Section */}
        <Hero onPlayGame={() => setIsGameOpen(true)} />
        
        {/* Two-column layout: Content + Purchase Panel */}
        <div className="flex gap-6 px-6 -mt-8 relative z-10">
          {/* Left column: Media Gallery + Content */}
          <div className="flex-1 space-y-6">
            <MediaGallery />
            <ContentSections />
          </div>
          
          {/* Right column: Purchase Panel */}
          <div className="w-[340px] shrink-0">
            <PurchasePanel onPlayGame={() => setIsGameOpen(true)} />
          </div>
        </div>
        
        {/* Recommended Games */}
        <RecommendedGames />
      </main>

      {/* Philosophy interactive game modal */}
      <PhilosophyGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </div>
  );
}
