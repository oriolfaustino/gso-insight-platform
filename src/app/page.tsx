'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowRight, CheckCircle, AlertTriangle, TrendingUp, Sparkles, Lock, BarChart3 } from 'lucide-react';
import { generateMockResults, metricDefinitions, GSOResults } from '@/lib/mockData';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { PricingModal } from '@/components/PricingModal';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<GSOResults | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = async () => {
    if (!domain) return;
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const { data, meta } = await response.json();
      
      setResults(data);
      setIsAnalyzing(false);
      setShowResults(true);
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      const mockResults = generateMockResults(domain);
      setResults(mockResults);
      setIsAnalyzing(false);
      setShowResults(true);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (isAnalyzing) {
    return <LoadingAnimation domain={domain} />;
  }

  if (showResults && results) {
    const getScoreGradient = (score: number) => {
      if (score < 30) return 'bg-gradient-to-r from-red-500 to-red-600';
      if (score < 50) return 'bg-gradient-to-r from-orange-500 to-orange-600';
      if (score < 70) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      if (score < 85) return 'bg-gradient-to-r from-green-500 to-green-600';
      return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    };

    const getScoreColor = (score: number) => {
      if (score < 30) return 'text-red-600';
      if (score < 50) return 'text-orange-600';
      if (score < 70) return 'text-yellow-600';
      if (score < 85) return 'text-green-600';
      return 'text-emerald-600';
    };

    const getBenchmarkStatusColor = (status: string) => {
      switch (status) {
        case 'excellent': return 'text-emerald-600 bg-emerald-50';
        case 'above_average': return 'text-green-600 bg-green-50';
        case 'average': return 'text-blue-600 bg-blue-50';
        case 'below_average': return 'text-orange-600 bg-orange-50';
        case 'poor': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    const getBenchmarkStatusText = (status: string) => {
      switch (status) {
        case 'excellent': return 'Excellent';
        case 'above_average': return 'Above Average';
        case 'average': return 'Average';
        case 'below_average': return 'Below Average';
        case 'poor': return 'Needs Work';
        default: return 'Unknown';
      }
    };

    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-900">GSO</div>
              <button 
                onClick={() => {setShowResults(false); setResults(null);}}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                New Analysis
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Analysis Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              AI Visibility Report
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {results.domain}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(results.analysisDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Overall Score Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-12 shadow-sm">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreGradient(results.overallScore)} mb-6`}>
                <span className="text-4xl font-bold text-white">{results.overallScore}</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overall GSO Score</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your website's visibility to AI systems and language models
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{results.summary.criticalIssues.length}</div>
                  <div className="text-sm text-gray-600">Critical Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{results.summary.quickWins.length}</div>
                  <div className="text-sm text-gray-600">Quick Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-gray-600">Areas Analyzed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Free Metrics - Always Visible */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Free Analysis</h3>
                <p className="text-sm text-gray-600">Available in your free report</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Included
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(results.metrics).slice(0, 3).map(([key, metric]) => (
                <div key={key} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {metricDefinitions[key as keyof typeof metricDefinitions]?.name || key}
                      </h4>
                      <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                        {metric.score}
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${getScoreGradient(metric.score)} flex items-center justify-center`}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Benchmark Comparison */}
                  {(metric as any).benchmark && (
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getBenchmarkStatusColor((metric as any).benchmark.status)}`}>
                          <BarChart3 className="w-3 h-3" />
                          {getBenchmarkStatusText((metric as any).benchmark.status)}
                        </div>
                        <span className="text-xs text-gray-500">{(metric as any).benchmark.industry}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Industry avg: {(metric as any).benchmark.industryAverage} • Overall avg: {(metric as any).benchmark.overallAverage}
                      </div>
                    </div>
                  )}
                  
                  {/* Key Insights */}
                  <div className="space-y-2">
                    {metric.insights?.slice(0, 2).map((insight: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Prompt */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-3xl p-8 mb-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Want the complete picture?</h3>
              <p className="text-gray-600 mb-6">
                Unlock 3 additional metrics with detailed recommendations and actionable insights.
              </p>
              <button
                onClick={() => setShowPricingModal(true)}
                className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Unlock Premium Analysis
              </button>
            </div>
          </div>

          {/* Premium Metrics - Locked */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Premium Analysis</h3>
                <p className="text-sm text-gray-600">Advanced insights and recommendations</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <Lock className="w-4 h-4" />
                Premium
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(results.metrics).slice(3, 6).map(([key, metric]) => (
                <div key={key} className="relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                  {/* Locked Overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {metricDefinitions[key as keyof typeof metricDefinitions]?.name || key}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">Unlock detailed analysis</p>
                      <button 
                        onClick={() => setShowPricingModal(true)}
                        className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        View Premium
                      </button>
                    </div>
                  </div>
                  
                  {/* Blurred Background Content */}
                  <div className="filter blur-sm pointer-events-none">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {metricDefinitions[key as keyof typeof metricDefinitions]?.name || key}
                        </h4>
                        <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                          {metric.score}
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${getScoreGradient(metric.score)} flex items-center justify-center`}>
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Benchmark Comparison (Blurred) */}
                    {(metric as any).benchmark && (
                      <div className="mb-3 pb-3 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getBenchmarkStatusColor((metric as any).benchmark.status)}`}>
                            <BarChart3 className="w-3 h-3" />
                            {getBenchmarkStatusText((metric as any).benchmark.status)}
                          </div>
                          <span className="text-xs text-gray-500">{(metric as any).benchmark.industry}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Industry avg: {(metric as any).benchmark.industryAverage} • Overall avg: {(metric as any).benchmark.overallAverage}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {metric.insights?.slice(0, 2).map((insight: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Critical Issues */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Critical Issues</h3>
                  <p className="text-sm text-gray-600">Urgent improvements needed</p>
                </div>
              </div>
              <div className="space-y-3">
                {results.summary.criticalIssues.map((issue: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-800">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Wins</h3>
                  <p className="text-sm text-gray-600">Easy improvements available</p>
                </div>
              </div>
              <div className="space-y-3">
                {results.summary.quickWins.map((win: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-800">{win}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to improve your AI visibility?</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get detailed recommendations and a step-by-step improvement plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowPricingModal(true)}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Get Complete Analysis
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setShowResults(false); 
                    setResults(null);
                  }}
                  className="border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Analyze Another Site
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Modal */}
        <PricingModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
          domain={results?.domain || domain || "example.com"}
          score={results?.overallScore}
        />
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-900">GSO</div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              Beta
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">AI Visibility Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            Is AI finding
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              your business?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            When customers ask ChatGPT, Claude, or Gemini for recommendations, 
            does your business appear? Find out in under 60 seconds.
          </p>
        </div>

        {/* Search Input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              placeholder="Enter your website domain"
              className="flex-1 px-6 py-4 border-0 rounded-xl focus:ring-0 focus:outline-none text-lg placeholder-gray-500"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={!domain}
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Search className="w-5 h-5" />
              Run Free Analysis
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-16">
          No signup required • Results in 60 seconds • Free demonstration
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Discovery</h3>
            <p className="text-gray-600 text-sm">See how AI systems find and recommend your business</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Insights</h3>
            <p className="text-gray-600 text-sm">Get actionable recommendations in under a minute</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Wins</h3>
            <p className="text-gray-600 text-sm">Simple changes that dramatically improve visibility</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Beta demonstration • Results are for educational purposes</p>
          </div>
        </div>
      </div>
    </div>
  );
}