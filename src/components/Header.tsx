'use client';

import { useState } from 'react';
import { Search, Menu, X, BarChart3 } from 'lucide-react';

interface HeaderProps {
  showNewAnalysisButton?: boolean;
  onNewAnalysis?: () => void;
}

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
      <BarChart3 className="w-5 h-5 text-white" />
    </div>
    <div>
      <h1 className="text-xl font-bold text-gray-900">GSO Insight</h1>
      <p className="text-xs text-gray-500 -mt-0.5">AI Visibility Platform</p>
    </div>
  </div>
);

export function Header({ showNewAnalysisButton = false, onNewAnalysis }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Member Login
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            {showNewAnalysisButton ? (
              <button 
                onClick={onNewAnalysis}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Search className="w-4 h-4" />
                New Analysis
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Beta
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <a href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Member Login
              </a>
              {showNewAnalysisButton && (
                <button 
                  onClick={onNewAnalysis}
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors w-fit"
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