'use client';

import { useState, useEffect } from 'react';
import { X, Check, Star, Clock, Shield, Zap } from 'lucide-react';
import { getAssignedVariant, getVariantFromUrl, trackConversion, type PricingVariant } from '@/lib/ab-testing';
import { trackPricingModalOpened, trackUpgradeClicked } from '@/lib/gtag';
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
      
      // Track modal opened
      trackPricingModalOpened('results_page');
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
    trackUpgradeClicked(`${variant.price}${variant.currency}`);

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
      alert('Payment processing failed. Please try again or contact support.');
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your interest in the complete GSO analysis for <span className="font-semibold">{domain}</span>.
            <br /><br />
            Our team will contact you within 24 hours to process your order and deliver your comprehensive AI visibility report.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{variant?.name || 'Complete GSO Analysis'}</h2>
            <p className="text-gray-600">Unlock all 10 metrics for {domain}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Pricing */}
        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600">LAUNCH SPECIAL</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {variant?.currency}{variant?.price || 250}
                  {variant?.isSubscription && (
                    <span className="text-lg text-gray-600 font-normal">/{variant.subscriptionPeriod}</span>
                  )}
                </h3>
                {variant?.id !== 'budget' && !variant?.isSubscription && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">
                      {variant?.currency}{((variant?.price || 250) * 2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">50% OFF</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Limited Time</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              {variant?.description || 'Complete AI visibility analysis with all 10 proprietary GSO metrics, competitor benchmarking, and actionable recommendations.'}
            </p>
          </div>

          {/* What's Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                Complete Analysis
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {variant?.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                )) || (
                  <>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      All 10 GSO metrics including content relevance, brand mention quality, and search compatibility
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Cross-platform AI testing (GPT-4, Claude, Gemini, open models)
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Deliverables
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  50+ page comprehensive PDF report
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Actionable improvement roadmap
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Priority-ranked quick wins list
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  30-minute strategy consultation call
                </li>
              </ul>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to proceed"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              You&apos;ll receive the complete analysis within 48 hours
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
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
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Secure Payment
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                48hr Delivery
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Money-back Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}