export interface MetricResult {
  score: number;
  status: 'critical' | 'poor' | 'fair' | 'good' | 'excellent';
  trend: 'up' | 'down' | 'stable';
  insights: string[];
  recommendations: string[];
  benchmark?: {
    industryAverage: number;
    overallAverage: number;
    status: 'excellent' | 'above_average' | 'average' | 'below_average' | 'poor';
    comparison: string;
    industry: string;
  };
  competitorComparison?: {
    position: number;
    totalCompetitors: number;
    topCompetitors: string[];
  };
}

export interface GSOResults {
  overallScore: number;
  domain: string;
  analysisDate: string;
  overall_benchmark?: {
    industryAverage: number;
    overallAverage: number;
    status: 'excellent' | 'above_average' | 'average' | 'below_average' | 'poor';
    comparison: string;
    industry: string;
  };
  metrics: {
    aiRecommendationRate: MetricResult;
    competitiveRanking: MetricResult;
    contentRelevance: MetricResult;
    brandMentionQuality: MetricResult;
    searchCompatibility: MetricResult;
    consistencyScore: MetricResult;
    topicCoverage: MetricResult;
    websiteAuthority: MetricResult;
    trustSignals: MetricResult;
    expertiseRating: MetricResult;
  };
  summary: {
    criticalIssues: string[];
    quickWins: string[];
    investmentRecommendations: string[];
  };
  crawlData?: {
    pagesAnalyzed: number;
    totalContent: number;
    mainTitle: string;
    mainDescription: string;
  };
}

import { detectIndustry, getBenchmark, getOverallBenchmark, getPerformanceStatus, getBenchmarkComparison } from './benchmarks';

