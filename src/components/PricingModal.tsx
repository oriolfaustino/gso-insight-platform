'use client';

import { useState, useEffect } from 'react';
import { X, Check, Star, Clock, Shield, Zap } from 'lucide-react';
import { getAssignedVariant, getVariantFromUrl, trackConversion, type PricingVariant } from '@/lib/ab-testing';
import { trackPricingModalOpened, trackUpgradeClicked, trackPricingModalWithRetargeting, trackUpgradeClickedWithRetargeting, trackPricingModalWithRedditPixel, trackUpgradeClickedWithRedditPixel } from '@/lib/gtag';
import { createPaymentSession } from '@/lib/stripe';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  score?: number;
}

export function PricingModal({ isOpen, onClose, domain, score }: PricingModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [variant, setVariant] = useState<PricingVariant | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Get variant from URL or assign one
      const urlVariant = getVariantFromUrl();
      const assignedVariant = urlVariant || getAssignedVariant(domain);
      
      console.log('🎯 PricingModal Debug:', {
        isOpen,
        domain,
        urlVariant: urlVariant ? `${urlVariant.id} (${urlVariant.currency}${urlVariant.price})` : null,
        assignedVariant: `${assignedVariant.id} (${assignedVariant.currency}${assignedVariant.price})`,
        finalVariant: `${assignedVariant.id} (${assignedVariant.currency}${assignedVariant.price})`
      });
      
      setVariant(assignedVariant);
      
      // Track modal opened with retargeting + Reddit Pixel
      trackPricingModalWithRedditPixel('results_page');
    }
  }, [isOpen, domain]);

  if (!isOpen) {
    return null;
  }

  const handlePurchase = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    if (!variant) return;

    // Track conversion attempt
    trackConversion(variant, 'click');
    trackUpgradeClickedWithRedditPixel(`${variant.price}${variant.currency}`);

    setIsSubmitting(true);
    
    try {
      // Create Stripe payment session
      await createPaymentSession({
        email,
        domain,
        variant: variant.id,
        price: variant.price,
        currency: variant.currency,
        isSubscription: variant.isSubscription,
        subscriptionPeriod: variant.subscriptionPeriod,
      });
      
      // Track successful conversion initiation
      trackConversion(variant, 'purchase');
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Payment Error: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="card-premium max-w-md w-full p-12 text-center glass animate-scale-in"
             style={{ boxShadow: 'var(--shadow-2xl)' }}>
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" 
                 style={{ background: 'var(--accent-emerald)' }}>
              <Check className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -inset-2 rounded-full opacity-20 blur-xl"
                 style={{ background: 'var(--accent-emerald)' }} />
          </div>
          <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--neutral-900)' }}>
            Thank You!
          </h3>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--neutral-600)' }}>
            We&apos;ve received your interest in the complete GSO analysis for <span className="font-semibold text-gradient">{domain}</span>.
            <br /><br />
            Our team will contact you within 24 hours to process your order and deliver your comprehensive AI visibility report.
          </p>
          <button
            onClick={onClose}
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-premium max-w-3xl w-full max-h-[90vh] overflow-y-auto glass animate-scale-in"
           style={{ boxShadow: 'var(--shadow-2xl)' }}>
        {/* Header */}
        <div className="flex justify-between items-start p-8 border-b" style={{ borderColor: 'var(--neutral-200)' }}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                 style={{ 
                   background: 'var(--primary-100)', 
                   color: 'var(--primary-700)'
                 }}>
              <Star className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Premium Analysis</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl mb-3" style={{ color: 'var(--neutral-900)' }}>
              {variant?.name || 'Complete GSO Analysis'}
            </h2>
            <p className="font-body text-lg" style={{ color: 'var(--neutral-600)' }}>
              Unlock all 10 metrics for <span className="text-gradient font-semibold">{domain}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl transition-all duration-200 hover:scale-110"
            style={{ 
              color: 'var(--neutral-400)',
              background: 'var(--neutral-100)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--neutral-600)';
              e.target.style.background = 'var(--neutral-200)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--neutral-400)';
              e.target.style.background = 'var(--neutral-100)';
            }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Pricing */}
        <div className="p-8">
          <div className="card-premium p-8 mb-8 relative overflow-hidden"
               style={{ 
                 background: 'var(--gradient-primary)',
                 boxShadow: 'var(--shadow-xl)'
               }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" 
                   style={{ 
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: '30px 30px'
                   }} />
            </div>
            
            <div className="relative flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                     style={{ 
                       background: 'rgba(255, 255, 255, 0.2)', 
                       color: 'white'
                     }}>
                  <Star className="w-4 h-4" />
                  <span className="font-body text-sm font-medium">LAUNCH SPECIAL</span>
                </div>
                <h3 className="font-display text-5xl font-bold text-white mb-2">
                  {variant?.currency}{variant?.price || 250}
                  {variant?.isSubscription && (
                    <span className="text-2xl font-normal opacity-80">/{variant.subscriptionPeriod}</span>
                  )}
                </h3>
                {variant?.id !== 'budget' && !variant?.isSubscription && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-white/70 line-through">
                      {variant?.currency}{((variant?.price || 250) * 2)}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold"
                          style={{ background: 'var(--accent-rose)', color: 'white' }}>
                      50% OFF
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                     style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-white/80 mt-2">Limited Time</p>
              </div>
            </div>
            <p className="font-body text-lg text-white/90 leading-relaxed relative">
              {variant?.description || 'Complete AI visibility analysis with all 10 proprietary GSO metrics, competitor benchmarking, and actionable recommendations.'}
            </p>
          </div>

          {/* What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="card-premium p-6 space-y-4">
              <h4 className="font-heading text-lg flex items-center gap-3" style={{ color: 'var(--neutral-900)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                     style={{ background: 'var(--primary-100)' }}>
                  <Zap className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                Complete Analysis
              </h4>
              <ul className="space-y-3">
                {variant?.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                         style={{ background: 'var(--accent-emerald)' }}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                      {feature}
                    </span>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                           style={{ background: 'var(--accent-emerald)' }}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                        All 10 GSO metrics including content relevance, brand mention quality, and search compatibility
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                           style={{ background: 'var(--accent-emerald)' }}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                        Cross-platform AI testing (GPT-4, Claude, Gemini, open models)
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="card-premium p-6 space-y-4">
              <h4 className="font-heading text-lg flex items-center gap-3" style={{ color: 'var(--neutral-900)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                     style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Shield className="w-5 h-5" style={{ color: 'var(--accent-emerald)' }} />
                </div>
                Deliverables
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                       style={{ background: 'var(--accent-emerald)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                    50+ page comprehensive PDF report
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                       style={{ background: 'var(--accent-emerald)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                    Actionable improvement roadmap
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                       style={{ background: 'var(--accent-emerald)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                    Priority-ranked quick wins list
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                       style={{ background: 'var(--accent-emerald)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-body text-sm" style={{ color: 'var(--neutral-700)' }}>
                    30-minute strategy consultation call
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-8">
            <label htmlFor="email" className="font-heading text-sm mb-3 block" style={{ color: 'var(--neutral-800)' }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to proceed"
              className="input-premium w-full text-lg py-4 px-6"
              required
            />
            <p className="font-body text-sm mt-3" style={{ color: 'var(--neutral-500)' }}>
              You&apos;ll receive the complete analysis within 48 hours
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="btn-primary flex-1 px-8 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  {variant?.ctaText || 'Get Complete Analysis'} - {variant?.currency}{variant?.price || 250}
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="btn-secondary px-8 py-4 text-lg font-semibold"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                     style={{ background: 'var(--primary-100)' }}>
                  <Shield className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                <span className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                     style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Clock className="w-5 h-5" style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <span className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  48hr Delivery
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                     style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <Star className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} />
                </div>
                <span className="font-body text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>
                  Money-back Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}