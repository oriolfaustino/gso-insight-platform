// A/B Testing for pricing experiments
export interface PricingVariant {
  id: 'control' | 'premium' | 'budget' | 'subscription';
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  ctaText: string;
  isSubscription?: boolean;
  subscriptionPeriod?: string;
}

// Define pricing variants
export const PRICING_VARIANTS: Record<string, PricingVariant> = {
  control: {
    id: 'control',
    name: 'Complete Analysis',
    price: 97,
    currency: '€',
    description: 'Full AI visibility report with actionable recommendations',
    features: [
      'Complete 10-metric analysis',
      'Detailed recommendations',
      'Competitor comparison',
      'Action plan with priorities',
      'Email delivery'
    ],
    ctaText: 'Get Complete Analysis'
  },
  premium: {
    id: 'premium', 
    name: 'Premium Analysis',
    price: 250,
    currency: '€',
    description: 'Premium AI visibility audit with expert consultation',
    features: [
      'Complete 10-metric analysis',
      'Detailed recommendations',
      'Competitor comparison',
      'Action plan with priorities',
      'Email delivery',
      '30-min strategy call',
      'Custom optimization plan'
    ],
    ctaText: 'Get Premium Analysis'
  },
  budget: {
    id: 'budget',
    name: 'Essential Analysis', 
    price: 30,
    currency: '€',
    description: 'Essential AI visibility insights for small businesses',
    features: [
      'Complete 10-metric analysis',
      'Basic recommendations',
      'Email delivery'
    ],
    ctaText: 'Get Essential Analysis'
  },
  subscription: {
    id: 'subscription',
    name: 'GSO Pro Subscription',
    price: 5,
    currency: '€',
    description: 'Continuous AI visibility monitoring and optimization',
    isSubscription: true,
    subscriptionPeriod: '3 months',
    features: [
      'Unlimited analysis runs',
      'Weekly monitoring reports',
      'Real-time AI visibility tracking',
      'Priority email support',
      'Competitor comparison alerts',
      'Custom optimization roadmap'
    ],
    ctaText: 'Start 3-Month Subscription'
  }
};

// Get user's assigned variant (simple hash-based assignment)
export function getAssignedVariant(userIdentifier?: string): PricingVariant {
  // Check if we have a stored variant first
  let storedVariant = null;
  if (typeof window !== 'undefined') {
    storedVariant = sessionStorage.getItem('ab_test_variant');
    if (storedVariant && PRICING_VARIANTS[storedVariant]) {
      return PRICING_VARIANTS[storedVariant];
    }
  }
  
  // Use a combination of user agent, timestamp, and random for assignment
  const identifier = userIdentifier || 
    (typeof window !== 'undefined' ? window.navigator.userAgent + Math.random() + Date.now() : 'server');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Assign variants (25% each)
  const variants = Object.keys(PRICING_VARIANTS);
  const variantIndex = Math.abs(hash) % variants.length;
  const variantKey = variants[variantIndex];
  
  // Store the variant for this session
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('ab_test_variant', variantKey);
  }
  
  // Log the assignment for analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_assignment', {
      event_category: 'experiment',
      event_label: `pricing_${variantKey}`,
      custom_map: { variant: variantKey }
    });
  }
  
  return PRICING_VARIANTS[variantKey];
}

// Track conversion by variant
export function trackConversion(variant: PricingVariant, action: 'click' | 'purchase') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `pricing_${action}`, {
      event_category: 'conversion',
      event_label: `${variant.id}_${variant.price}${variant.currency}`,
      value: action === 'purchase' ? variant.price : undefined,
      custom_map: { 
        variant: variant.id,
        price: variant.price 
      }
    });
  }
}

// Get variant from URL parameter (for testing)
export function getVariantFromUrl(): PricingVariant | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const variantParam = urlParams.get('variant');
  
  if (variantParam && PRICING_VARIANTS[variantParam]) {
    return PRICING_VARIANTS[variantParam];
  }
  return null;
}