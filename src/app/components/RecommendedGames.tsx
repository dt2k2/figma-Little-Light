import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const recommendedGames = [
  {
    id: 1,
    title: 'Echoes of Tomorrow',
    image: 'https://images.unsplash.com/photo-1761395013764-04320a20e4b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY3Rpb24lMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY5NjE4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '$24.99',
    discount: '-15%',
    rating: 92,
    tags: ['Action', 'Adventure']
  },
  {
    id: 2,
    title: 'Stellar Frontier',
    image: 'https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGV4cGxvcmF0aW9uJTIwZ2FtZXxlbnwxfHx8fDE3Njk2MTg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '$29.99',
    discount: null,
    rating: 88,
    tags: ['Space', 'Exploration']
  },
  {
    id: 3,
    title: 'Nightmare Protocol',
    image: 'https://images.unsplash.com/photo-1769107871686-4415f15e1932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzY5NjA3MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '$19.99',
    discount: '-25%',
    rating: 90,
    tags: ['Horror', 'Survival']
  },
  {
    id: 4,
    title: 'Realm of Legends',
    image: 'https://images.unsplash.com/photo-1762219214808-154d74e0d761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGdhbWUlMjBmYW50YXN5fGVufDF8fHx8MTc2OTYxODY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '$34.99',
    discount: null,
    rating: 95,
    tags: ['Fantasy', 'RPG']
  }
];

export function RecommendedGames() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 280;
  const gap = 16;
  const maxScroll = (recommendedGames.length - 3) * (cardWidth + gap);
  
  const handleScroll = (direction: 'left' | 'right') => {
    setScrollPosition((prev) => {
      const newPos = direction === 'left' 
        ? Math.max(0, prev - (cardWidth + gap))
        : Math.min(maxScroll, prev + (cardWidth + gap));
      return newPos;
    });
  };

  return (
    <section className="px-6 py-8 mt-6" style={{
      backgroundColor: 'var(--steam-card-bg)',
      borderTop: '1px solid var(--steam-border)'
    }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl" style={{ color: 'var(--steam-text-primary)' }}>
          You Might Also Like
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={scrollPosition === 0}
            className="w-9 h-9 rounded flex items-center justify-center border transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--steam-hover-bg)',
              borderColor: 'var(--steam-border)',
              color: 'var(--steam-text-primary)'
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={scrollPosition >= maxScroll}
            className="w-9 h-9 rounded flex items-center justify-center border transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--steam-hover-bg)',
              borderColor: 'var(--steam-border)',
              color: 'var(--steam-text-primary)'
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Games Carousel */}
      <div className="overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {recommendedGames.map((game) => (
            <div
              key={game.id}
              className="shrink-0 rounded-lg overflow-hidden border group cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                width: `${cardWidth}px`,
                backgroundColor: 'var(--steam-hover-bg)',
                borderColor: 'var(--steam-border)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Game Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <ImageWithFallback
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {game.discount && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold" style={{
                    backgroundColor: 'var(--steam-green)',
                    color: 'white'
                  }}>
                    {game.discount}
                  </div>
                )}
              </div>
              
              {/* Game Info */}
              <div className="p-4">
                <h3 className="mb-2 truncate" style={{ color: 'var(--steam-text-primary)' }}>
                  {game.title}
                </h3>
                
                {/* Tags */}
                <div className="flex gap-1.5 mb-3">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: 'var(--steam-card-bg)',
                        color: 'var(--steam-text-muted)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Rating and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" style={{ color: 'var(--steam-blue)' }} />
                    <span className="text-sm" style={{ color: 'var(--steam-blue)' }}>
                      {game.rating}%
                    </span>
                  </div>
                  <div className="text-sm" style={{ 
                    color: game.discount ? 'var(--steam-green)' : 'var(--steam-text-primary)'
                  }}>
                    {game.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
