import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, domain, score } = await request.json();
    
    if (!email || !domain) {
      return NextResponse.json(
        { error: 'Email and domain are required' },
        { status: 400 }
      );
    }

    // Save to database first
    try {
      const { data, error } = await supabase
        .from('email_collections')
        .insert({
          email,
          domain_analyzed: domain,
          analysis_score: score || 0
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to save email to database:', error);
      } else {
        console.log('💾 Saved email lead to database:', data);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
    }

    // Log the lead
    console.log('🎯 NEW LEAD CAPTURED:', {
      email,
      domain,
      score,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    // Send notification email to you
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'GSO Platform <onboarding@resend.dev>', // Resend test domain
          to: [process.env.NOTIFICATION_EMAIL],
          subject: `🎯 New GSO Lead: ${domain}`,
          html: `
            <h2>New Lead from GSO Insight Platform</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Domain:</strong> ${domain}</p>
            <p><strong>Price Shown:</strong> $250</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Next Steps:</strong> Contact within 24 hours for maximum conversion</p>
            <hr>
            <p><small>Sent from your GSO Insight Platform</small></p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email fails
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully' 
    });
    
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}