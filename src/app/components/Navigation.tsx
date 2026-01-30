import React from 'react';
import { Search, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

const menuItems = {
  Store: [
    { label: 'Home', href: '#' },
    { label: 'Discovery Queue', href: '#' },
    { label: 'Wishlist', href: '#' },
    { label: 'Points Shop', href: '#' },
  ],
  Library: [
    { label: 'Games', href: '#' },
    { label: 'Collections', href: '#' },
    { label: 'Screenshots', href: '#' },
    { label: 'News', href: '#' },
  ],
  Community: [
    { label: 'Home', href: '#' },
    { label: 'Discussions', href: '#' },
    { label: 'Workshop', href: '#' },
    { label: 'Screenshots', href: '#' },
    { label: 'Videos', href: '#' },
    { label: 'Reviews', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Support', href: '#' },
    { label: 'Bugs & Issues', href: '#' },
  ],
};

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b" style={{
      backgroundColor: 'var(--steam-dark-bg)',
      borderColor: 'var(--steam-border)'
    }}>
      <div className="px-6 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Store Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm tracking-wider font-semibold" style={{ color: 'var(--steam-text-primary)' }}>
              STEAM
            </span>
          </div>
          
          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {Object.entries(menuItems).map(([title, items]) => (
              <DropdownMenu key={title}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="text-sm transition-colors hover:opacity-80 flex items-center gap-1"
                    style={{ color: 'var(--steam-text-primary)' }}
                  >
                    {title}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  style={{
                    backgroundColor: 'var(--steam-card-bg)',
                    borderColor: 'var(--steam-border)',
                  }}
                >
                  {items.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <DropdownMenuItem
                        asChild
                        style={{
                          color: 'var(--steam-text-primary)',
                        }}
                      >
                        <a href={item.href} className="cursor-pointer hover:opacity-80">
                          {item.label}
                        </a>
                      </DropdownMenuItem>
                      {index < items.length - 1 && <DropdownMenuSeparator />}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
        
        {/* Search + User */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--steam-text-muted)' }} />
            <input
              type="text"
              placeholder="Search the store..."
              className="pl-10 pr-4 py-2 rounded text-sm border outline-none focus:border-opacity-30 transition-colors"
              style={{
                backgroundColor: 'var(--steam-card-bg)',
                borderColor: 'var(--steam-border)',
                color: 'var(--steam-text-primary)',
                width: '280px'
              }}
            />
          </div>
          
          {/* User Profile */}
          <button className="flex items-center gap-2 px-3 py-2 rounded transition-colors hover:opacity-80" style={{
            backgroundColor: 'var(--steam-card-bg)',
            color: 'var(--steam-text-primary)'
          }}>
            <User className="w-4 h-4" />
            <span className="text-sm">Profile</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
