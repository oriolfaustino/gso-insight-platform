import { NextRequest, NextResponse } from 'next/server';
import { getAssignedVariant, getVariantFromUrl, PRICING_VARIANTS } from '@/lib/ab-testing';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain') || 'test.com';
    const variant = searchParams.get('variant');
    
    // Test URL variant detection
    let urlVariant = null;
    if (variant && PRICING_VARIANTS[variant]) {
      urlVariant = PRICING_VARIANTS[variant];
    }
    
    // Test assigned variant
    const assignedVariant = getAssignedVariant(domain);
    
    // Final variant (URL takes precedence)
    const finalVariant = urlVariant || assignedVariant;
    
    return NextResponse.json({
      domain,
      requestedVariant: variant,
      urlVariant: urlVariant ? {
        id: urlVariant.id,
        name: urlVariant.name,
        price: urlVariant.price,
        currency: urlVariant.currency
      } : null,
      assignedVariant: {
        id: assignedVariant.id,
        name: assignedVariant.name,
        price: assignedVariant.price,
        currency: assignedVariant.currency
      },
      finalVariant: {
        id: finalVariant.id,
        name: finalVariant.name,
        price: finalVariant.price,
        currency: finalVariant.currency,
        description: finalVariant.description
      },
      allVariants: Object.keys(PRICING_VARIANTS),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug A/B error:', error);
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}