export const generateMockResults = (domain: string): GSOResults => {
  // Generate realistic but consistently poor scores for demo impact
  const baseScore = Math.floor(Math.random() * 30) + 15; // 15-45 range for poor performance
  
  // Detect industry for benchmarking
  const industry = detectIndustry(domain);
  
  // Helper function to add benchmark data
  const addBenchmark = (metricKey: string, score: number) => {
    const benchmark = getBenchmark(metricKey, industry);
    if (!benchmark) return undefined;
    
    return {
      industryAverage: benchmark.industryAverage,
      overallAverage: benchmark.overallAverage,
      status: getPerformanceStatus(score, benchmark),
      comparison: getBenchmarkComparison(score, metricKey, industry),
      industry: industry === 'general' ? 'Overall' : industry.charAt(0).toUpperCase() + industry.slice(1)
    };
  };
  
  // Calculate overall benchmark
  const overallBenchmark = getOverallBenchmark(industry);
  let overallBenchmarkData;
  if (overallBenchmark) {
    overallBenchmarkData = {
      industryAverage: overallBenchmark.industryAverage,
      overallAverage: overallBenchmark.overallAverage,
      status: getPerformanceStatus(baseScore, overallBenchmark),
      comparison: getBenchmarkComparison(baseScore, 'overall', industry),
      industry: industry === 'general' ? 'Overall' : industry.charAt(0).toUpperCase() + industry.slice(1)
    };
  }

  return {
    overallScore: baseScore,
    domain,
    analysisDate: new Date().toISOString(),
    overall_benchmark: overallBenchmarkData,
    metrics: {
      aiRecommendationRate: {
        score: Math.max(10, baseScore - 10 + Math.floor(Math.random() * 20)),
        status: 'critical',
        trend: 'down',
        insights: [
          `Your brand appears in only 12% of AI responses about your industry`,
          `Competitors mentioned 4.2x more frequently than your business`,
          `ChatGPT recommends 3 competitors before mentioning you`
        ],
        recommendations: [
          'Optimize content for AI training data patterns',
          'Increase authoritative content mentions',
          'Build strategic partnership announcements'
        ],
        benchmark: addBenchmark('aiRecommendationRate', Math.max(10, baseScore - 10 + Math.floor(Math.random() * 20))),
        competitorComparison: {
          position: 7,
          totalCompetitors: 10,
          topCompetitors: ['Competitor A', 'Competitor B', 'Competitor C']
        }
      },
      competitiveRanking: {
        score: Math.max(15, baseScore - 5 + Math.floor(Math.random() * 15)),
        status: 'poor',
        trend: 'stable',
        insights: [
          `AI provides generic descriptions instead of specific value props`,
          `Missing from 89% of "best of" recommendation lists`,
          `Low semantic relevance score in LLM embeddings`
        ],
        recommendations: [
          'Create AI-friendly content summaries',
          'Develop quotable executive insights',
          'Structure data for AI consumption'
        ],
        benchmark: addBenchmark('competitiveRanking', Math.max(15, baseScore - 5 + Math.floor(Math.random() * 15)))
      },
      contentRelevance: {
        score: Math.max(20, baseScore + Math.floor(Math.random() * 25)),
        status: 'fair',
        trend: 'up',
        insights: [
          `Content semantic alignment shows moderate potential`,
          `Site structure partially optimized for AI parsing`,
          `Some high-quality backlinks boost authority signals`
        ],
        recommendations: [
          'Enhance semantic content structure',
          'Add structured data markup',
          'Optimize for entity relationships'
        ],
        benchmark: addBenchmark('contentRelevance', Math.max(20, baseScore + Math.floor(Math.random() * 25)))
      },
      brandMentionQuality: {
        score: Math.max(8, baseScore - 15 + Math.floor(Math.random() * 10)),
        status: 'critical',
        trend: 'down',
        insights: [
          `Brand mentions feel forced and unnatural in AI responses`,
          `Low probability of natural inclusion in conversations`,
          `Token patterns suggest poor contextual fit`
        ],
        recommendations: [
          'Create more conversational brand content',
          'Develop natural use case scenarios',
          'Improve contextual keyword integration'
        ],
        benchmark: addBenchmark('brandMentionQuality', Math.max(8, baseScore - 15 + Math.floor(Math.random() * 10)))
      },
      searchCompatibility: {
        score: Math.max(25, baseScore + Math.floor(Math.random() * 20)),
        status: 'fair',
        trend: 'stable',
        insights: [
          `Content performs moderately in RAG pipelines`,
          `Some documentation indexed effectively`,
          `Vector similarity scores show room for improvement`
        ],
        recommendations: [
          'Optimize content for vector search',
          'Improve document chunking strategy',
          'Enhance metadata quality'
        ],
        benchmark: addBenchmark('searchCompatibility', Math.max(25, baseScore + Math.floor(Math.random() * 20)))
      },
      consistencyScore: {
        score: Math.max(30, baseScore + Math.floor(Math.random() * 25)),
        status: 'fair',
        trend: 'up',
        insights: [
          `Performance varies significantly across prompt types`,
          `Strong in informational queries, weak in comparison prompts`,
          `Inconsistent across different AI models`
        ],
        recommendations: [
          'Test against diverse prompt patterns',
          'Optimize for comparison contexts',
          'Create model-specific content strategies'
        ],
        benchmark: addBenchmark('consistencyScore', Math.max(30, baseScore + Math.floor(Math.random() * 25)))
      },
      topicCoverage: {
        score: Math.max(35, baseScore + Math.floor(Math.random() * 30)),
        status: 'good',
        trend: 'stable',
        insights: [
          `Good entity relationship coverage`,
          `Strong topical authority in core areas`,
          `Well-connected content graph structure`
        ],
        recommendations: [
          'Expand coverage to adjacent topics',
          'Strengthen entity connections',
          'Add more expert perspectives'
        ],
        benchmark: addBenchmark('topicCoverage', Math.max(35, baseScore + Math.floor(Math.random() * 30)))
      },
      websiteAuthority: {
        score: Math.max(65, baseScore + 30 + Math.floor(Math.random() * 20)),
        status: 'good',
        trend: 'up',
        insights: [
          `Strong traditional SEO foundation`,
          `Good domain authority and trust signals`,
          `Solid technical SEO implementation`
        ],
        recommendations: [
          'Maintain current SEO practices',
          'Focus on AI-specific optimizations',
          'Bridge traditional and AI visibility'
        ],
        benchmark: addBenchmark('websiteAuthority', Math.max(65, baseScore + 30 + Math.floor(Math.random() * 20)))
      },
      trustSignals: {
        score: Math.max(50, baseScore + 20 + Math.floor(Math.random() * 25)),
        status: 'fair',
        trend: 'stable',
        insights: [
          `Quality backlinks from authoritative sources`,
          `Good diversity in link profile`,
          `Some links from AI-referenced sources`
        ],
        recommendations: [
          'Target links from AI training sources',
          'Build relationships with cited publications',
          'Create linkable AI-friendly resources'
        ],
        benchmark: addBenchmark('trustSignals', Math.max(50, baseScore + 20 + Math.floor(Math.random() * 25)))
      },
      expertiseRating: {
        score: Math.max(40, baseScore + 15 + Math.floor(Math.random() * 20)),
        status: 'fair',
        trend: 'up',
        insights: [
          `Comprehensive coverage of core topics`,
          `Some gaps in emerging areas`,
          `Good depth in established subjects`
        ],
        recommendations: [
          'Address content gaps in trending topics',
          'Increase content depth and specificity',
          'Create more comprehensive guides'
        ],
        benchmark: addBenchmark('expertiseRating', Math.max(40, baseScore + 15 + Math.floor(Math.random() * 20)))
      }
    },
    summary: {
      criticalIssues: [
        'AI models rarely recommend your business organically',
        'Brand mentions lack natural context and feel forced',
        'Missing from competitive comparison discussions',
        'Low visibility in AI-powered search results'
      ],
      quickWins: [
        'Optimize existing high-performing content for AI consumption',
        'Create FAQ sections with natural language patterns',
        'Develop quotable executive insights for AI to reference',
        'Add structured data to improve AI understanding'
      ],
      investmentRecommendations: [
        'Launch AI-focused content strategy ($10K-25K)',
        'Implement semantic SEO optimization ($5K-15K)',
        'Develop strategic content partnerships ($15K-30K)',
        'Create comprehensive AI visibility audit system ($20K-40K)'
      ]
    }
  };
};

