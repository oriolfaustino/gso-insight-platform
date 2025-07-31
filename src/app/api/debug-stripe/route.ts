import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    return NextResponse.json({
      hasSecretKey: !!stripeSecretKey,
      secretKeyPrefix: stripeSecretKey ? stripeSecretKey.substring(0, 8) + '...' : 'Not set',
      hasPublishableKey: !!stripePublishableKey,
      publishableKeyPrefix: stripePublishableKey ? stripePublishableKey.substring(0, 8) + '...' : 'Not set',
      environment: process.env.NODE_ENV,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}