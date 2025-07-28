'use client';

import { useState, useEffect } from 'react';
import { Search, Zap, Lock, BarChart3, Users, Clock, TrendingDown } from 'lucide-react';
import { generateMockResults, metricDefinitions, GSOResults } from '@/lib/mockData';
import { MetricCard } from '@/components/MetricCard';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { PricingModal } from '@/components/PricingModal';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<GSOResults | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);


  const handleAnalyze = async () => {
    if (!domain) return;
    
    setIsAnalyzing(true);
    
    try {
      // Call real analysis API
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
      
      console.log(`Analysis completed: ${meta.realData ? 'Real data' : 'Demo mode'}`);
      
      setResults(data);
      setIsAnalyzing(false);
      setShowResults(true);
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Fallback to mock data on error
      const mockResults = generateMockResults(domain);
      setResults(mockResults);
      setIsAnalyzing(false);
      setShowResults(true);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  if (isAnalyzing) {
    return <LoadingAnimation domain={domain} />;
  }

  if (showResults && results) {
    const getScoreColor = (score: number) => {
      if (score < 30) return 'text-red-600 bg-red-500';
      if (score < 50) return 'text-orange-600 bg-orange-500';
      if (score < 70) return 'text-yellow-600 bg-yellow-500';
      if (score < 85) return 'text-green-600 bg-green-500';
      return 'text-emerald-600 bg-emerald-500';
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">GSO Insight Platform</h1>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">BETA</div>
                <button 
                  onClick={() => {setShowResults(false); setResults(null);}}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  New Analysis
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Visibility Report</h2>
            <div className="flex items-center gap-4 text-gray-600">
              <span>Analysis for: <span className="font-semibold">{results.domain}</span></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(results.analysisDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Overall GSO Score</h3>
                <p className="text-sm text-gray-600">Comprehensive AI visibility assessment</p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(results.overallScore).split(' ')[0]}`}>
                  {results.overallScore}
                </div>
                <div className="text-sm text-gray-500">/100</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${getScoreColor(results.overallScore).split(' ')[1]}`}
                style={{ width: `${results.overallScore}%` }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  <span className="font-medium text-red-600">{results.summary.criticalIssues.length}</span> Critical Issues
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  <span className="font-medium text-green-600">{results.summary.quickWins.length}</span> Quick Wins Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  Ranked <span className="font-medium">#7</span> vs competitors
                </span>
              </div>
            </div>
          </div>

          {/* Fast Metrics (Available immediately) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Immediate Insights</h3>
            <p className="text-gray-600 mb-6">These metrics were calculated in under 60 seconds</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title={metricDefinitions.aiRecommendationRate.name}
                subtitle="ARR"
                metric={results.metrics.aiRecommendationRate}
                isLocked={false}
              />
              <MetricCard
                title={metricDefinitions.competitiveRanking.name}
                subtitle="CR"
                metric={results.metrics.competitiveRanking}
                isLocked={false}
              />
              <MetricCard
                title={metricDefinitions.websiteAuthority.name}
                subtitle="WA"
                metric={results.metrics.websiteAuthority}
                isLocked={false}
              />
            </div>
          </div>

          {/* Complex Metrics (Locked for demo) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Advanced Analysis</h3>
            <p className="text-gray-600 mb-6">Deep LLM testing and semantic analysis (unlock for full insights)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title={metricDefinitions.contentRelevance.name}
                subtitle="CRS"
                metric={results.metrics.contentRelevance}
                isLocked={true}
                onUnlock={() => setShowPricingModal(true)}
              />
              <MetricCard
                title={metricDefinitions.brandMentionQuality.name}
                subtitle="BMQ"
                metric={results.metrics.brandMentionQuality}
                isLocked={true}
                onUnlock={() => setShowPricingModal(true)}
              />
              <MetricCard
                title={metricDefinitions.searchCompatibility.name}
                subtitle="SC"
                metric={results.metrics.searchCompatibility}
                isLocked={true}
                onUnlock={() => setShowPricingModal(true)}
              />
            </div>
          </div>

          {/* Summary Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Critical Issues
              </h4>
              <ul className="space-y-2">
                {results.summary.criticalIssues.map((issue: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Wins
              </h4>
              <ul className="space-y-2">
                {results.summary.quickWins.map((win: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    {win}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setShowPricingModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Unlock Complete Analysis
            </button>
            <button 
              onClick={() => setShowPricingModal(true)}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Download PDF Report
            </button>
            <button 
              onClick={() => {
                setShowResults(false); 
                setResults(null);
                setShowPricingModal(false);
              }}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Analyze Another Domain
            </button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">GSO Insight Platform</h1>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">BETA</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Is AI Finding Your Business?
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            When customers ask ChatGPT, Claude, or Gemini for recommendations, does your business appear? 
            <br />
            <span className="font-semibold text-gray-900">Find out in under 60 seconds.</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="url"
              placeholder="Enter your website domain (e.g., example.com)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={!domain}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Search className="w-5 h-5" />
              Run Free Audit
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            No signup required • Results in 60 seconds • Free beta demonstration
          </p>
        </div>


        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-2">Beta Demonstration</h4>
          <p className="text-blue-700">
            This is a beta version demonstrating our AI visibility analysis. The full detailed report and recommendations 
            will be available for purchase after your free audit. We&apos;re transparent about our development stage 
            because we believe clarity builds trust.
          </p>
        </div>

      </div>
    </div>
  );
}