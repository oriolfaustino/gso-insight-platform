# Reddit Pixel Implementation Guide

## Overview
Complete setup guide for Reddit Pixel tracking on GSO Insight platform. This enables proper attribution, retargeting, and conversion optimization for Reddit ads.

## ✅ Implementation Status
- **Reddit Pixel base code**: ✅ Added to layout.tsx
- **Event tracking functions**: ✅ All major events covered
- **Component integration**: ✅ Landing page and pricing modal updated
- **Advanced matching**: ⚠️ Needs email parameter setup (optional)
- **Pixel ID**: ❗ Replace `YOUR_REDDIT_PIXEL_ID` with actual ID

## 🔧 Setup Steps

### 1. Get Your Reddit Pixel ID
1. Go to [Reddit Ads Manager](https://ads.reddit.com/)
2. Navigate to **Tools** → **Conversions** → **Pixel**
3. Create a new pixel or select existing one
4. Copy the Pixel ID (format: `px_XXXXXXXXX`)

### 2. Configure Pixel ID
Replace `YOUR_REDDIT_PIXEL_ID` in `/src/app/layout.tsx` line 84:

```javascript
// Current (template)
rdt('init','YOUR_REDDIT_PIXEL_ID', {

// Replace with (your actual ID)
rdt('init','px_abc123def456', {
```

### 3. Verify Installation
1. Install **Reddit Pixel Helper** Chrome extension
2. Visit your site at https://gso-insight.com/
3. Check that PageVisit event fires automatically
4. Test analysis flow and verify Lead/ViewContent/Purchase events

## 📊 Events Being Tracked

### Automatic Events
- **PageVisit** - Fires on every page load (automatic)

### Custom Events (Your Platform)
| User Action | Reddit Event | Metadata | Purpose |
|------------|-------------|----------|---------|
| Starts Analysis | `Lead` | customEventName: 'AnalysisStarted' | Track interest |
| Views Pricing | `ViewContent` | customEventName: 'PricingViewed' | Track consideration |
| Clicks Upgrade | `Purchase` | value: €30-250, transactionId, itemCount: 1 | Track conversions |

### Event Parameters
All events include:
- `value`: Price/revenue amount
- `currency`: 'EUR'
- `customEventName`: For detailed tracking

## 🎯 Campaign Links for Reddit

### Campaign URLs
Since you're using Reddit Pixel, you can use clean URLs:

**Primary Campaign Link:**
```
https://gso-insight.com/
```

**Track Different Sources (Optional):**
```
https://gso-insight.com/?ref=reddit_organic
https://gso-insight.com/?ref=reddit_promoted
```

## 📈 Expected Reddit Ads Dashboard Metrics

### Conversion Funnel
1. **Impressions** → Ad views on Reddit
2. **Clicks** → Visits to your landing page  
3. **PageVisit** → Successful page loads (should match clicks ~95%)
4. **Lead** → Analysis started (~10-15% of PageVisits)
5. **ViewContent** → Pricing viewed (~20-30% of Leads)
6. **Purchase** → Upgrade clicked (~2-5% of ViewContent)

### Key Metrics to Monitor
- **Click-Through Rate (CTR)**: Target 1.5-3%
- **Lead Conversion Rate**: Target 10-15%
- **Purchase Conversion Rate**: Target 2-5%
- **Return on Ad Spend (ROAS)**: Target 3:1+

## 🔄 Attribution & Retargeting

### Attribution Windows
Reddit tracks:
- **Click Attribution**: Up to 28 days
- **View Attribution**: Up to 1 day
- **Cross-device tracking**: via advanced matching

### Retargeting Audiences You Can Create
1. **Website Visitors** (PageVisit) - Broad retargeting
2. **Analysis Starters** (Lead) - High-intent users
3. **Pricing Viewers** (ViewContent) - Very high-intent
4. **Cart Abandoners** - Users who viewed pricing but didn't purchase
5. **Converters** (Purchase) - For lookalike audiences

### Retargeting Campaign Ideas
1. **Analysis Starters** → "Complete your AI visibility check"
2. **Pricing Viewers** → "Limited time: 50% off premium analysis"  
3. **Website Visitors** → "See how AI systems find your business"

## 🚀 Campaign Setup in Reddit Ads

### 1. Campaign Creation
- **Objective**: Conversions
- **Conversion Event**: Purchase (for sales campaigns) or Lead (for awareness)
- **Pixel**: Select your configured pixel

### 2. Targeting
- **Communities**: r/entrepreneur, r/smallbusiness, r/marketing
- **Interests**: Business, Entrepreneurship, AI, Marketing
- **Demographics**: 25-45, Business owners/managers

### 3. Ad Creative Examples
**Headlines:**
- "Is AI finding your business when customers ask for recommendations?"
- "See exactly how ChatGPT views your business (free 60-sec check)"
- "Why your competitors might be getting AI recommendations instead of you"

**Body Text:**
- "Most businesses have no idea how they appear to AI assistants like ChatGPT and Claude. When customers ask 'recommend a [industry] company,' are you being suggested? Get a free AI visibility analysis in 30 seconds."

## 🔍 Testing & Validation

### Pre-Launch Checklist
- [ ] Reddit Pixel Helper shows pixel firing
- [ ] PageVisit event fires on landing page
- [ ] Lead event fires when analysis starts  
- [ ] ViewContent event fires when pricing modal opens
- [ ] Purchase event fires when upgrade clicked
- [ ] All events show correct value/currency

### Launch Week Monitoring
**Daily Checks:**
- Reddit Ads Manager conversion data
- Event volumes match expected ratios
- No tracking errors in browser console
- Reddit Pixel Helper shows consistent firing

**Success Metrics (Week 1):**
- 100+ PageVisits from Reddit traffic
- 10+ Lead events (10% conversion)
- 3+ ViewContent events (30% of leads)
- 1+ Purchase events (Target CPA <€50)

## 🎯 Optimization Tips

### Based on Reddit's Best Practices
1. **Track Full Journey**: We're tracking PageVisit → Lead → ViewContent → Purchase
2. **Use Custom Events**: Our customEventName parameter helps with detailed analysis
3. **Event Metadata**: All events include value/currency for ROAS calculation
4. **Retargeting Audiences**: Build audiences based on each funnel step

### Performance Optimization
- **Low CTR (<1.5%)**: Test new headlines/creative
- **Low Lead Rate (<10%)**: Optimize landing page messaging
- **Low Purchase Rate (<2%)**: Test pricing/urgency elements
- **High CPA (>€50)**: Pause and optimize creative or targeting

## 📋 Troubleshooting

### Common Issues
**Pixel Not Firing:**
- Check Reddit Pixel Helper extension
- Verify pixel ID is correct (starts with 'px_')
- Check browser console for errors

**Low Attribution:**
- Users may convert days later (view-through conversions)
- Check attribution window settings
- Verify advanced matching setup

**Event Volume Issues:**
- Compare Reddit pixel events to GA4 events
- Check if events fire in network tab
- Verify event parameters format

## 🔗 Campaign URLs Summary

**For Reddit Ads:**
```
Primary: https://gso-insight.com/
```

**For Tracking Attribution:**
- Use Reddit Pixel for attribution (automatic)
- GA4 will show traffic as reddit.com referral
- Reddit Ads Manager will show pixel conversions
- Compare both sources for validation

This setup gives you the most accurate Reddit campaign tracking and enables powerful retargeting capabilities!