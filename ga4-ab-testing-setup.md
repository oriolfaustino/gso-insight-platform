# GA4 A/B Testing Setup Guide

## Overview
Your A/B test is already implemented in code with 4 pricing variants:
- **Control**: €97 (Complete Analysis)
- **Premium**: €250 (Premium Analysis) 
- **Budget**: €30 (Essential Analysis)
- **Subscription**: €5/3 months (GSO Pro)

## GA4 Configuration Steps

### 1. Create Custom Dimensions
In GA4 Admin → Data display → Custom definitions → Custom dimensions:

**Dimension 1: A/B Test Variant**
- Dimension name: `ab_test_variant`
- Scope: Event
- Description: `Pricing variant assigned to user (control, premium, budget, subscription)`
- Event parameter: `variant`

**Dimension 2: Price Point**
- Dimension name: `price_point` 
- Scope: Event
- Description: `Price of the variant shown to user`
- Event parameter: `price`

### 2. Create Conversion Goals
In GA4 Admin → Data display → Conversions:

Mark these events as conversions:
- ✅ `purchase` (already marked as conversion by default)
- ✅ `upgrade_clicked` (mark as conversion)
- ✅ `pricing_modal_opened` (mark as conversion for engagement)

### 3. Create Custom Reports

#### A/B Test Performance Report
1. Go to GA4 → Explore → Free form
2. Set up dimensions:
   - Primary: `AB Test Variant` (custom dimension)
   - Secondary: `Price Point` (custom dimension)
3. Set up metrics:
   - Users
   - Sessions  
   - Conversions (upgrade_clicked)
   - Purchase revenue
   - Conversion rate
4. Add filter: `Event name = upgrade_clicked`

#### Conversion Funnel Report
1. Go to GA4 → Explore → Funnel exploration
2. Set up funnel steps:
   - Step 1: `page_view` (landing)
   - Step 2: `analysis_started` 
   - Step 3: `pricing_modal_opened`
   - Step 4: `upgrade_clicked`
   - Step 5: `purchase`
3. Add breakdown by `AB Test Variant`

### 4. Key Metrics to Track

#### Primary Success Metrics:
- **Conversion Rate**: % of users who click "upgrade" 
- **Revenue per Visitor**: Total revenue / total visitors
- **Average Order Value**: Revenue / conversions

#### Secondary Metrics:
- **Modal Open Rate**: % who open pricing modal
- **Analysis Completion Rate**: % who complete analysis
- **Time to Conversion**: How quickly users convert

## Testing the Setup

### 1. Generate Test Data
Visit these URLs to test each variant:
- Control: `https://gso-insight.com?variant=control`
- Premium: `https://gso-insight.com?variant=premium`
- Budget: `https://gso-insight.com?variant=budget`
- Subscription: `https://gso-insight.com?variant=subscription`

For each:
1. Run an analysis
2. Open pricing modal
3. Click upgrade button
4. Check GA4 real-time for events

### 2. Verify Data in GA4
- Check custom dimensions are populated
- Verify conversion events are firing
- Confirm A/B test reports show data

## Statistical Significance

### Minimum Sample Size Calculation:
- **Baseline conversion rate**: 2-5% (estimate)
- **Minimum detectable effect**: 20% improvement
- **Statistical power**: 80%
- **Confidence level**: 95%

**Result**: ~2,000-5,000 visitors per variant for significance

### Test Duration:
- **Minimum**: 2 weeks (account for weekly patterns)
- **Maximum**: 8 weeks (avoid novelty effects)
- **Stop early**: Only if significance reached AND minimum sample achieved

## Monitoring Checklist

### Daily (First Week):
- [ ] Check that all variants are getting traffic
- [ ] Verify events are firing correctly
- [ ] Monitor for any technical issues

### Weekly:
- [ ] Review conversion rates by variant
- [ ] Check statistical significance
- [ ] Analyze user behavior patterns
- [ ] Monitor for external factors (seasonality, marketing campaigns)

## Decision Framework

### When to Declare a Winner:
1. ✅ Statistical significance achieved (p < 0.05)
2. ✅ Minimum sample size reached per variant
3. ✅ Test run for minimum duration (2 weeks)
4. ✅ Results are practically significant (>10% improvement)

### Implementation:
- **Clear winner**: Implement winning variant
- **No clear winner**: Keep current (control) variant
- **Close results**: Consider segmented analysis (mobile vs desktop, traffic source, etc.)

## Expected Outcomes

### Hypothesis:
- **Budget variant (€30)**: Higher conversion rate, lower revenue per user
- **Premium variant (€250)**: Lower conversion rate, higher revenue per user  
- **Subscription (€5/month)**: Potentially highest conversion rate, recurring revenue
- **Control (€97)**: Baseline for comparison

### Success Criteria:
- Find variant that maximizes **total revenue** (conversion rate × price)
- Achieve statistical significance
- Gather insights for future pricing decisions