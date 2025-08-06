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
    console.log('🔍 Email environment check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasNotificationEmail: !!process.env.NOTIFICATION_EMAIL,
      notificationEmail: process.env.NOTIFICATION_EMAIL
    });

    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log('📧 Attempting to send notification email...');
        
        const result = await resend.emails.send({
          from: 'GSO Platform <onboarding@resend.dev>',
          to: [process.env.NOTIFICATION_EMAIL],
          subject: `🎯 New GSO Lead: ${domain} (Score: ${score || 'N/A'})`,
          html: `
            <h2>🎯 New Lead from GSO Insight Platform</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 16px 0;">
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>🌐 Domain:</strong> ${domain}</p>
              <p><strong>📊 Score:</strong> ${score || 'N/A'}/100</p>
              <p><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>🔥 User Agent:</strong> ${request.headers.get('user-agent')?.substring(0, 100) || 'Unknown'}</p>
            </div>
            <h3>📋 Next Steps:</h3>
            <ul>
              <li>Contact within 24 hours for maximum conversion</li>
              <li>Mention their specific domain analysis</li>
              <li>Focus on AI visibility improvements</li>
            </ul>
            <hr>
            <p><small>Sent from your GSO Insight Platform • ${new Date().toISOString()}</small></p>
          `,
        });
        
        console.log('✅ Email sent successfully:', JSON.stringify(result, null, 2));
      } catch (emailError) {
        console.error('❌ Failed to send notification email:', emailError);
        console.error('Email error type:', typeof emailError);
        console.error('Email error message:', emailError.message || 'No message');
        console.error('Email error details:', JSON.stringify(emailError, null, 2));
        // Don't fail the request if email fails
      }
    } else {
      console.log('⚠️ Email not configured - missing environment variables');
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