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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pricing_modal_opened', {
      event_category: 'conversion',
      event_label: source,
      source: source,
    });
  }
};

export const trackUpgradeClicked = (pricePoint: string) => {
  console.log('🎯 Tracking upgrade_clicked:', pricePoint);
  
  // Send directly to GA4 with debug mode enabled
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('✅ Sending event to GA4...');
    
    window.gtag('event', 'upgrade_clicked', {
      event_category: 'conversion',
      price_point: pricePoint,
      currency: 'EUR',
      debug_mode: true
    });
    
    console.log('✅ upgrade_clicked event sent to GA4');
  } else {
    console.log('❌ Cannot send to GA4 - gtag not available');
  }
};