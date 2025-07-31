'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const domain = searchParams.get('domain');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd verify the session with Stripe
      // For demo purposes, we'll just show a success message
      setTimeout(() => {
        setSessionData({
          payment_status: 'paid',
          customer_email: 'customer@example.com',
          amount_total: 0,
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your GSO analysis is being prepared.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-600">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Analysis Processing</h3>
                <p className="text-gray-600 text-sm">
                  Our AI systems are conducting a comprehensive analysis of {domain || 'your website'} 
                  across all 10 GSO metrics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-yellow-600">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Report Generation</h3>
                <p className="text-gray-600 text-sm">
                  We're compiling your detailed PDF report with actionable recommendations 
                  and competitor analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-green-600">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Your complete analysis will be delivered to your email within 48 hours, 
                  along with next steps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Demo Notice</h3>
              <p className="text-blue-800 text-sm">
                This is a demonstration of the payment flow. In the live version, 
                you would receive your complete GSO analysis report via email within 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Analyze Another Site
          </a>
          <a 
            href="/about" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            Learn More About GSO
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}