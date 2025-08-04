# UTM Campaign Tracking Guide for GSO Insight

## Overview
This guide outlines how to create and track UTM campaigns for GSO Insight using consistent naming conventions and best practices.

## UTM Parameter Structure

### Required Parameters
- **utm_source**: Where the traffic originates (reddit, linkedin, twitter, google, facebook)
- **utm_medium**: Type of marketing channel (paid-social, cpc, display, email, organic-social)
- **utm_campaign**: Specific campaign identifier (experiment-reddit-q3, spring-launch-2025)

### Optional Parameters
- **utm_term**: Keywords for paid search campaigns
- **utm_content**: To differentiate ad variations (blue-cta, green-cta, video-ad, text-ad)

## Campaign URL Builder
Use Google's Campaign URL Builder: https://ga-dev-tools.google/ga4/campaign-url-builder/

## Platform-Specific Examples

### Reddit Campaigns
```
Source: reddit
Medium: paid-social
Campaign: experiment-reddit-q3-2025
Term: (optional - for targeted subreddits)
Content: (ad variation - headline-a, headline-b)

Example URL:
https://gso-insight.com/?utm_source=reddit&utm_medium=paid-social&utm_campaign=experiment-reddit-q3-2025&utm_content=headline-a
```

### LinkedIn Campaigns  
```
Source: linkedin
Medium: paid-social
Campaign: experiment-linkedin-q3-2025
Term: (optional - job titles, industries)
Content: (ad format - sponsored-content, message-ad)

Example URL:
https://gso-insight.com/?utm_source=linkedin&utm_medium=paid-social&utm_campaign=experiment-linkedin-q3-2025&utm_content=sponsored-content
```

### Twitter/X Campaigns
```
Source: twitter
Medium: paid-social
Campaign: experiment-twitter-q3-2025
Term: (optional - keywords, interests)
Content: (creative variation - video-demo, static-image)

Example URL:
https://gso-insight.com/?utm_source=twitter&utm_medium=paid-social&utm_campaign=experiment-twitter-q3-2025&utm_content=video-demo
```

### Google Ads Campaigns
```
Source: google
Medium: cpc
Campaign: experiment-search-q3-2025
Term: (keywords - ai-visibility, seo-analysis)
Content: (ad group or ad variation)

Example URL:
https://gso-insight.com/?utm_source=google&utm_medium=cpc&utm_campaign=experiment-search-q3-2025&utm_term=ai-visibility&utm_content=ad-group-1
```

### Email Campaigns
```
Source: newsletter
Medium: email
Campaign: monthly-newsletter-march-2025
Content: (placement - header-cta, footer-link)

Example URL:
https://gso-insight.com/?utm_source=newsletter&utm_medium=email&utm_campaign=monthly-newsletter-march-2025&utm_content=header-cta
```

## Naming Conventions

### Best Practices
- **Lowercase only**: Use lowercase letters for all parameters
- **No spaces**: Use hyphens (-) instead of spaces
- **Be specific**: Use descriptive names that identify the campaign clearly
- **Include timeframe**: Add quarter/month/year for temporal tracking
- **Be consistent**: Use the same format across all campaigns

### Campaign Naming Structure
`[action]-[platform]-[timeframe]-[year]`

Examples:
- `experiment-reddit-q3-2025`
- `launch-linkedin-march-2025`
- `retargeting-facebook-q4-2025`

### Content Naming Structure
`[type]-[variation]`

Examples:
- `headline-a`, `headline-b`, `headline-c`
- `video-demo`, `static-image`, `carousel-ad`
- `blue-cta`, `green-cta`, `red-cta`

## Landing Page Optimization

### Recommended Landing Pages
- **General campaigns**: `https://gso-insight.com/` (main homepage)
- **Enterprise focus**: `https://gso-insight.com/?enterprise=true`
- **Specific features**: `https://gso-insight.com/?feature=ai-analysis`

## Tracking in GA4

### Key Reports
1. **Acquisition > Traffic acquisition**: See traffic by source/medium
2. **Acquisition > User acquisition**: New vs returning users by campaign
3. **Conversions > Conversion paths**: Attribution journey
4. **Custom reports**: Create campaign-specific dashboards

### Important Metrics
- **Users**: Total visitors from campaign
- **Sessions**: Number of site visits
- **Conversion rate**: % of users who upgrade
- **Cost per conversion**: Campaign ROI
- **Analysis completion rate**: % who finish analysis

## Campaign Tracking Implementation

The GSO Insight platform automatically:
1. **Captures UTM parameters** on page load
2. **Stores attribution** in sessionStorage for cross-page tracking
3. **Includes UTM data** in all conversion events
4. **Tracks campaign attribution** as custom GA4 events

### Key Events Tracked with UTM Attribution
- `campaign_attribution`: When user arrives with UTM parameters
- `analysis_started`: When user begins analysis (with original UTM)
- `analysis_completed`: When analysis finishes (with original UTM)
- `upgrade_clicked`: When user clicks premium upgrade (with original UTM)
- `purchase`: When user completes payment (with original UTM)

## Testing Your URLs

### Before Launch Checklist
1. ✅ Click test URL to ensure it loads correctly
2. ✅ Check browser developer tools for UTM parameters
3. ✅ Verify GA4 real-time reports show the traffic
4. ✅ Test conversion flow with UTM parameters
5. ✅ Confirm attribution appears in GA4 conversion data

### Testing Tools
- **GA4 DebugView**: Real-time event monitoring
- **Google Tag Assistant**: Verify tracking implementation
- **UTM parameter inspector**: Browser extension for checking URLs

## Campaign Documentation Template

For each campaign, document:

```markdown
## Campaign: [Campaign Name]
**Launch Date**: [Date]
**Budget**: [Amount]
**Objective**: [Goal - awareness, conversion, etc.]

### UTM Parameters
- Source: [source]
- Medium: [medium]  
- Campaign: [campaign-name]
- Content variations: [list all content variations]

### URLs
- [Variation 1]: [full UTM URL]
- [Variation 2]: [full UTM URL]

### Success Metrics
- Target conversions: [number]
- Target CPA: [cost per acquisition]
- Expected traffic: [sessions]

### Results (post-campaign)
- Actual conversions: [number]
- Actual CPA: [amount]
- Actual traffic: [sessions]
- Key learnings: [insights]
```

## Troubleshooting

### Common Issues
1. **UTM parameters not showing in GA4**:
   - Check if auto-tagging is disabled in Google Ads
   - Verify UTM parameters are URL encoded
   - Ensure GA4 tracking code is installed correctly

2. **Attribution not persisting across pages**:
   - Check sessionStorage implementation
   - Verify UTM tracking functions are called correctly
   - Test cross-page navigation with UTM URLs

3. **Conversion attribution missing**:
   - Confirm all conversion events include UTM parameters
   - Check if user cleared browser storage
   - Verify attribution model in GA4 settings