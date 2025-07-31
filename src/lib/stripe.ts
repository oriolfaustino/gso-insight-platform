import { loadStripe } from '@stripe/stripe-js';

// This is your public publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export const getStripe = () => {
  return stripePromise;
};

export interface PaymentData {
  email: string;
  domain: string;
  variant: string;
  price: number;
  currency: string;
  isSubscription?: boolean;
  subscriptionPeriod?: string;
}

export const createPaymentSession = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/create-payment-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment session');
    }

    const { sessionId } = await response.json();
    
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};