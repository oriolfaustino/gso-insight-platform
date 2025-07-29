// Google Analytics utilities
export const GA_TRACKING_ID = 'G-8H4L3NMS23';

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
  event({
    action: 'analysis_started',
    category: 'engagement',
    label: domain,
  });
};

export const trackAnalysisCompleted = (domain: string, score: number) => {
  event({
    action: 'analysis_completed',
    category: 'engagement',
    label: domain,
    value: score,
  });
};

export const trackPricingModalOpened = (source: string) => {
  event({
    action: 'pricing_modal_opened',
    category: 'conversion',
    label: source,
  });
};

export const trackUpgradeClicked = (pricePoint: string) => {
  console.log('🎯 Tracking upgrade_clicked:', pricePoint);
  event({
    action: 'upgrade_clicked',
    category: 'conversion',
    label: pricePoint,
  });
};