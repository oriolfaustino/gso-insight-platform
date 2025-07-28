// GSO Tactics - 7 Proven Strategies for AI Visibility
export const GSO_TACTICS = {
  aiRecommendationRate: [
    "Rely on spoken search queries - use naturally asked questions as H2 headings",
    "Monitor your brand with AI visibility tools like Peec AI regularly",
    "Write directly and concisely - facts, short and clear without metaphors",
    "Clear heading structure: H1=Topic, H2=Questions, H3=Sub-points for AI parsing"
  ],
  competitiveRanking: [
    "Show real authority with expert profiles, case studies, and industry seals",
    "Build links to strong third-party sources to establish credibility",
    "Use clear heading structure so AI immediately understands your expertise",
    "Monitor competitors' AI visibility and adapt your strategy accordingly"
  ],
  contentRelevance: [
    "Write directly and concisely - no unnecessary continuous text or metaphors", 
    "Offer summaries with TL;DR or Key Takeaways at the beginning",
    "Use spoken search queries instead of classic keywords for ChatGPT optimization",
    "Create short intermediate conclusions for longer texts to help AI extraction"
  ],
  brandMentionQuality: [
    "Monitor your brand for AI visibility with tools like Peec AI",
    "Customize 'About Us,' FAQ, and profiles anywhere for consistent messaging",
    "Use clear heading structure to help AI understand your brand positioning",
    "Show real reviews from Google and industry portals for brand credibility"
  ],
  searchCompatibility: [
    "Use 'More Questions' section from Google as H2 headings with brief answers",
    "Rely on spoken search queries over traditional keyword optimization", 
    "Create clear heading structure: H1=Topic, H2=Questions, H3=Sub-points",
    "Offer summaries and key takeaways for faster AI information extraction"
  ],
  websiteAuthority: [
    "Show real authority: expert profiles, case studies, seals, third-party links",
    "Display real reviews from Google, industry portals, and user Q&A",
    "Build trust with machines through verified credentials and certifications",
    "Create comprehensive FAQ sections that answer user questions directly"
  ],
  consistencyScore: [
    "Maintain consistent messaging across all pages and profiles",
    "Use clear heading structure throughout your site for AI parsing consistency",
    "Ensure brand voice remains direct and concise across all content",
    "Regularly monitor and update outdated content for accuracy"
  ],
  topicCoverage: [
    "Answer naturally asked questions found in Google's 'More Questions' section",
    "Create comprehensive guides with TL;DR summaries for better coverage",
    "Use spoken search queries to cover conversational topic variations",
    "Offer short intermediate conclusions to break down complex topics"
  ],
  trustSignals: [
    "Show real reviews from Google reviews and industry portals",
    "Display expert profiles, case studies, and industry certifications",
    "Add customer testimonials and answers to user questions",
    "Include links to authoritative third-party sources and partnerships"
  ],
  expertiseRating: [
    "Create detailed expert profiles with credentials and experience",
    "Showcase case studies and real customer success stories",
    "Display industry certifications, awards, and professional memberships",
    "Link to authoritative sources and demonstrate thought leadership"
  ]
};

export const CRITICAL_ISSUES_POOL = [
  "Missing clear H1-H2-H3 heading structure for AI content parsing",
  "No FAQ section answering common customer questions",
  "Lack of expert profiles or authority signals for credibility",
  "Missing TL;DR summaries for complex content sections", 
  "No customer reviews or testimonials visible to AI systems",
  "Content uses metaphors instead of direct, factual language",
  "Missing 'About Us' section with clear value proposition",
  "No contact information easily accessible for trust signals",
  "Outdated content that doesn't reflect current offerings",
  "Lack of case studies or social proof elements"
];

export const QUICK_WINS_POOL = [
  "Add H2 headings with naturally asked questions from Google's 'More Questions'",
  "Create a brief TL;DR summary at the top of your main pages",
  "Update 'About Us' page with clear, direct language about your expertise",
  "Add customer testimonials or Google reviews to homepage",
  "Create an FAQ section answering top 5 customer questions",
  "Add expert team profiles with credentials and experience",
  "Include contact information (email/phone) in header or footer",
  "Rewrite product descriptions using direct, factual language",
  "Add brief case studies or customer success examples",
  "Create clear service/product summaries without industry jargon"
];

export const INVESTMENT_RECOMMENDATIONS_POOL = [
  "Comprehensive content audit using spoken search query optimization",
  "Professional brand monitoring setup with AI visibility tools",
  "Authority building campaign: expert profiles, case studies, certifications",
  "Review acquisition strategy across Google and industry platforms", 
  "Content restructuring with proper H1-H2-H3 hierarchy throughout site",
  "FAQ expansion covering all customer journey touchpoints",
  "Trust signal implementation: seals, certifications, third-party links",
  "Comprehensive about/team pages with expertise demonstration",
  "Customer success story development and case study creation",
  "Regular AI visibility monitoring and optimization program"
];

// Get insights based on analysis results with fallback to proven tactics
export function getRelevantInsights(metricKey: string, score: number, analysisInsights?: string[]): string[] {
  const tactics = GSO_TACTICS[metricKey as keyof typeof GSO_TACTICS] || [];
  
  // If we have analysis insights and they're meaningful, use them
  if (analysisInsights && analysisInsights.length > 0 && 
      !analysisInsights.some(insight => insight.includes('Deterministic analysis'))) {
    // Combine analysis insights with tactical recommendations
    const combined = [...analysisInsights.slice(0, 2), ...tactics.slice(0, 2)];
    return combined.slice(0, 3);
  }
  
  // Otherwise use our proven tactics based on score
  if (score >= 80) {
    return tactics.slice(0, 2); // Show top 2 tactics for high scores
  } else if (score >= 60) {
    return tactics.slice(0, 3); // Show top 3 tactics for medium scores  
  } else {
    return tactics.slice(0, 4); // Show more tactics for low scores
  }
}

export function getCriticalIssues(count: number = 3): string[] {
  return CRITICAL_ISSUES_POOL.slice(0, count);
}

export function getQuickWins(count: number = 3): string[] {
  return QUICK_WINS_POOL.slice(0, count);
}

export function getInvestmentRecommendations(count: number = 3): string[] {
  return INVESTMENT_RECOMMENDATIONS_POOL.slice(0, count);
}