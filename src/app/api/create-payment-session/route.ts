import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Check if Stripe is configured
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
}) : null;

export async function POST(request: NextRequest) {
  try {
    // Return demo message if Stripe is not configured
    if (!stripe || !STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment processing is not configured. This is a demo environment.' },
        { status: 400 }
      );
    }

    const { email, domain, variant, price, currency, isSubscription, subscriptionPeriod } = await request.json();

    // For demo purposes, we'll create a simple payment session
    // In production, you'd want to create proper products and prices in Stripe
    
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: isSubscription 
                ? `GSO Pro Subscription (${subscriptionPeriod})` 
                : `GSO Analysis - ${domain}`,
              description: isSubscription
                ? `Continuous AI visibility monitoring for ${subscriptionPeriod}`
                : `Complete AI visibility analysis for ${domain}`,
              images: [], // Add your product images here
            },
            unit_amount: price * 100, // Stripe expects amount in cents
            ...(isSubscription && {
              recurring: {
                interval: 'month',
                interval_count: subscriptionPeriod === '3 months' ? 3 : 1,
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&domain=${domain}`,
      cancel_url: `${request.nextUrl.origin}/?cancelled=true`,
      metadata: {
        domain,
        variant,
        isSubscription: isSubscription ? 'true' : 'false',
        subscriptionPeriod: subscriptionPeriod || '',
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: `Payment session creation failed: ${error.message}` },
      { status: 500 }
    );
  }
}