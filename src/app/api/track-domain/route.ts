import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();
    
    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    // Clean up the domain
    const cleanDomain = domain.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');

    // Save domain submission to database
    try {
      const { data, error } = await supabase
        .from('domain_submissions')
        .insert({
          domain: cleanDomain,
          user_agent: request.headers.get('user-agent'),
          ip_address: request.headers.get('x-forwarded-for') || 'unknown',
          utm_source: request.headers.get('x-utm-source'),
          utm_medium: request.headers.get('x-utm-medium'),
          utm_campaign: request.headers.get('x-utm-campaign'),
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to save domain submission:', error);
      } else {
        console.log('📝 Domain submission tracked:', data);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
    }

    console.log('🎯 DOMAIN SUBMITTED FOR ANALYSIS:', {
      domain: cleanDomain,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Domain submission tracked' 
    });
    
  } catch (error) {
    console.error('Error tracking domain submission:', error);
    return NextResponse.json(
      { error: 'Failed to track domain submission' },
      { status: 500 }
    );
  }
}