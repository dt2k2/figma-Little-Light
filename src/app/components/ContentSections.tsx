import { Star, ThumbsUp, Award } from 'lucide-react';

const features = [
  'Investigate crimes using AI-powered detective tools and analyze evidence in real-time',
  'Explore a branching narrative with multiple endings based on your choices and deductions',
  'Uncover an alternate reality game (ARG) that blurs the boundaries between game and reality'
];

const systemReqs = {
  minimum: {
    os: 'Windows 10 64-bit',
    processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
    memory: '8 GB RAM',
    graphics: 'NVIDIA GTX 1060 / AMD RX 580',
    storage: '25 GB available space'
  },
  recommended: {
    os: 'Windows 11 64-bit',
    processor: 'Intel Core i7-9700K / AMD Ryzen 7 3700X',
    memory: '16 GB RAM',
    graphics: 'NVIDIA RTX 3060 / AMD RX 6700 XT',
    storage: '25 GB SSD'
  }
};

const reviews = [
  {
    id: 1,
    author: 'MysteryGamer_92',
    hours: 42.5,
    rating: 'positive',
    text: 'An incredibly immersive detective experience. The AI mechanics are mind-blowing and the story kept me guessing until the very end. Highly recommended!'
  },
  {
    id: 2,
    author: 'DetectiveFan',
    hours: 28.3,
    rating: 'positive',
    text: 'The ARG elements are genius! This game goes beyond just playing - it makes you think and investigate outside the game itself. A masterpiece of interactive storytelling.'
  },
  {
    id: 3,
    author: 'CyberSleuth',
    hours: 67.2,
    rating: 'positive',
    text: "Best detective game I've played in years. The atmosphere is dark and gripping, and the AI integration feels natural and innovative. Can't wait for the full release!"
  }
];

export function ContentSections() {
  return (
    <div className="space-y-6 pb-6">
      {/* About This Game */}
      <section className="rounded-lg p-6" style={{
        backgroundColor: 'var(--steam-card-bg)',
        border: '1px solid var(--steam-border)'
      }}>
        <h2 className="text-xl mb-4" style={{ color: 'var(--steam-text-primary)' }}>
          About This Game
        </h2>
        <p className="leading-relaxed" style={{ color: 'var(--steam-text-secondary)' }}>
          Step into the shoes of a detective in a world where the line between human intelligence and artificial intelligence has become dangerously blurred. Mật Mã Biện Chứng (The Dialectical Code) is a narrative-driven mystery game that challenges you to solve cognitive logic loops using cutting-edge AI technology and philosophical decryption.
          <br /><br />
          As you investigate increasingly complex cases, you'll discover that your AI assistant might know more than it's letting on. Every choice matters, every clue counts, and the truth you uncover could change everything you thought you knew about reality.
        </p>
      </section>
      
      {/* Key Features */}
      <section className="rounded-lg p-6" style={{
        backgroundColor: 'var(--steam-card-bg)',
        border: '1px solid var(--steam-border)'
      }}>
        <h2 className="text-xl mb-4" style={{ color: 'var(--steam-text-primary)' }}>
          Key Features
        </h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--steam-blue)' }} />
              <p style={{ color: 'var(--steam-text-secondary)' }}>{feature}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* System Requirements */}
      <section className="rounded-lg p-6" style={{
        backgroundColor: 'var(--steam-card-bg)',
        border: '1px solid var(--steam-border)'
      }}>
        <h2 className="text-xl mb-4" style={{ color: 'var(--steam-text-primary)' }}>
          System Requirements
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Minimum */}
          <div>
            <h3 className="text-sm mb-3 pb-2 border-b" style={{ 
              color: 'var(--steam-text-primary)',
              borderColor: 'var(--steam-border)'
            }}>
              Minimum
            </h3>
            <div className="space-y-2 text-sm">
              {Object.entries(systemReqs.minimum).map(([key, value]) => (
                <div key={key}>
                  <span style={{ color: 'var(--steam-text-muted)' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                  </span>
                  <span style={{ color: 'var(--steam-text-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommended */}
          <div>
            <h3 className="text-sm mb-3 pb-2 border-b" style={{ 
              color: 'var(--steam-text-primary)',
              borderColor: 'var(--steam-border)'
            }}>
              Recommended
            </h3>
            <div className="space-y-2 text-sm">
              {Object.entries(systemReqs.recommended).map(([key, value]) => (
                <div key={key}>
                  <span style={{ color: 'var(--steam-text-muted)' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                  </span>
                  <span style={{ color: 'var(--steam-text-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Preview */}
      <section className="rounded-lg p-6" style={{
        backgroundColor: 'var(--steam-card-bg)',
        border: '1px solid var(--steam-border)'
      }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl" style={{ color: 'var(--steam-text-primary)' }}>
            Reviews
          </h2>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" style={{ color: 'var(--steam-blue)' }} />
            <span className="text-sm" style={{ color: 'var(--steam-blue)' }}>94% Positive</span>
          </div>
        </div>
        
        {/* Rating Bars */}
        <div className="mb-6 space-y-2">
          {[
            { label: 'Positive', value: 94, color: 'var(--steam-blue)' },
            { label: 'Mixed', value: 4, color: 'var(--steam-text-muted)' },
            { label: 'Negative', value: 2, color: '#c23030' }
          ].map((rating) => (
            <div key={rating.label} className="flex items-center gap-3">
              <span className="text-xs w-16" style={{ color: 'var(--steam-text-muted)' }}>
                {rating.label}
              </span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--steam-hover-bg)' }}>
                <div 
                  className="h-full transition-all"
                  style={{ 
                    width: `${rating.value}%`,
                    backgroundColor: rating.color
                  }}
                />
              </div>
              <span className="text-xs w-10 text-right" style={{ color: 'var(--steam-text-secondary)' }}>
                {rating.value}%
              </span>
            </div>
          ))}
        </div>
        
        {/* Review Cards */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="p-4 rounded border"
              style={{
                backgroundColor: 'var(--steam-hover-bg)',
                borderColor: 'var(--steam-border)'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                    backgroundColor: 'var(--steam-card-bg)'
                  }}>
                    <span className="text-xs" style={{ color: 'var(--steam-text-primary)' }}>
                      {review.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: 'var(--steam-text-primary)' }}>
                      {review.author}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--steam-text-muted)' }}>
                      {review.hours} hours played
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded" style={{
                  backgroundColor: review.rating === 'positive' ? 'rgba(102, 192, 244, 0.1)' : 'rgba(194, 48, 48, 0.1)'
                }}>
                  <ThumbsUp className="w-3.5 h-3.5" style={{
                    color: review.rating === 'positive' ? 'var(--steam-blue)' : '#c23030'
                  }} />
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--steam-text-secondary)' }}>
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
