import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Try to fetch emails from database
    const { data, error } = await supabase
      .from('email_collections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({
        error: error.message,
        details: error,
        success: false
      });
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      data: data || [],
      message: `Found ${data?.length || 0} emails in database`
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      error: error.message,
      success: false
    });
  }
}