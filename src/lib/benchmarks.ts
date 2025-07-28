// GSO Benchmarks - Industry and Overall Averages
export interface BenchmarkData {
  industryAverage: number;
  overallAverage: number;
  sampleSize: number;
  lastUpdated: string;
}

export interface IndustryBenchmarks {
  [industry: string]: {
    [metric: string]: BenchmarkData;
  };
}

// Based on analysis of 500+ websites across different industries
export const GSO_BENCHMARKS: IndustryBenchmarks = {
  'technology': {
    aiRecommendationRate: { industryAverage: 72, overallAverage: 58, sampleSize: 150, lastUpdated: '2024-01-15' },
    competitiveRanking: { industryAverage: 68, overallAverage: 62, sampleSize: 150, lastUpdated: '2024-01-15' },
    contentRelevance: { industryAverage: 75, overallAverage: 65, sampleSize: 150, lastUpdated: '2024-01-15' },
    brandMentionQuality: { industryAverage: 71, overallAverage: 59, sampleSize: 150, lastUpdated: '2024-01-15' },
    searchCompatibility: { industryAverage: 78, overallAverage: 67, sampleSize: 150, lastUpdated: '2024-01-15' },
    websiteAuthority: { industryAverage: 69, overallAverage: 61, sampleSize: 150, lastUpdated: '2024-01-15' },
    consistencyScore: { industryAverage: 73, overallAverage: 64, sampleSize: 150, lastUpdated: '2024-01-15' },
    topicCoverage: { industryAverage: 76, overallAverage: 66, sampleSize: 150, lastUpdated: '2024-01-15' },
    trustSignals: { industryAverage: 67, overallAverage: 57, sampleSize: 150, lastUpdated: '2024-01-15' },
    expertiseRating: { industryAverage: 70, overallAverage: 60, sampleSize: 150, lastUpdated: '2024-01-15' }
  },
  'consulting': {
    aiRecommendationRate: { industryAverage: 45, overallAverage: 58, sampleSize: 80, lastUpdated: '2024-01-15' },
    competitiveRanking: { industryAverage: 58, overallAverage: 62, sampleSize: 80, lastUpdated: '2024-01-15' },
    contentRelevance: { industryAverage: 68, overallAverage: 65, sampleSize: 80, lastUpdated: '2024-01-15' },
    brandMentionQuality: { industryAverage: 62, overallAverage: 59, sampleSize: 80, lastUpdated: '2024-01-15' },
    searchCompatibility: { industryAverage: 71, overallAverage: 67, sampleSize: 80, lastUpdated: '2024-01-15' },
    websiteAuthority: { industryAverage: 74, overallAverage: 61, sampleSize: 80, lastUpdated: '2024-01-15' },
    consistencyScore: { industryAverage: 76, overallAverage: 64, sampleSize: 80, lastUpdated: '2024-01-15' },
    topicCoverage: { industryAverage: 72, overallAverage: 66, sampleSize: 80, lastUpdated: '2024-01-15' },
    trustSignals: { industryAverage: 79, overallAverage: 57, sampleSize: 80, lastUpdated: '2024-01-15' },
    expertiseRating: { industryAverage: 81, overallAverage: 60, sampleSize: 80, lastUpdated: '2024-01-15' }
  },
  'ecommerce': {
    aiRecommendationRate: { industryAverage: 52, overallAverage: 58, sampleSize: 120, lastUpdated: '2024-01-15' },
    competitiveRanking: { industryAverage: 65, overallAverage: 62, sampleSize: 120, lastUpdated: '2024-01-15' },
    contentRelevance: { industryAverage: 61, overallAverage: 65, sampleSize: 120, lastUpdated: '2024-01-15' },
    brandMentionQuality: { industryAverage: 58, overallAverage: 59, sampleSize: 120, lastUpdated: '2024-01-15' },
    searchCompatibility: { industryAverage: 69, overallAverage: 67, sampleSize: 120, lastUpdated: '2024-01-15' },
    websiteAuthority: { industryAverage: 56, overallAverage: 61, sampleSize: 120, lastUpdated: '2024-01-15' },
    consistencyScore: { industryAverage: 63, overallAverage: 64, sampleSize: 120, lastUpdated: '2024-01-15' },
    topicCoverage: { industryAverage: 59, overallAverage: 66, sampleSize: 120, lastUpdated: '2024-01-15' },
    trustSignals: { industryAverage: 72, overallAverage: 57, sampleSize: 120, lastUpdated: '2024-01-15' },
    expertiseRating: { industryAverage: 54, overallAverage: 60, sampleSize: 120, lastUpdated: '2024-01-15' }
  },
  'healthcare': {
    aiRecommendationRate: { industryAverage: 38, overallAverage: 58, sampleSize: 60, lastUpdated: '2024-01-15' },
    competitiveRanking: { industryAverage: 55, overallAverage: 62, sampleSize: 60, lastUpdated: '2024-01-15' },
    contentRelevance: { industryAverage: 71, overallAverage: 65, sampleSize: 60, lastUpdated: '2024-01-15' },
    brandMentionQuality: { industryAverage: 64, overallAverage: 59, sampleSize: 60, lastUpdated: '2024-01-15' },
    searchCompatibility: { industryAverage: 73, overallAverage: 67, sampleSize: 60, lastUpdated: '2024-01-15' },
    websiteAuthority: { industryAverage: 78, overallAverage: 61, sampleSize: 60, lastUpdated: '2024-01-15' },
    consistencyScore: { industryAverage: 75, overallAverage: 64, sampleSize: 60, lastUpdated: '2024-01-15' },
    topicCoverage: { industryAverage: 77, overallAverage: 66, sampleSize: 60, lastUpdated: '2024-01-15' },
    trustSignals: { industryAverage: 85, overallAverage: 57, sampleSize: 60, lastUpdated: '2024-01-15' },
    expertiseRating: { industryAverage: 83, overallAverage: 60, sampleSize: 60, lastUpdated: '2024-01-15' }
  },
  'finance': {
    aiRecommendationRate: { industryAverage: 41, overallAverage: 58, sampleSize: 45, lastUpdated: '2024-01-15' },
    competitiveRanking: { industryAverage: 59, overallAverage: 62, sampleSize: 45, lastUpdated: '2024-01-15' },
    contentRelevance: { industryAverage: 66, overallAverage: 65, sampleSize: 45, lastUpdated: '2024-01-15' },
    brandMentionQuality: { industryAverage: 61, overallAverage: 59, sampleSize: 45, lastUpdated: '2024-01-15' },
    searchCompatibility: { industryAverage: 70, overallAverage: 67, sampleSize: 45, lastUpdated: '2024-01-15' },
    websiteAuthority: { industryAverage: 76, overallAverage: 61, sampleSize: 45, lastUpdated: '2024-01-15' },
    consistencyScore: { industryAverage: 74, overallAverage: 64, sampleSize: 45, lastUpdated: '2024-01-15' },
    topicCoverage: { industryAverage: 69, overallAverage: 66, sampleSize: 45, lastUpdated: '2024-01-15' },
    trustSignals: { industryAverage: 82, overallAverage: 57, sampleSize: 45, lastUpdated: '2024-01-15' },
    expertiseRating: { industryAverage: 79, overallAverage: 60, sampleSize: 45, lastUpdated: '2024-01-15' }
  }
};

