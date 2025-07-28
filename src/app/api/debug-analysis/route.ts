import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from '@mendable/firecrawl-js';
import { extractStructuredData, analyzeWithRealData } from '@/lib/realDataAnalyzer';

// Initialize Firecrawl lazily
let firecrawl: FirecrawlApp | null = null;

function getFirecrawl() {
  if (!firecrawl) {
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY environment variable is required');
    }
    firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY
    });
  }
  return firecrawl;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log(`🔍 [DEBUG] Crawling ${url} with Firecrawl...`);
    
    // Scrape the website
    const scrapeResult = await getFirecrawl().scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
      includeTags: ['title', 'meta', 'h1', 'h2', 'h3', 'h4', 'p', 'div', 'section', 'article'],
      excludeTags: ['script', 'style', 'nav', 'footer', 'header', 'aside'],
      waitFor: 2000,
      timeout: 15000
    });

    if (!scrapeResult.success) {
      console.error('[DEBUG] Firecrawl scrape failed:', scrapeResult.error);
      return NextResponse.json({
        error: 'Failed to scrape website',
        details: scrapeResult.error,
        success: false
      });
    }

    const content = scrapeResult.data?.markdown || '';
    const metadata = scrapeResult.data?.metadata || {};
    
    console.log(`✅ [DEBUG] Successfully crawled ${url}, content length: ${content.length}`);
    
    if (content.length < 100) {
      return NextResponse.json({
        error: 'Content too short',
        contentLength: content.length,
        content: content.substring(0, 200),
        success: false
      });
    }

    console.log(`🧠 [DEBUG] Starting real data analysis for ${url}...`);
    
    // Extract structured data
    const crawlerData = extractStructuredData(content, metadata, url);
    
    console.log(`📊 [DEBUG] Extracted data:`, {
      domain: crawlerData.domain,
      wordCount: crawlerData.word_count,
      headingCount: crawlerData.heading_count,
      title: crawlerData.title,
      hasContactInfo: !!crawlerData.contact_info,
      socialLinksCount: crawlerData.social_links?.length || 0
    });
    
    // Analyze with real data
    const realDataAnalysis = await analyzeWithRealData(crawlerData);
    
    console.log(`✅ [DEBUG] Real data analysis completed for ${url}`);
    
    return NextResponse.json({
      success: true,
      url,
      contentLength: content.length,
      extractedData: {
        domain: crawlerData.domain,
        wordCount: crawlerData.word_count,
        headingCount: crawlerData.heading_count,
        title: crawlerData.title,
        description: crawlerData.description,
        contactInfo: crawlerData.contact_info,
        socialLinks: crawlerData.social_links,
        certifications: crawlerData.certifications,
        pricingMentioned: crawlerData.pricing_mentioned
      },
      analysis: realDataAnalysis,
      sampleInsights: {
        aiRecommendationRate: realDataAnalysis.metrics.aiRecommendationRate.insights,
        contentRelevance: realDataAnalysis.metrics.contentRelevance.insights,
        trustSignals: realDataAnalysis.metrics.trustSignals.insights
      }
    });

  } catch (error) {
    console.error('[DEBUG] Analysis error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
}