'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    rating: 5,
    quote: "Finally understand why our competitors were getting more AI referrals. The analysis showed exactly what to fix. Revenue from AI recommendations increased 40% in 2 months.",
    author: "Sarah Chen",
    title: "CEO at TechStart Solutions",
    company: "TechStart Solutions"
  },
  {
    id: 2,
    rating: 5,
    quote: "ChatGPT was never recommending our consulting firm. GSO Insight revealed we were missing key optimization signals. Now we're the top AI recommendation in our niche.",
    author: "Marcus Rodriguez",
    title: "Founder",
    company: "Growth Strategy Partners"
  },
  {
    id: 3,
    rating: 5,
    quote: "We thought our SEO was perfect, but AI visibility is completely different. This tool showed us blind spots we never knew existed. Game-changer for our business.",
    author: "Jennifer Wu",
    title: "Marketing Director",
    company: "InnovateNow Agency"
  },
  {
    id: 4,
    rating: 5,
    quote: "Spent months wondering why Claude and ChatGPT ignored our SaaS platform. 30 minutes with GSO Insight gave us the roadmap to fix everything. AI referrals up 300%.",
    author: "David Park",
    title: "Co-founder",
    company: "CloudSync Solutions"
  },
  {
    id: 5,
    rating: 5,
    quote: "As a digital marketing agency, staying ahead of AI trends is crucial. This analysis helped us optimize not just our business, but our clients' too. Incredible insights.",
    author: "Lisa Thompson",
    title: "Agency Owner",
    company: "Digital Edge Marketing"
  }
];

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up"
         style={{ animationDelay: '0.35s', animationFillMode: 'backwards' }}>
      <div className="relative">
        <div className="card-premium p-8 glass"
             style={{ boxShadow: 'var(--shadow-lg)' }}
             onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}>
          
          {/* Stars */}
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className="w-5 h-5 text-yellow-400">⭐</div>
              ))}
            </div>
          </div>
          
          {/* Quote */}
          <blockquote className="font-body text-lg italic mb-6 min-h-[100px] flex items-center justify-center" 
                      style={{ color: 'var(--neutral-700)' }}>
            "{currentTestimonial.quote}"
          </blockquote>
          
          {/* Author */}
          <cite className="font-body text-sm font-medium" 
                style={{ color: 'var(--neutral-600)' }}>
            {currentTestimonial.author}, {currentTestimonial.title}
            <br />
            <span className="text-xs opacity-75">{currentTestimonial.company}</span>
          </cite>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          style={{ color: 'var(--neutral-600)' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          style={{ color: 'var(--neutral-600)' }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8' 
                : 'hover:bg-opacity-60'
            }`}
            style={{ 
              background: index === currentIndex 
                ? 'var(--accent-emerald)' 
                : 'var(--neutral-300)'
            }}
          />
        ))}
      </div>

    </div>
  );
}