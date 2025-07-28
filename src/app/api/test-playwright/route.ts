import { NextRequest, NextResponse } from 'next/server';
import { scrapeWithPlaywright } from '@/lib/playwrightCrawler';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log(`🎭 Testing Playwright with ${url}...`);
    
    const result = await scrapeWithPlaywright(url);
    
    return NextResponse.json({
      success: result.success,
      url,
      error: result.error,
      data: result.data ? {
        contentLength: result.data.markdown.length,
        title: result.data.metadata.title,
        description: result.data.metadata.description,
        statusCode: result.data.metadata.statusCode,
        contentPreview: result.data.markdown.substring(0, 500) + '...',
        fullContent: result.data.markdown
      } : null
    });

  } catch (error) {
    console.error('Test Playwright error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
}