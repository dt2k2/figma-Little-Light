import { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const mediaItems = [
  {
    id: 1,
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1694855801642-cf7e422bfd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjeWJlcnB1bmslMjBteXN0ZXJpb3VzfGVufDF8fHx8MTc2OTYxODY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    label: 'Gameplay Trailer'
  },
  {
    id: 2,
    type: 'image',
    thumbnail: 'https://cdn-media.sforum.vn/storage/app/media/tienha/top%20game/top-5-game-trinh-tham-pha-hay-nhat-tren-pc-6.jpg',
    label: 'Investigation Scene'
  },
  {
    id: 3,
    type: 'image',
    thumbnail: 'https://store-images.s-microsoft.com/image/apps.4287.13776465369520383.d0bfb1a2-244e-48ab-8b28-cb0587175173.83157ae2-b417-4e59-97a1-0c6cc67f7d10',
    label: 'AI Interface'
  },
  {
    id: 4,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1704902936713-719c74481772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkeXN0b3BpYW4lMjBjaXR5JTIwbmlnaHR8ZW58MXx8fHwxNzY5NjE4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    label: 'City Exploration'
  }
];

export function MediaGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMedia = mediaItems[selectedIndex];
  
  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setSelectedIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="rounded-lg overflow-hidden" style={{
      backgroundColor: 'var(--steam-card-bg)',
      border: '1px solid var(--steam-border)'
    }}>
      {/* Main Preview */}
      <div className="relative aspect-video group">
        <ImageWithFallback
          src={selectedMedia.thumbnail}
          alt={selectedMedia.label}
          className="w-full h-full object-cover"
        />
        
        {/* Video Play Button Overlay */}
        {selectedMedia.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <button className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{
              backgroundColor: 'var(--steam-blue)',
              boxShadow: '0 4px 16px rgba(102, 192, 244, 0.4)'
            }}>
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </button>
          </div>
        )}
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'var(--steam-text-primary)'
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'var(--steam-text-primary)'
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Media Type Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded text-xs" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'var(--steam-text-primary)'
        }}>
          {selectedMedia.label}
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="p-3 flex gap-2">
        {mediaItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="relative flex-1 aspect-video rounded overflow-hidden border-2 transition-all hover:opacity-80"
            style={{
              borderColor: index === selectedIndex ? 'var(--steam-blue)' : 'transparent',
              opacity: index === selectedIndex ? 1 : 0.6
            }}
          >
            <ImageWithFallback
              src={item.thumbnail}
              alt={item.label}
              className="w-full h-full object-cover"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
