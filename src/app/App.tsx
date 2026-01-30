import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { MediaGallery } from '@/app/components/MediaGallery';
import { PurchasePanel } from '@/app/components/PurchasePanel';
import { ContentSections } from '@/app/components/ContentSections';
import { RecommendedGames } from '@/app/components/RecommendedGames';

export default function App() {
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
        <Hero />
        
        {/* Two-column layout: Content + Purchase Panel */}
        <div className="flex gap-6 px-6 -mt-8 relative z-10">
          {/* Left column: Media Gallery + Content */}
          <div className="flex-1 space-y-6">
            <MediaGallery />
            <ContentSections />
          </div>
          
          {/* Right column: Purchase Panel */}
          <div className="w-[340px] shrink-0">
            <PurchasePanel />
          </div>
        </div>
        
        {/* Recommended Games */}
        <RecommendedGames />
      </main>
    </div>
  );
}