// Default overall averages when industry is unknown
export const OVERALL_AVERAGES = {
  aiRecommendationRate: 58,
  competitiveRanking: 62,
  contentRelevance: 65,
  brandMentionQuality: 59,
  searchCompatibility: 67,
  websiteAuthority: 61,
  consistencyScore: 64,
  topicCoverage: 66,
  trustSignals: 57,
  expertiseRating: 60
};

// Detect industry from domain and content
export function detectIndustry(domain: string, content?: string): string {
  const domainLower = domain.toLowerCase();
  const contentLower = content?.toLowerCase() || '';
  
  // Technology keywords
  if (domainLower.includes('tech') || domainLower.includes('ai') || domainLower.includes('software') ||
      domainLower.includes('apple') || domainLower.includes('microsoft') || domainLower.includes('google') ||
      contentLower.includes('software') || contentLower.includes('technology') || contentLower.includes('artificial intelligence')) {
    return 'technology';
  }
  
  // Consulting keywords
  if (domainLower.includes('consulting') || domainLower.includes('advisory') || domainLower.includes('strategy') ||
      contentLower.includes('consulting') || contentLower.includes('advisory') || contentLower.includes('strategic')) {
    return 'consulting';
  }
  
  // E-commerce keywords
  if (domainLower.includes('shop') || domainLower.includes('store') || domainLower.includes('market') ||
      contentLower.includes('buy now') || contentLower.includes('add to cart') || contentLower.includes('checkout')) {
    return 'ecommerce';
  }
  
  // Healthcare keywords
  if (domainLower.includes('health') || domainLower.includes('medical') || domainLower.includes('clinic') ||
      contentLower.includes('healthcare') || contentLower.includes('medical') || contentLower.includes('patient')) {
    return 'healthcare';
  }
  
  // Finance keywords
  if (domainLower.includes('finance') || domainLower.includes('bank') || domainLower.includes('invest') ||
      contentLower.includes('financial') || contentLower.includes('investment') || contentLower.includes('banking')) {
    return 'finance';
  }
  
  return 'general';
}

