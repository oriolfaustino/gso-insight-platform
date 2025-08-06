# GA4 to Marketing Tracker Integration Guide

## Overview
How to extract data from GA4 and input it into your marketing validation tracker for comprehensive campaign analysis.

## Daily Data Collection Process

### 1. GA4 Real-Time Monitoring
**Go to**: GA4 → Reports → Real-time

**Check these metrics every day**:
- Active users by source (Reddit, Google, LinkedIn)
- Events in last 30 minutes: `analysis_started`, `pricing_modal_opened`, `upgrade_clicked`
- Conversions by traffic source

### 2. GA4 Acquisition Report
**Go to**: GA4 → Reports → Acquisition → Traffic acquisition

**Filter by**:
- Date range: Yesterday or last 7 days
- Primary dimension: Session source/medium

**Extract these metrics**:
```
Traffic Source | Users | Sessions | Engaged Sessions | Events | Conversions | Revenue
reddit/social  | 45    | 52      | 12              | 28     | 2          | €194
google/cpc     | 23    | 25      | 8               | 15     | 1          | €97
linkedin/cpc   | 12    | 13      | 4               | 7      | 0          | €0
```

### 3. GA4 Conversion Funnel Report
**Go to**: GA4 → Explore → Funnel exploration

**Set up funnel**:
1. Step 1: `page_view` (landing page)
2. Step 2: `analysis_started` 
3. Step 3: `pricing_modal_opened`
4. Step 4: `upgrade_clicked`
5. Step 5: `purchase` (if configured)

**Breakdown by**: Session source/medium

### 4. Campaign-Specific UTM Tracking
**Go to**: GA4 → Reports → Acquisition → Campaigns

**View by UTM parameters**:
- Campaign name (ai_visibility_test, search_campaign, etc.)
- Campaign source (reddit, google, linkedin)
- Campaign medium (social, cpc, etc.)

## Data Mapping: GA4 → Marketing Tracker

### Channel Performance Mapping
```
GA4 Metric                    → Tracker Field
─────────────────────────────────────────────
Users (by source)            → Landing Page Views
analysis_started events      → Analysis Started  
pricing_modal_opened events  → Pricing Viewed
upgrade_clicked events       → Purchases*
purchase events (if setup)   → Purchases
Total revenue                → Revenue
Ad spend (manual entry)      → Budget Spent
```

*Note: upgrade_clicked ≈ purchases since most users complete payment

### Daily Tracker Update Process

#### Step 1: Collect GA4 Data
1. Open GA4 → Traffic acquisition report
2. Filter: Yesterday's date
3. Export or note down metrics by source

#### Step 2: Get Ad Spend Data
- **Reddit**: Check promoted post spend
- **Google Ads**: Google Ads dashboard → Campaigns
- **LinkedIn**: LinkedIn Campaign Manager

#### Step 3: Input into Marketing Dashboard
Open `marketing-dashboard.html` and add new row:

```
Date: [Yesterday's date]
Channel: Reddit/Google Ads/LinkedIn  
Campaign: [UTM campaign name]
Budget Spent: [From ad platform]
Clicks: [From ad platform]
Landing Views: [GA4 Users by source]
Analysis Started: [GA4 analysis_started events]
Pricing Viewed: [GA4 pricing_modal_opened events]  
Purchases: [GA4 upgrade_clicked events]
Revenue: [GA4 revenue by source]
```

## Automated Data Collection (Advanced)

### GA4 Reporting API Setup
For automatic data collection, you can use GA4 Reporting API:

```javascript
// Example API call structure
const reportRequest = {
  property: 'properties/YOUR_GA4_PROPERTY_ID',
  dateRanges: [{ startDate: 'yesterday', endDate: 'yesterday' }],
  dimensions: [
    { name: 'sessionSource' },
    { name: 'sessionMedium' },
    { name: 'sessionCampaignName' }
  ],
  metrics: [
    { name: 'activeUsers' },
    { name: 'eventCount' },
    { name: 'purchaseRevenue' }
  ],
  dimensionFilter: {
    filter: {
      fieldName: 'eventName',
      stringFilter: { value: 'analysis_started' }
    }
  }
};
```

### Google Sheets Integration
You can also export GA4 data directly to Google Sheets:

1. **GA4 → Explore → Free form**
2. **Set up report** with your dimensions/metrics
3. **Share → Export to Google Sheets**
4. **Set up automated refresh** (daily)

## Weekly Analysis Checklist

### Monday: Weekend Performance Review
- [ ] Check Reddit post performance from weekend
- [ ] Update tracker with weekend data
- [ ] Calculate weekly CPA and ROAS

### Wednesday: Mid-week Optimization
- [ ] Review GA4 funnel conversion rates
- [ ] Identify best-performing UTM campaigns
- [ ] Adjust ad spend allocation

### Friday: Week Summary & Planning
- [ ] Export weekly GA4 data
- [ ] Update marketing tracker dashboard
- [ ] Plan next week's campaigns based on data

## Key Metrics to Watch Daily

### 🔴 Red Flags (Stop/Optimize)
- **CPA > €100**: Campaign too expensive
- **Landing page conversion < 5%**: Landing page issues
- **ROAS < 1:1**: Losing money on ads

### 🟡 Yellow Flags (Monitor Closely)  
- **CPA €50-100**: Within range but needs optimization
- **Landing page conversion 5-10%**: Average performance
- **ROAS 1:1-2:1**: Breaking even, needs improvement

### 🟢 Green Flags (Scale Up)
- **CPA < €50**: Great performance, increase budget
- **Landing page conversion > 10%**: Excellent landing page
- **ROAS > 3:1**: Highly profitable, scale aggressively

## Sample Daily Report Template

```
Date: 2025-01-15
─────────────────

REDDIT PERFORMANCE:
• Spend: €45
• Clicks: 89  
• Landing views: 84
• Analysis started: 11 (13.1% conversion)
• Purchases: 2
• Revenue: €194
• CPA: €22.50 ✅
• ROAS: 4.3:1 ✅

GOOGLE ADS PERFORMANCE:
• Spend: €120
• Clicks: 42
• Landing views: 38
• Analysis started: 5 (13.2% conversion) 
• Purchases: 1
• Revenue: €97
• CPA: €120 🔴
• ROAS: 0.8:1 🔴

ACTIONS:
✅ Increase Reddit budget (+€20/day)
🔴 Pause Google Ads search campaign
🟡 Test new LinkedIn campaign tomorrow
```

This systematic approach ensures you have all the data needed to make informed decisions about scaling or stopping campaigns.