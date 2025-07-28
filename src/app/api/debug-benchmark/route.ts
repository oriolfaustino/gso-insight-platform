import { NextRequest, NextResponse } from 'next/server';
import { detectIndustry, getOverallBenchmark } from '@/lib/benchmarks';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain') || 'test.com';
    
    // Test industry detection
    const industry = detectIndustry(domain);
    console.log(`🏭 Industry detected for ${domain}: ${industry}`);
    
    // Test overall benchmark
    const overallBenchmark = getOverallBenchmark(industry);
    console.log(`📊 Overall benchmark for ${industry}:`, overallBenchmark);
    
    return NextResponse.json({
      domain,
      industry,
      overallBenchmark,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug benchmark error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}