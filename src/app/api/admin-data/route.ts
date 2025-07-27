import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Use service role to fetch all data
    const { data: analyses, error: analysisError } = await supabase
      .from('analysis_results')
      .select('id, domain, overall_score, analysis_date, crawler_used, word_count, title, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    const { data: emails, error: emailError } = await supabase
      .from('email_collections')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (analysisError) {
      console.error('Error fetching analyses:', analysisError);
    }

    if (emailError) {
      console.error('Error fetching emails:', emailError);
    }

    return NextResponse.json({
      success: true,
      analyses: analyses || [],
      emails: emails || [],
      errors: {
        analysisError: analysisError?.message || null,
        emailError: emailError?.message || null
      }
    });

  } catch (error) {
    console.error('Admin data error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
}