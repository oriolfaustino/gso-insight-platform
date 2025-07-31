import { Header } from '@/components/Header';
import { BarChart3, Search, TrendingUp, Users, Award, Globe, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
               style={{ 
                 backgroundImage: `radial-gradient(circle at 2px 2px, var(--neutral-400) 1px, transparent 0)`,
                 backgroundSize: '40px 40px'
               }} />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-32">
          <div className="text-center">
            <div className="animate-fade-in-up mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
                   style={{ 
                     background: 'var(--neutral-50)', 
                     borderColor: 'var(--neutral-200)',
                     color: 'var(--neutral-700)'
                   }}>
                <div className="w-2 h-2 rounded-full animate-pulse" 
                     style={{ background: 'var(--primary-500)' }} />
                <span className="font-body text-sm font-medium">About Our Mission</span>
              </div>
            </div>
            
            <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto overflow-hidden" 
                   style={{ background: 'var(--gradient-primary)' }}>
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-2 rounded-3xl opacity-20 blur-xl"
                   style={{ background: 'var(--gradient-primary)' }} />
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-8 animate-fade-in-up"
                style={{ 
                  color: 'var(--neutral-900)',
                  animationDelay: '0.2s',
                  animationFillMode: 'backwards'
                }}>
              About 
              <span className="text-gradient">GSO Insight</span>
            </h1>
            <p className="font-body text-xl lg:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto animate-fade-in-up"
               style={{ 
                 color: 'var(--neutral-600)',
                 animationDelay: '0.3s',
                 animationFillMode: 'backwards'
               }}>
              We help businesses understand and optimize their visibility to AI systems, 
              ensuring they're discoverable when customers ask AI for recommendations.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 pb-24">

        {/* Mission Section */}
        <div className="card-premium p-16 mb-20 animate-fade-in-up glass" 
             style={{ 
               boxShadow: 'var(--shadow-2xl)',
               animationDelay: '0.4s',
               animationFillMode: 'backwards'
             }}>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8"
                 style={{ 
                   background: 'var(--primary-100)', 
                   color: 'var(--primary-700)'
                 }}>
              <Sparkles className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Our Mission</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl mb-6" style={{ color: 'var(--neutral-900)' }}>
              Bridging Business & AI
            </h2>
            <p className="font-body text-xl leading-relaxed max-w-4xl mx-auto" 
               style={{ color: 'var(--neutral-600)' }}>
              As AI becomes the primary way customers discover businesses, we bridge the gap between 
              traditional SEO and AI visibility. Our platform analyzes how AI systems perceive your 
              business and provides actionable insights to improve your AI discoverability.
            </p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
                 style={{ 
                   background: 'var(--accent-rose)', 
                   color: 'white'
                 }}>
              <span className="font-body text-sm font-medium">The Challenge</span>
            </div>
            <h3 className="font-display text-3xl mb-6" style={{ color: 'var(--neutral-900)' }}>
              Invisible to AI Systems
            </h3>
            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--neutral-600)' }}>
              When potential customers ask ChatGPT, Claude, or Gemini for business recommendations, 
              many companies are invisible. Traditional SEO doesn't guarantee AI visibility, and 
              businesses need new strategies to ensure they're recommended by AI systems.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" 
                     style={{ background: 'var(--primary-100)' }}>
                  <Search className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div>
                  <p className="font-body font-medium mb-1" style={{ color: 'var(--neutral-800)' }}>
                    Different Ranking Factors
                  </p>
                  <p className="font-body text-sm" style={{ color: 'var(--neutral-600)' }}>
                    AI systems use different ranking factors than search engines
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" 
                     style={{ background: 'var(--primary-100)' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div>
                  <p className="font-body font-medium mb-1" style={{ color: 'var(--neutral-800)' }}>
                    Specialized Knowledge Required
                  </p>
                  <p className="font-body text-sm" style={{ color: 'var(--neutral-600)' }}>
                    Content optimization for AI requires specialized knowledge
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" 
                     style={{ background: 'var(--primary-100)' }}>
                  <BarChart3 className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div>
                  <p className="font-body font-medium mb-1" style={{ color: 'var(--neutral-800)' }}>
                    No Standard Metrics
                  </p>
                  <p className="font-body text-sm" style={{ color: 'var(--neutral-600)' }}>
                    No standardized metrics for AI visibility existed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
                 style={{ 
                   background: 'var(--accent-emerald)', 
                   color: 'white'
                 }}>
              <span className="font-body text-sm font-medium">Our Solution</span>
            </div>
            <h3 className="font-display text-3xl mb-6" style={{ color: 'var(--neutral-900)' }}>
              Pioneering AI Visibility
            </h3>
            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--neutral-600)' }}>
              GSO Insight pioneered the first comprehensive AI visibility analysis platform. 
              We've developed proprietary metrics that measure how AI systems perceive and 
              rank businesses across multiple factors.
            </p>
            <div className="space-y-6">
              <div className="card-premium p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="font-heading text-lg mb-3" style={{ color: 'var(--neutral-900)' }}>
                  Comprehensive Analysis
                </h4>
                <p className="font-body text-sm" style={{ color: 'var(--neutral-600)' }}>
                  10+ proprietary metrics covering content relevance, brand authority, and AI compatibility
                </p>
              </div>
              <div className="card-premium p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="font-heading text-lg mb-3" style={{ color: 'var(--neutral-900)' }}>
                  Actionable Insights
                </h4>
                <p className="font-body text-sm" style={{ color: 'var(--neutral-600)' }}>
                  Specific recommendations to improve your AI visibility and discoverability
                </p>
              </div>
              <div className="card-premium p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="font-heading text-lg mb-3" style={{ color: 'var(--neutral-900)' }}>
                  Industry Benchmarking
                </h4>
                <p className="font-body text-sm" style={{ color: 'var(--neutral-600)' }}>
                  Compare your performance against industry averages and competitors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="card-premium p-16 mb-24 animate-fade-in-up"
             style={{ 
               background: 'var(--gradient-secondary)',
               animationDelay: '0.7s',
               animationFillMode: 'backwards'
             }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8"
                 style={{ 
                   background: 'rgba(255, 255, 255, 0.1)', 
                   color: 'white'
                 }}>
              <Sparkles className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Platform Impact</span>
            </div>
            <h3 className="font-display text-4xl mb-4 text-white">
              Trusted by Thousands
            </h3>
            <p className="font-body text-xl text-gray-300">
              Helping businesses succeed in the AI-first world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="font-display text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                10,000+
              </div>
              <div className="font-body text-lg text-gray-300">Websites Analyzed</div>
            </div>
            <div className="text-center group">
              <div className="font-display text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <div className="font-body text-lg text-gray-300">Accuracy Rate</div>
            </div>
            <div className="text-center group">
              <div className="font-display text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                4.8/5
              </div>
              <div className="font-body text-lg text-gray-300">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-24 animate-fade-in-up" 
             style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8"
               style={{ 
                 background: 'var(--accent-violet)', 
                 color: 'white'
               }}>
            <Sparkles className="w-4 h-4" />
            <span className="font-body text-sm font-medium">Our Values</span>
          </div>
          <h3 className="font-display text-4xl lg:text-5xl mb-16" style={{ color: 'var(--neutral-900)' }}>
            What Drives Us Forward
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110" 
                     style={{ background: 'var(--primary-100)' }}>
                  <Award className="w-10 h-10" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: 'var(--gradient-primary)', filter: 'blur(8px)' }} />
              </div>
              <h4 className="font-heading text-xl mb-4" style={{ color: 'var(--neutral-900)' }}>
                Excellence
              </h4>
              <p className="font-body leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                We deliver the most accurate and comprehensive AI visibility analysis available
              </p>
            </div>
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110" 
                     style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Users className="w-10 h-10" style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: 'var(--accent-emerald)', filter: 'blur(8px)' }} />
              </div>
              <h4 className="font-heading text-xl mb-4" style={{ color: 'var(--neutral-900)' }}>
                Customer Success
              </h4>
              <p className="font-body leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                Your success in AI visibility is our primary measure of achievement
              </p>
            </div>
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110" 
                     style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                  <Globe className="w-10 h-10" style={{ color: 'var(--accent-violet)' }} />
                </div>
                <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: 'var(--accent-violet)', filter: 'blur(8px)' }} />
              </div>
              <h4 className="font-heading text-xl mb-4" style={{ color: 'var(--neutral-900)' }}>
                Innovation
              </h4>
              <p className="font-body leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                We continuously evolve our platform as AI systems and technologies advance
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card-premium p-16 text-center glass animate-fade-in-up" 
             style={{ 
               boxShadow: 'var(--shadow-2xl)',
               animationDelay: '0.9s',
               animationFillMode: 'backwards'
             }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8"
               style={{ 
                 background: 'var(--primary-100)', 
                 color: 'var(--primary-700)'
               }}>
            <Sparkles className="w-4 h-4" />
            <span className="font-body text-sm font-medium">Get Started</span>
          </div>
          <h3 className="font-display text-4xl lg:text-5xl mb-6" style={{ color: 'var(--neutral-900)' }}>
            Ready to Improve Your 
            <span className="text-gradient">AI Visibility?</span>
          </h3>
          <p className="font-body text-xl leading-relaxed mb-12 max-w-3xl mx-auto" 
             style={{ color: 'var(--neutral-600)' }}>
            Join thousands of businesses already optimizing their presence for AI systems. 
            Get your free analysis in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/" 
              className="btn-primary px-10 py-4 text-lg font-semibold inline-flex items-center justify-center gap-3"
            >
              <Search className="w-5 h-5" />
              Start Free Analysis
            </a>
            <a 
              href="/login" 
              className="btn-secondary px-10 py-4 text-lg font-semibold"
            >
              Member Login
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t mt-32" style={{ borderColor: 'var(--neutral-200)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="font-body text-sm" style={{ color: 'var(--neutral-500)' }}>
              Professional AI visibility analysis platform • Trusted by innovative businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}