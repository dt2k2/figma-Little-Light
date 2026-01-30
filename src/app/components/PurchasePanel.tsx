import { ShoppingCart, Heart, Share2, Monitor } from 'lucide-react';

const tags = ['Mystery', 'Detective', 'AI', 'ARG', 'Story-Rich', 'Singleplayer'];

export function PurchasePanel() {
  return (
    <div className="sticky top-20">
      <div className="rounded-lg overflow-hidden" style={{
        backgroundColor: 'var(--steam-card-bg)',
        border: '1px solid var(--steam-border)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Game Cover Image */}
        <div className="aspect-[3/4] w-full relative">
          <img
            src="https://images.unsplash.com/photo-1694855801642-cf7e422bfd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjeWJlcnB1bmslMjBteXN0ZXJpb3VzfGVufDF8fHx8MTc2OTYxODY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Dư Quang Cover"
            className="w-full h-full object-cover"
          />
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold" style={{
            backgroundColor: 'var(--steam-green)',
            color: 'white'
          }}>
            -20% Pre-order Discount
          </div>
        </div>
        
        <div className="p-5 space-y-4">
          {/* Price Section */}
          <div>
            <div className="text-xs mb-2" style={{ color: 'var(--steam-text-muted)' }}>
              Pre-order now
            </div>
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 rounded text-xs font-semibold" style={{
                backgroundColor: 'var(--steam-green)',
                color: 'white'
              }}>
                -20%
              </div>
              <div className="flex items-baseline gap-2">
                <span className="line-through text-sm" style={{ color: 'var(--steam-text-muted)' }}>
                  $2.49
                </span>
                <span className="text-2xl" style={{ 
                  color: 'var(--steam-green)',
                  fontWeight: '600'
                }}>
                  $1.99
                </span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <button className="w-full px-4 py-3 rounded flex items-center justify-center gap-2 transition-all hover:scale-[1.02]" style={{
              background: 'linear-gradient(90deg, var(--steam-green) 0%, #4a8a23 100%)',
              color: 'white',
              boxShadow: '0 2px 8px rgba(91, 163, 43, 0.3)'
            }}>
              <ShoppingCart className="w-5 h-5" />
              <span>Pre-order Now</span>
            </button>
            
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2.5 rounded flex items-center justify-center gap-2 border transition-colors hover:opacity-80" style={{
                backgroundColor: 'var(--steam-hover-bg)',
                borderColor: 'var(--steam-border)',
                color: 'var(--steam-text-primary)'
              }}>
                <Heart className="w-4 h-4" />
                <span className="text-sm">Wishlist</span>
              </button>
              <button className="px-4 py-2.5 rounded border transition-colors hover:opacity-80" style={{
                backgroundColor: 'var(--steam-hover-bg)',
                borderColor: 'var(--steam-border)',
                color: 'var(--steam-text-primary)'
              }}>
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Platform */}
          <div className="pt-4 border-t" style={{ borderColor: 'var(--steam-border)' }}>
            <div className="text-xs mb-2" style={{ color: 'var(--steam-text-muted)' }}>
              Platform
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{
                backgroundColor: 'var(--steam-hover-bg)',
                color: 'var(--steam-text-primary)'
              }}>
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-sm" style={{ color: 'var(--steam-text-secondary)' }}>
                Windows
              </span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="pt-4 border-t" style={{ borderColor: 'var(--steam-border)' }}>
            <div className="text-xs mb-3" style={{ color: 'var(--steam-text-muted)' }}>
              Popular Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 rounded text-xs transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--steam-hover-bg)',
                    color: 'var(--steam-text-secondary)',
                    border: '1px solid var(--steam-border)'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--steam-border)' }}>
            <div className="text-xs" style={{ color: 'var(--steam-text-muted)' }}>
              Features
            </div>
            {['Single-player', 'Steam Achievements', 'Full Controller Support', 'Cloud Saves'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--steam-text-secondary)' }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--steam-blue)' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}