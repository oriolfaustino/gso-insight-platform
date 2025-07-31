import { Header } from '@/components/Header';
import { BarChart3, Search, TrendingUp, Users, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            About GSO Insight
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We help businesses understand and optimize their visibility to AI systems, 
            ensuring they're discoverable when customers ask AI for recommendations.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-3xl p-12 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              As AI becomes the primary way customers discover businesses, we bridge the gap between 
              traditional SEO and AI visibility. Our platform analyzes how AI systems perceive your 
              business and provides actionable insights to improve your AI discoverability.
            </p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When potential customers ask ChatGPT, Claude, or Gemini for business recommendations, 
              many companies are invisible. Traditional SEO doesn't guarantee AI visibility, and 
              businesses need new strategies to ensure they're recommended by AI systems.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <Search className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                AI systems use different ranking factors than search engines
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                Content optimization for AI requires specialized knowledge
              </li>
              <li className="flex items-start gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                No standardized metrics for AI visibility existed
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              GSO Insight pioneered the first comprehensive AI visibility analysis platform. 
              We've developed proprietary metrics that measure how AI systems perceive and 
              rank businesses across multiple factors.
            </p>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h4>
                <p className="text-sm text-gray-600">10+ proprietary metrics covering content relevance, brand authority, and AI compatibility</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Actionable Insights</h4>
                <p className="text-sm text-gray-600">Specific recommendations to improve your AI visibility and discoverability</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Industry Benchmarking</h4>
                <p className="text-sm text-gray-600">Compare your performance against industry averages and competitors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-3xl p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Platform Impact</h3>
            <p className="text-gray-300">Helping businesses succeed in the AI-first world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-300">Websites Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-300">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-sm text-gray-600">We deliver the most accurate and comprehensive AI visibility analysis available</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer Success</h4>
              <p className="text-sm text-gray-600">Your success in AI visibility is our primary measure of achievement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">We continuously evolve our platform as AI systems and technologies advance</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-violet-50 rounded-3xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Improve Your AI Visibility?</h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already optimizing their presence for AI systems. 
            Get your free analysis in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Start Free Analysis
            </a>
            <a 
              href="/login" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Member Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}