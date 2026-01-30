import { Star, Calendar, User, Building2 } from 'lucide-react';

export function Hero() {
  return (
    <div 
      className="relative pt-8 pb-20 px-6"
      style={{
        background: `linear-gradient(to bottom, var(--steam-gradient-start) 0%, var(--steam-gradient-end) 100%)`
      }}
    >
      <div className="max-w-[900px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--steam-text-muted)' }}>
          <span>Home</span>
          <span>/</span>
          <span>Browse</span>
          <span>/</span>
          <span style={{ color: 'var(--steam-text-secondary)' }}>Adventure</span>
        </div>
        
        {/* Game Title */}
        <h1 className="mb-2" style={{ 
          fontSize: '48px',
          fontWeight: '600',
          color: 'var(--steam-text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          Dư Quang (Lingering Light / Afterglow)
        </h1>
        
        {/* Tagline */}
        <p className="mb-6" style={{ 
          fontSize: '16px',
          color: 'var(--steam-text-secondary)',
          maxWidth: '600px'
        }}>
          Uncover the truth in a world where artificial intelligence blurs the line between reality and simulation
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center flex-wrap gap-6 mb-6">
          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--steam-blue)' }} />
              ))}
            </div>
            <span className="text-sm" style={{ color: 'var(--steam-blue)' }}>Very Positive</span>
            <span className="text-sm" style={{ color: 'var(--steam-text-muted)' }}>(12,847 reviews)</span>
          </div>
          
          {/* Release Date */}
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--steam-text-secondary)' }}>
            <Calendar className="w-4 h-4" />
            <span>Coming Soon - Q2 2026</span>
          </div>
        </div>
        
        {/* Developer Info */}
        <div className="flex items-center gap-6 mb-8 text-sm" style={{ color: 'var(--steam-text-secondary)' }}>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Developer:</span>
            <span style={{ color: 'var(--steam-blue)' }}>ThangBD</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Artish:</span>
            <span style={{ color: 'var(--steam-blue)' }}>INKIT: 3 cô gái Hà Lan</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="px-8 py-3 rounded transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, var(--steam-blue) 0%, var(--steam-blue-hover) 100%)',
              color: 'white',
              boxShadow: '0 2px 8px rgba(102, 192, 244, 0.3)'
            }}
          >
            Add to Wishlist
          </button>
          <button 
            className="px-8 py-3 rounded border transition-all hover:opacity-80"
            style={{
              backgroundColor: 'var(--steam-card-bg)',
              borderColor: 'var(--steam-border)',
              color: 'var(--steam-text-primary)'
            }}
          >
            Download Demo
          </button>
        </div>
      </div>
    </div>
  );
}