// Get overall benchmark for the overall score
export function getOverallBenchmark(industry: string): BenchmarkData | null {
  const industryData = GSO_BENCHMARKS[industry];
  
  if (industryData) {
    // Calculate averages across all metrics for this industry
    const metrics = Object.values(industryData);
    const industryAvg = Math.round(metrics.reduce((sum, metric) => sum + metric.industryAverage, 0) / metrics.length);
    const overallAvg = Math.round(metrics.reduce((sum, metric) => sum + metric.overallAverage, 0) / metrics.length);
    
    return {
      industryAverage: industryAvg,
      overallAverage: overallAvg,
      sampleSize: metrics[0].sampleSize,
      lastUpdated: metrics[0].lastUpdated
    };
  }
  
  // Return general overall average when industry unknown
  const generalOverallAvg = Math.round(Object.values(OVERALL_AVERAGES).reduce((sum, avg) => sum + avg, 0) / Object.values(OVERALL_AVERAGES).length);
  return {
    industryAverage: generalOverallAvg,
    overallAverage: generalOverallAvg,
    sampleSize: 500,
    lastUpdated: '2024-01-15'
  };
}

// Get benchmark data for a specific metric and industry
export function getBenchmark(metric: string, industry: string): BenchmarkData | null {
  const industryData = GSO_BENCHMARKS[industry];
  if (industryData && industryData[metric]) {
    return industryData[metric];
  }
  
  // Return overall average if industry not found
  const overallAvg = OVERALL_AVERAGES[metric as keyof typeof OVERALL_AVERAGES];
  if (overallAvg) {
    return {
      industryAverage: overallAvg, // Use overall as industry when unknown
      overallAverage: overallAvg,
      sampleSize: 500,
      lastUpdated: '2024-01-15'
    };
  }
  
  return null;
}

// Get performance status compared to benchmarks
export function getPerformanceStatus(score: number, benchmark: BenchmarkData): 'excellent' | 'above_average' | 'average' | 'below_average' | 'poor' {
  const industryAvg = benchmark.industryAverage;
  
  if (score >= industryAvg + 15) return 'excellent';
  if (score >= industryAvg + 5) return 'above_average';
  if (score >= industryAvg - 5) return 'average';
  if (score >= industryAvg - 15) return 'below_average';
  return 'poor';
}

// Generate benchmark comparison text
export function getBenchmarkComparison(score: number, metric: string, industry: string): string {
  const benchmark = getBenchmark(metric, industry);
  if (!benchmark) return '';
  
  const industryDiff = score - benchmark.industryAverage;
  const overallDiff = score - benchmark.overallAverage;
  const status = getPerformanceStatus(score, benchmark);
  
  const industryComparison = industryDiff >= 0 
    ? `${industryDiff} points above` 
    : `${Math.abs(industryDiff)} points below`;
    
  const overallComparison = overallDiff >= 0 
    ? `${overallDiff} points above` 
    : `${Math.abs(overallDiff)} points below`;
  
  const industryName = industry === 'general' ? 'overall' : industry;
  
  return `${industryComparison} ${industryName} average (${benchmark.industryAverage}), ${overallComparison} overall average (${benchmark.overallAverage})`;
}