export const metricDefinitions = {
  aiRecommendationRate: {
    name: 'AI Recommendation Rate',
    description: 'How often ChatGPT, Claude, and Gemini recommend your business to customers',
    importance: 'Critical for understanding overall AI discoverability'
  },
  competitiveRanking: {
    name: 'Competitive Ranking',
    description: 'Where you rank compared to competitors when AI makes recommendations',
    importance: 'Determines quality of brand representation in AI outputs'
  },
  contentRelevance: {
    name: 'Content Relevance Score',
    description: 'How well your website content matches what AI looks for when making recommendations',
    importance: 'Key for natural AI recommendation patterns'
  },
  brandMentionQuality: {
    name: 'Brand Mention Quality',
    description: 'How naturally and positively AI mentions your brand in conversations',
    importance: 'Ensures organic-feeling AI recommendations'
  },
  searchCompatibility: {
    name: 'Search Compatibility',
    description: 'How well your content performs in AI-powered search engines',
    importance: 'Critical for AI-powered search and assistance tools'
  },
  consistencyScore: {
    name: 'Consistency Score',
    description: 'How reliably AI finds and recommends you across different types of questions',
    importance: 'Ensures reliable AI visibility across various query types'
  },
  topicCoverage: {
    name: 'Topic Coverage',
    description: 'How comprehensively you cover topics that matter to your customers',
    importance: 'Foundation for AI understanding of your business context'
  },
  websiteAuthority: {
    name: 'Website Authority',
    description: 'Traditional SEO strength that still influences AI recommendations',
    importance: 'Bridge between traditional and AI-powered discoverability'
  },
  trustSignals: {
    name: 'Trust Signal Strength',
    description: 'Quality of other websites linking to you, especially ones AI trusts',
    importance: 'Links from AI-referenced sources boost visibility'
  },
  expertiseRating: {
    name: 'Expertise Rating',
    description: 'How much expertise AI recognizes you have in your field',
    importance: 'Establishes expertise in AI knowledge graphs'
  }
};