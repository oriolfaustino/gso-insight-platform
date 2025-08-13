import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    console.log('🧪 Testing production email setup...');
    
    // Check environment variables
    console.log('Environment check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyExists: process.env.RESEND_API_KEY ? 'YES' : 'NO',
      hasNotificationEmail: !!process.env.NOTIFICATION_EMAIL,
      notificationEmail: process.env.NOTIFICATION_EMAIL || 'NOT SET'
    });

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY not found in environment',
        debug: { env: Object.keys(process.env).filter(k => k.includes('RESEND')) }
      }, { status: 500 });
    }

    if (!process.env.NOTIFICATION_EMAIL) {
      return NextResponse.json({ 
        error: 'NOTIFICATION_EMAIL not found in environment' 
      }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('📧 Sending production test email...');
    
    const result = await resend.emails.send({
      from: 'Production Test <onboarding@resend.dev>',
      to: ['test@resend.dev'], // Test email that should work
      subject: '🧪 Production Email Test - GSO Platform',
      html: `
        <h2>🧪 Production Email Test</h2>
        <p>This email was sent from your production GSO Platform to test email functionality.</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> Production</p>
        <hr>
        <p><small>If you receive this, your email system is working correctly!</small></p>
      `,
    });
    
    console.log('✅ Production test email sent:', JSON.stringify(result, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      result,
      message: 'Production email test sent successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Production email test failed:', error);
    
    return NextResponse.json({ 
      error: 'Production email test failed', 
      details: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}