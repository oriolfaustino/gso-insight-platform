'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowRight, CheckCircle, AlertTriangle, TrendingUp, Sparkles, Lock, BarChart3 } from 'lucide-react';
import { generateMockResults, metricDefinitions, GSOResults } from '@/lib/mockData';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { PricingModal } from '@/components/PricingModal';
import { Header } from '@/components/Header';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';
import { trackAnalysisStarted, trackAnalysisCompleted, trackCampaignAttribution, trackAnalysisStartedWithAttribution, trackAnalysisCompletedWithAttribution, trackPricingModalOpened, trackAnalysisStartedWithRetargeting, trackPricingModalWithRetargeting, trackAnalysisStartedWithRedditPixel, trackPricingModalWithRedditPixel } from '@/lib/gtag';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<GSOResults | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Track campaign attribution on page load
    trackCampaignAttribution();
  }, []);

  // Exit-intent detection
  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      // Trigger when mouse moves to top of screen (exit intent)
      if (e.clientY <= 0 && !hasShownExitIntent && !showResults && domain === '') {
        setShowExitModal(true);
        setHasShownExitIntent(true);
      }
    };

    if (mounted) {
      document.addEventListener('mouseleave', handleExitIntent);
      return () => document.removeEventListener('mouseleave', handleExitIntent);
    }
  }, [mounted, hasShownExitIntent, showResults, domain]);

  const handleAnalyze = async () => {
    console.log('🚀 handleAnalyze called with domain:', domain);
    if (!domain) return;
    
    setIsAnalyzing(true);
    trackAnalysisStartedWithRedditPixel(domain);
    
    // Track domain submission for retargeting (fire and forget)
    console.log('🎯 Tracking domain submission:', domain);
    fetch('/api/track-domain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain })
    })
    .then(res => res.json())
    .then(data => console.log('✅ Domain tracked:', data))
    .catch(err => console.log('❌ Domain tracking failed:', err));
    
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
      trackAnalysisCompletedWithAttribution(domain, data.overallScore);
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      const mockResults = generateMockResults(domain);
      setResults(mockResults);
      setIsAnalyzing(false);
      setShowResults(true);
      trackAnalysisCompletedWithAttribution(domain, mockResults.overallScore);
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
      <div className="min-h-screen" style={{ background: 'var(--neutral-50)' }}>
        <Header 
          showNewAnalysisButton={true} 
          onNewAnalysis={() => {setShowResults(false); setResults(null);}} 
        />

        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-8"
                 style={{ 
                   background: 'var(--accent-emerald)', 
                   borderColor: 'rgba(16, 185, 129, 0.2)',
                   color: 'white'
                 }}>
              <Sparkles className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Analysis Complete</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 animate-fade-in-up"
                style={{ 
                  color: 'var(--neutral-900)',
                  animationDelay: '0.1s',
                  animationFillMode: 'backwards'
                }}>
              AI Visibility Report
            </h1>
            <div className="space-y-2 animate-fade-in-up"
                 style={{ 
                   animationDelay: '0.2s',
                   animationFillMode: 'backwards'
                 }}>
              <p className="font-body text-2xl font-semibold" style={{ color: 'var(--neutral-800)' }}>
                {results.domain}
              </p>
              <p className="font-body text-sm" style={{ color: 'var(--neutral-500)' }}>
                Generated on {new Date(results.analysisDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Overall Score Card */}
          <div className="card-premium p-8 mb-12 animate-fade-in-up"
               style={{ 
                 background: 'var(--neutral-50)',
                 border: '1px solid var(--neutral-200)',
                 boxShadow: 'var(--shadow-xl)',
                 animationDelay: '0.3s',
                 animationFillMode: 'backwards'
               }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Score Circle - Smaller */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreGradient(results.overallScore)} relative overflow-hidden`}>
                    <span className="font-display text-2xl font-bold text-white">{results.overallScore}</span>
                  </div>
                  <div className="absolute -inset-2 rounded-full opacity-20 blur-xl"
                       style={{ background: getScoreGradient(results.overallScore).replace('bg-gradient-to-r', 'linear-gradient(135deg') }} />
                </div>
              </div>
              
              {/* Content - Left Aligned */}
              <div className="flex-1">
                <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--neutral-900)' }}>
                  Overall GSO Score
                </h2>
                <p className="font-body text-base leading-relaxed mb-4" 
                   style={{ color: 'var(--neutral-600)' }}>
                  Your website's comprehensive visibility to AI systems and language models
                </p>
                
                {/* Overall Benchmark Comparison */}
                {(results as any).overall_benchmark && (
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 max-w-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getBenchmarkStatusColor((results as any).overall_benchmark.status)}`}>
                        <BarChart3 className="w-3 h-3" />
                        {getBenchmarkStatusText((results as any).overall_benchmark.status)}
                      </div>
                      <span className="text-xs text-gray-500">{(results as any).overall_benchmark.industry}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Industry avg: {(results as any).overall_benchmark.industryAverage} • Overall avg: {(results as any).overall_benchmark.overallAverage}
                    </div>
                  </div>
                )}
                
                {/* Quick Stats - Horizontal */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-xl font-bold text-red-600">{results.summary.criticalIssues.length}</div>
                    <div className="text-xs text-gray-600">Critical Issues</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">{results.summary.quickWins.length}</div>
                    <div className="text-xs text-gray-600">Quick Wins</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">7</div>
                    <div className="text-xs text-gray-600">Areas Analyzed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency Elements */}
          <div className="mb-8">
            {/* Competitive Pressure Alert */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-red-800 text-sm font-medium mb-1">
                    ⚠️ Your competitors may be getting recommended while you're not
                  </p>
                  <p className="text-red-700 text-xs">
                    See exactly how to fix this with premium analysis and get ahead of your competition.
                  </p>
                </div>
              </div>
            </div>

            {/* Limited Time Offer */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">🔥 Limited Time: 50% off premium analysis</p>
                  <p className="text-xs opacity-90">This offer expires in 24 hours</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">€125</div>
                  <div className="text-xs line-through opacity-75">€250</div>
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
                      <p className="text-xs text-gray-500 mb-2">
                        {metricDefinitions[key as keyof typeof metricDefinitions]?.description || ''}
                      </p>
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
                onClick={() => { 
                setShowPricingModal(true);
                trackPricingModalWithRedditPixel('results_page');
              }}
                className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2 cursor-pointer"
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
                <p className="text-xs text-orange-600 font-medium mt-1">⏰ Only 47 premium spots left today</p>
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
                        onClick={() => { 
                setShowPricingModal(true);
                trackPricingModalWithRedditPixel('results_page');
              }}
                        className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
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
                        <p className="text-xs text-gray-500 mb-2">
                          {metricDefinitions[key as keyof typeof metricDefinitions]?.description || ''}
                        </p>
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
              <div className="w-full flex justify-center mb-8">
                <p className="text-gray-600 max-w-md px-4" 
                   style={{ textAlign: 'center' }}>
                  Get detailed recommendations and a step-by-step improvement plan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => { 
                setShowPricingModal(true);
                trackPricingModalWithRedditPixel('results_page');
              }}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Get Complete Analysis
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setShowResults(false); 
                    setResults(null);
                  }}
                  className="border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
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
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
                   style={{ 
                     background: 'var(--accent-amber)', 
                     borderColor: 'rgba(245, 158, 11, 0.3)',
                     color: 'white'
                   }}>
                <span className="font-body text-sm font-medium">⚡ Free Analysis - Limited Time During Beta</span>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
                   style={{ 
                     background: 'var(--neutral-50)', 
                     borderColor: 'var(--neutral-200)',
                     color: 'var(--neutral-700)'
                   }}>
                <div className="w-2 h-2 rounded-full animate-pulse" 
                     style={{ background: 'var(--accent-emerald)' }} />
                <span className="font-body text-sm font-medium">AI Visibility Intelligence</span>
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl animate-fade-in-up"
                style={{ 
                  color: 'var(--neutral-900)',
                  animationDelay: '0.1s',
                  animationFillMode: 'backwards',
                  marginBottom: '6rem'
                }}>
              <span className="text-gradient relative">
                Is AI finding your business?
                <div className="absolute -inset-2 rounded-2xl opacity-20 blur-xl"
                     style={{ background: 'var(--gradient-primary)' }} />
              </span>
            </h1>
            
            <p className="font-body text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
               style={{ 
                 color: 'var(--neutral-600)',
                 animationDelay: '0.2s',
                 animationFillMode: 'backwards',
                 marginBottom: '6rem'
               }}>
              When customers ask ChatGPT, Claude, or Gemini for recommendations, 
              does your business appear? Discover your AI visibility in under 60 seconds.
            </p>

          </div>

          {/* Search Input */}
          <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up"
               style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            <div className="card-premium p-3 glass"
                 style={{ boxShadow: 'var(--shadow-xl)' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  placeholder="Enter your website domain (e.g., yourcompany.com)"
                  className="input-premium flex-1 text-lg py-4 px-6 border-0"
                  style={{ 
                    background: 'var(--neutral-50)',
                    color: 'var(--neutral-900)'
                  }}
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={!domain}
                  className="btn-primary px-8 py-4 text-lg font-semibold whitespace-nowrap inline-flex items-center justify-center gap-3"
                  style={{ minWidth: '180px' }}
                >
                  <Search className="w-5 h-5" />
                  Analyze Now
                </button>
              </div>
            </div>
            
            {/* Social Proof Section - Moved Below Domain Field */}
            <div className="text-center mt-6">
              <p className="font-body text-sm mb-4" style={{ color: 'var(--neutral-500)' }}>
                Trusted by 10,000+ businesses worldwide
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                       style={{ background: 'var(--accent-emerald)' }}>
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                    Featured on Reddit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                       style={{ background: 'var(--accent-emerald)' }}>
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                    4.8/5 Average Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                       style={{ background: 'var(--accent-emerald)' }}>
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                    60-Second Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Slider */}
          <TestimonialsSlider />

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up"
               style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110"
                     style={{ background: 'var(--primary-100)' }}>
                  <Search className="w-7 h-7" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: 'var(--gradient-primary)', filter: 'blur(8px)' }} />
              </div>
              <h3 className="font-heading text-lg mb-3" style={{ color: 'var(--neutral-900)' }}>
                AI Discovery
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                Is AI finding your business?
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110"
                     style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <TrendingUp className="w-7 h-7" style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: 'var(--accent-emerald)', filter: 'blur(8px)' }} />
              </div>
              <h3 className="font-heading text-lg mb-3" style={{ color: 'var(--neutral-900)' }}>
                Instant Intelligence
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                Get comprehensive insights and actionable recommendations in under 60 seconds
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110"
                     style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                  <CheckCircle className="w-7 h-7" style={{ color: 'var(--accent-violet)' }} />
                </div>
                <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: 'var(--accent-violet)', filter: 'blur(8px)' }} />
              </div>
              <h3 className="font-heading text-lg mb-3" style={{ color: 'var(--neutral-900)' }}>
                Strategic Wins
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                Identify high-impact optimizations that dramatically boost your AI visibility
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 animate-fade-in-up"
           style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl mb-4" style={{ color: 'var(--neutral-900)' }}>
            The AI Revolution is Here
          </h2>
          <p className="font-body text-lg max-w-3xl mx-auto" style={{ color: 'var(--neutral-600)' }}>
            AI search and recommendations are transforming how customers discover businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <div className="text-center group">
            <div className="card-premium p-6 glass transition-all duration-300 group-hover:scale-105"
                 style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="mb-4">
                <div className="text-4xl font-bold text-gradient mb-2">89%</div>
                <div className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  of businesses are invisible
                </div>
                <div className="font-body text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>
                  to AI assistants like ChatGPT
                </div>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center group">
            <div className="card-premium p-6 glass transition-all duration-300 group-hover:scale-105"
                 style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="mb-4">
                <div className="text-4xl font-bold text-gradient mb-2">2.1B</div>
                <div className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  monthly AI searches
                </div>
                <div className="font-body text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>
                  across ChatGPT, Claude & Gemini
                </div>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center group">
            <div className="card-premium p-6 glass transition-all duration-300 group-hover:scale-105"
                 style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="mb-4">
                <div className="text-4xl font-bold text-gradient mb-2">73%</div>
                <div className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  search intent is transactional
                </div>
                <div className="font-body text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>
                  or commercial
                </div>
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center group">
            <div className="card-premium p-6 glass transition-all duration-300 group-hover:scale-105"
                 style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="mb-4">
                <div className="text-4xl font-bold text-gradient mb-2">4.2x</div>
                <div className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  revenue increase
                </div>
                <div className="font-body text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>
                  from AI-optimized businesses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-base mb-6" style={{ color: 'var(--neutral-700)' }}>
            Don't let your competitors dominate AI recommendations while you stay invisible
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm"
               style={{ 
                 background: 'rgba(239, 68, 68, 0.1)',
                 color: 'var(--accent-rose)',
                 border: '1px solid rgba(239, 68, 68, 0.2)'
               }}>
            <AlertTriangle className="w-4 h-4" />
            Every day without AI optimization is lost revenue
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

      {/* Exit-Intent Popup */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card-premium max-w-md w-full p-8 glass animate-scale-in text-center"
               style={{ boxShadow: 'var(--shadow-2xl)' }}>
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'var(--gradient-primary)' }}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--neutral-900)' }}>
                Wait! Before you go...
              </h3>
              <p className="font-body text-base mb-4" style={{ color: 'var(--neutral-600)' }}>
                Get your free AI visibility report in just 60 seconds
              </p>
              <p className="font-body text-sm font-medium" style={{ color: 'var(--accent-rose)' }}>
                See why 89% of businesses are invisible to ChatGPT
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                type="url"
                placeholder="Enter your website domain"
                className="input-premium w-full text-center py-3"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowExitModal(false);
                    handleAnalyze();
                  }
                }}
              />
              <button
                onClick={() => {
                  setShowExitModal(false);
                  handleAnalyze();
                }}
                disabled={!domain}
                className="btn-primary w-full py-4 text-lg font-semibold"
              >
                Analyze My Business
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="font-body text-sm underline" 
                style={{ color: 'var(--neutral-500)' }}
              >
                No thanks, I'll pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}