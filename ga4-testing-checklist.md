# GA4 Events Testing Checklist

## Quick Test (Do This Now - 15 minutes)

### Step 1: Test Basic Events
1. Go to your live site: https://gso-insight.com
2. Open Chrome DevTools → Console
3. Type: `window.testGA()` and press Enter
4. You should see GA test logs in console

### Step 2: Test UTM Tracking
1. Visit: `https://gso-insight.com?utm_source=reddit&utm_medium=paid-social&utm_campaign=test-campaign`
2. Check console - you should see: "🎯 Campaign attribution tracked"
3. Run an analysis with any domain
4. Check console for UTM parameters in events

### Step 3: Test A/B Variants
1. Visit: `https://gso-insight.com?variant=budget` (should show €30)
2. Visit: `https://gso-insight.com?variant=premium` (should show €250)  
3. Visit: `https://gso-insight.com?variant=subscription` (should show €5/3 months)
4. Try clicking "Unlock Premium Analysis" - check console for tracking

### Step 4: Check GA4 Real-Time
1. Go to GA4 → Reports → Realtime
2. Perform the tests above
3. You should see events appearing in real-time

## What to Look For

### ✅ **Working correctly if you see:**
- Console logs showing events being sent
- Real-time events in GA4
- UTM parameters in event data
- A/B test assignments logging

### ❌ **Issues if you see:**
- No console logs when testing
- No events in GA4 real-time
- JavaScript errors in console
- Missing UTM parameters in events

## If Events Are Not Working

### Common Fixes:
1. **Clear browser cache** and try again
2. **Check GA4 tracking ID** is correct: G-8H4L3NMS23
3. **Verify domain** is added to GA4 property
4. **Check for ad blockers** that might block GA4

### Debug Commands:
```javascript
// Test in browser console:
window.testGA()
window.gtag('event', 'test_manual_event', { test: true })
console.log('dataLayer:', window.dataLayer)
```

## Next Steps After Testing

### If Events Work ✅:
- Continue with A/B test setup in GA4
- Set up conversion goals  
- Launch test campaigns with UTM parameters

### If Events Don't Work ❌:
- Fix GA4 implementation first
- Re-test before proceeding
- Don't launch campaigns until tracking is confirmed working