# Retargeting Pixel Implementation Guide

## Overview
The GSO Insight platform now includes comprehensive retargeting pixel tracking for Facebook/Meta and Google Ads to help re-engage visitors who didn't convert.

## Setup Required

### 1. Facebook Pixel Setup
**Location**: `/src/app/layout.tsx` (lines 55-78)

**Current Status**: Template implemented - needs your pixel ID
```javascript
// Replace 'YOUR_PIXEL_ID' with your actual Facebook Pixel ID
fbq('init', 'YOUR_PIXEL_ID');
```

**How to get your Pixel ID**:
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager/)
2. Create a new pixel or select existing one
3. Copy the Pixel ID (format: 123456789012345)
4. Replace `YOUR_PIXEL_ID` in layout.tsx

### 2. Google Ads Conversion Tracking
**Location**: `/src/app/layout.tsx` (lines 80-92)

**Current Status**: Template implemented - needs your conversion ID
```javascript
// Replace 'AW-XXXXXXXXX' with your Google Ads conversion ID
gtag('config', 'AW-XXXXXXXXX');
```

**How to get your Conversion ID**:
1. Go to [Google Ads](https://ads.google.com/)
2. Tools & Settings → Measurement → Conversions
3. Create conversion action → Website
4. Copy the Conversion ID (format: AW-123456789)
5. Replace `AW-XXXXXXXXX` in layout.tsx

## Events Being Tracked

### Facebook Pixel Events
1. **PageView** - Automatic on every page load
2. **InitiateCheckout** - When user starts analysis
3. **ViewContent** - When pricing modal opens
4. **Purchase** - When user clicks upgrade
5. **Custom Events**:
   - `AnalysisStarted` - Custom event for retargeting
   - `PricingViewed` - Custom event for pricing page visitors

### Google Ads Events
1. **Page_view** - Automatic tracking
2. **Conversion** - When user clicks upgrade (needs conversion label)

## Retargeting Audiences You Can Create

### Facebook/Meta Audiences:
1. **Website Visitors** - All visitors (last 30/60/180 days)
2. **Analysis Starters** - Users who started but didn't complete analysis
3. **Pricing Viewers** - Users who viewed pricing but didn't purchase
4. **High-Intent Users** - Users who viewed pricing multiple times
5. **Lookalike Audiences** - Similar to your converters

### Google Ads Audiences:
1. **All Website Visitors** - Broad retargeting
2. **Converters** - People who completed purchase
3. **Analysis Starters** - Users who engaged with the tool
4. **Similar Audiences** - Google's lookalike targeting

## Campaign Ideas

### Facebook/Meta Retargeting Campaigns:
1. **Analysis Completers** → Promote premium upgrade with testimonials
2. **Pricing Viewers** → Offer limited-time discount
3. **Website Visitors** → Awareness campaign highlighting AI visibility benefits
4. **Lookalikes** → Broad acquisition campaign

### Google Ads Retargeting Campaigns:
1. **Dynamic Remarketing** → Show specific products viewed
2. **RLSA (Remarketing Lists for Search Ads)** → Bid higher on previous visitors
3. **Gmail Promotions** → Email-style ads to previous visitors
4. **YouTube Retargeting** → Video ads to website visitors

## Implementation Status
✅ **Facebook Pixel base code** - Implemented
✅ **Google Ads tracking code** - Implemented  
✅ **Event tracking functions** - All major events covered
✅ **Conversion tracking** - Purchase events with proper values
⚠️ **Pixel IDs** - Need to be configured with your actual IDs

## Next Steps
1. **Get your Facebook Pixel ID** and replace `YOUR_PIXEL_ID`
2. **Get your Google Ads Conversion ID** and replace `AW-XXXXXXXXX`
3. **Set up conversion labels** in Google Ads for different price points
4. **Test pixel firing** using Facebook Pixel Helper and Google Tag Assistant
5. **Create retargeting audiences** in both platforms
6. **Launch retargeting campaigns** focusing on high-intent users first

## Testing
After setting up your pixel IDs:

1. **Facebook Pixel Testing**:
   - Install Facebook Pixel Helper Chrome extension
   - Visit your site and check events fire correctly
   - Check Events Manager for real-time events

2. **Google Ads Testing**:
   - Install Google Tag Assistant Chrome extension
   - Verify conversion tracking in Google Ads interface
   - Test conversion events by completing purchase flow

## Expected Results
- **Increased conversion rates** by 15-30% from retargeting
- **Lower cost per acquisition** for returning visitors
- **Better attribution** across the entire customer journey
- **Audience insights** from pixel data for optimization