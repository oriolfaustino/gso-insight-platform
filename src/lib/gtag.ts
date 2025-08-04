// Google Analytics utilities
export const GA_TRACKING_ID = 'G-8H4L3NMS23';

// Test function to verify GA is working
export const testGA = () => {
  console.log('🧪 Testing GA setup...');
  console.log('GA_TRACKING_ID:', GA_TRACKING_ID);
  console.log('window.gtag exists:', typeof window !== 'undefined' && !!window.gtag);
  console.log('dataLayer exists:', typeof window !== 'undefined' && !!window.dataLayer);
  
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('📊 Sending test event...');
    window.gtag('event', 'test_event', {
      event_category: 'debug',
      event_label: 'ga_test',
    });
    console.log('✅ Test event sent');
  }
};

// Make it globally accessible for testing
if (typeof window !== 'undefined') {
  (window as any).testGA = testGA;
}

// Initialize gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions and key events
export const trackAnalysisStarted = (domain: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'analysis_started', {
      event_category: 'engagement',
      event_label: domain,
      domain: domain,
    });
  }
};

export const trackAnalysisCompleted = (domain: string, score: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'analysis_completed', {
      event_category: 'engagement',
      event_label: domain,
      value: score,
      domain: domain,
      score: score,
    });
  }
};

export const trackPricingModalOpened = (source: string) => {
  console.log('📊 Tracking pricing_modal_opened:', source);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pricing_modal_opened', {
      event_category: 'conversion',
      event_label: source,
      source: source,
    });
    console.log('✅ Pricing modal event sent');
  }
};

export const trackUpgradeClicked = (pricePoint: string) => {
  console.log('🎯 Tracking upgrade_clicked:', pricePoint);
  
  if (typeof window !== 'undefined' && window.gtag) {
    const price = parseFloat(pricePoint.replace(/[€$]/g, ''));
    const utmParams = getUTMParameters();
    
    // Send as GA4 purchase event (automatically converted to conversion)
    window.gtag('event', 'purchase', {
      transaction_id: `gso_${Date.now()}`,
      value: price,
      currency: 'EUR',
      items: [{
        item_id: 'gso_analysis',
        item_name: 'GSO Analysis Report',
        category: 'digital_service',
        quantity: 1,
        price: price
      }],
      ...utmParams
    });
    
    // Also send custom upgrade_clicked for tracking
    window.gtag('event', 'upgrade_clicked', {
      event_category: 'conversion',
      price_point: pricePoint,
      currency: 'EUR',
      value: price,
      ...utmParams
    });
    
    console.log('✅ Purchase and upgrade_clicked events sent to GA4');
  }
};

// UTM Parameter Utilities
export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Extract UTM parameters from current URL
export const getUTMParameters = (): UTMParameters => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };
};

// Store UTM parameters in sessionStorage for attribution across page views
export const storeUTMParameters = () => {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUTMParameters();
  const hasUTM = Object.values(utmParams).some(value => value !== undefined);
  
  if (hasUTM) {
    sessionStorage.setItem('utm_attribution', JSON.stringify(utmParams));
  }
};

// Get stored UTM parameters (for attribution across sessions)
export const getStoredUTMParameters = (): UTMParameters => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem('utm_attribution');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Get UTM parameters (current or stored)
export const getAttributionUTMParameters = (): UTMParameters => {
  const current = getUTMParameters();
  const hasCurrentUTM = Object.values(current).some(value => value !== undefined);
  
  if (hasCurrentUTM) {
    return current;
  }
  
  return getStoredUTMParameters();
};

// Track campaign attribution when user lands on site
export const trackCampaignAttribution = () => {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUTMParameters();
  const hasUTM = Object.values(utmParams).some(value => value !== undefined);
  
  console.log('🔍 UTM Debug:', { utmParams, hasUTM, url: window.location.href });
  
  if (hasUTM && window.gtag) {
    window.gtag('event', 'campaign_attribution', {
      event_category: 'acquisition',
      ...utmParams
    });
    
    // Store for later attribution
    storeUTMParameters();
    console.log('🎯 Campaign attribution tracked:', utmParams);
  } else {
    console.log('❌ No UTM parameters found or gtag not available');
  }
};

// Enhanced tracking functions with UTM attribution
export const trackAnalysisStartedWithAttribution = (domain: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const utmParams = getAttributionUTMParameters();
    
    window.gtag('event', 'analysis_started', {
      event_category: 'engagement',
      event_label: domain,
      domain: domain,
      ...utmParams
    });
  }
};

export const trackAnalysisCompletedWithAttribution = (domain: string, score: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const utmParams = getAttributionUTMParameters();
    
    window.gtag('event', 'analysis_completed', {
      event_category: 'engagement',
      event_label: domain,
      value: score,
      domain: domain,
      score: score,
      ...utmParams
    });
  }
};