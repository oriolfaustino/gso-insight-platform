'use client';

import { useState } from 'react';
import { Search, Menu, X, TrendingUp } from 'lucide-react';

interface HeaderProps {
  showNewAnalysisButton?: boolean;
  onNewAnalysis?: () => void;
}

const Logo = () => (
  <a href="/" className="flex items-center gap-4 hover:opacity-90 transition-all duration-200 group">
    <div className="relative">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" 
           style={{ background: 'var(--gradient-primary)' }}>
        <TrendingUp className="w-5 h-5 text-white" />
      </div>
      <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: 'var(--gradient-primary)', filter: 'blur(6px)', zIndex: -1 }} />
    </div>
    <div>
      <h1 className="font-display text-xl" style={{ color: 'var(--neutral-900)' }}>
        GSO Insight
      </h1>
      <p className="font-body text-xs" style={{ color: 'var(--neutral-500)' }}>
        AI Visibility Intelligence
      </p>
    </div>
  </a>
);

export function Header({ showNewAnalysisButton = false, onNewAnalysis }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 border-b" 
            style={{ borderColor: 'var(--neutral-200)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="/about" 
               className="font-body text-sm font-medium transition-all duration-200 hover:translate-y-[-1px]"
               style={{ color: 'var(--neutral-600)' }}
               onMouseEnter={(e) => e.target.style.color = 'var(--neutral-900)'}
               onMouseLeave={(e) => e.target.style.color = 'var(--neutral-600)'}>
              About
            </a>
            <a href="/login" 
               className="font-body text-sm font-medium transition-all duration-200 hover:translate-y-[-1px]"
               style={{ color: 'var(--neutral-600)' }}
               onMouseEnter={(e) => e.target.style.color = 'var(--neutral-900)'}
               onMouseLeave={(e) => e.target.style.color = 'var(--neutral-600)'}>
              Member Login
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            {showNewAnalysisButton ? (
              <button 
                onClick={onNewAnalysis}
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" />
                New Analysis
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                   style={{ 
                     background: 'var(--primary-50)', 
                     color: 'var(--primary-700)',
                     borderColor: 'var(--primary-200)'
                   }}>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--primary-500)' }}></div>
                Beta
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--neutral-600)' }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--neutral-900)';
              e.target.style.background = 'var(--neutral-100)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--neutral-600)';
              e.target.style.background = 'transparent';
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="animate-scale-in md:hidden py-6 border-t" 
               style={{ borderColor: 'var(--neutral-200)' }}>
            <nav className="flex flex-col gap-6">
              <a href="/about" 
                 className="font-body text-sm font-medium transition-colors"
                 style={{ color: 'var(--neutral-600)' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--neutral-900)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--neutral-600)'}>
                About
              </a>
              <a href="/login" 
                 className="font-body text-sm font-medium transition-colors"
                 style={{ color: 'var(--neutral-600)' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--neutral-900)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--neutral-600)'}>
                Member Login
              </a>
              {showNewAnalysisButton && (
                <button 
                  onClick={onNewAnalysis}
                  className="btn-primary inline-flex items-center gap-2 text-sm w-fit"
                >
                  <Search className="w-4 h-4" />
                  New Analysis
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}