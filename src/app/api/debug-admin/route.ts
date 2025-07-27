import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Create client using anon key (same as admin page)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    console.log('Testing admin permissions with anon key...');

    // Test both tables
    const { data: emails, error: emailError } = await supabase
      .from('email_collections')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: analyses, error: analysisError } = await supabase
      .from('analysis_results')
      .select('*')
      .order('created_at', { ascending: false });

    return NextResponse.json({
      success: true,
      emails: {
        count: emails?.length || 0,
        data: emails || [],
        error: emailError?.message || null
      },
      analyses: {
        count: analyses?.length || 0,
        data: analyses || [],
        error: analysisError?.message || null
      }
    });

  } catch (error) {
    console.error('Debug admin error:', error);
    return NextResponse.json({
      error: error.message,
      success: false
    });
  }
}