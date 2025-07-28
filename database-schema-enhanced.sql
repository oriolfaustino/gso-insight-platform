-- Enhanced GSO Insight Platform Database Schema with Real Data Storage
-- Run this in your Supabase SQL Editor

-- Table for storing raw crawler data
CREATE TABLE IF NOT EXISTS crawler_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  raw_content TEXT, -- Full scraped content
  markdown_content TEXT, -- Cleaned markdown
  html_content TEXT, -- Original HTML if available
  metadata JSONB, -- All metadata from crawler
  
  -- Content analysis fields
  word_count INTEGER DEFAULT 0,
  heading_count INTEGER DEFAULT 0,
  paragraph_count INTEGER DEFAULT 0,
  link_count INTEGER DEFAULT 0,
  image_count INTEGER DEFAULT 0,
  
  -- SEO data
  title TEXT,
  description TEXT,
  keywords TEXT[],
  h1_tags TEXT[],
  h2_tags TEXT[],
  h3_tags TEXT[],
  
  -- Technical data
  page_load_time INTEGER, -- milliseconds
  response_status INTEGER,
  content_type VARCHAR(100),
  
  -- Trust signals detected
  contact_info JSONB, -- emails, phones, addresses found
  social_links TEXT[],
  certifications TEXT[],
  testimonials_count INTEGER DEFAULT 0,
  
  -- Business indicators
  pricing_mentioned BOOLEAN DEFAULT false,
  services_listed TEXT[],
  location_data JSONB,
  
  -- Crawler info
  crawler_used VARCHAR(50) DEFAULT 'Firecrawl',
  crawl_duration INTEGER, -- milliseconds
  crawl_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced analysis results table
CREATE TABLE IF NOT EXISTS analysis_results_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  crawler_data_id UUID REFERENCES crawler_data(id),
  domain VARCHAR(255) NOT NULL,
  
  -- Overall scores
  overall_score INTEGER NOT NULL,
  confidence_level INTEGER DEFAULT 85, -- How confident we are in the analysis
  
  -- Individual metric scores with reasoning
  ai_recommendation_rate INTEGER NOT NULL,
  ai_recommendation_reasoning TEXT,
  ai_recommendation_insights TEXT[],
  
  competitive_ranking INTEGER NOT NULL,
  competitive_ranking_reasoning TEXT,
  competitive_ranking_insights TEXT[],
  
  content_relevance INTEGER NOT NULL,
  content_relevance_reasoning TEXT,
  content_relevance_insights TEXT[],
  
  brand_mention_quality INTEGER NOT NULL,
  brand_mention_quality_reasoning TEXT,
  brand_mention_quality_insights TEXT[],
  
  search_compatibility INTEGER NOT NULL,
  search_compatibility_reasoning TEXT,
  search_compatibility_insights TEXT[],
  
  website_authority INTEGER NOT NULL,
  website_authority_reasoning TEXT,
  website_authority_insights TEXT[],
  
  consistency_score INTEGER NOT NULL,
  consistency_score_reasoning TEXT,
  consistency_score_insights TEXT[],
  
  topic_coverage INTEGER NOT NULL,
  topic_coverage_reasoning TEXT,
  topic_coverage_insights TEXT[],
  
  trust_signals INTEGER NOT NULL,
  trust_signals_reasoning TEXT,
  trust_signals_insights TEXT[],
  
  expertise_rating INTEGER NOT NULL,
  expertise_rating_reasoning TEXT,
  expertise_rating_insights TEXT[],
  
  -- Summary data
  critical_issues TEXT[],
  quick_wins TEXT[],
  investment_recommendations TEXT[],
  
  -- Analysis metadata
  analysis_date TIMESTAMP WITH TIME ZONE NOT NULL,
  analysis_version VARCHAR(20) DEFAULT '2.0',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Keep original table for backwards compatibility
-- analysis_results table remains as is

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_crawler_data_domain ON crawler_data(domain);
CREATE INDEX IF NOT EXISTS idx_crawler_data_url ON crawler_data(url);
CREATE INDEX IF NOT EXISTS idx_crawler_data_created_at ON crawler_data(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analysis_results_v2_domain ON analysis_results_v2(domain);
CREATE INDEX IF NOT EXISTS idx_analysis_results_v2_created_at ON analysis_results_v2(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_results_v2_overall_score ON analysis_results_v2(overall_score);

-- Row Level Security
ALTER TABLE crawler_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results_v2 ENABLE ROW LEVEL SECURITY;

-- Policies for service role
CREATE POLICY "Service role can do everything on crawler_data" ON crawler_data
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do everything on analysis_results_v2" ON analysis_results_v2
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Public read policies
CREATE POLICY "Public can read crawler_data" ON crawler_data
  FOR SELECT USING (true);

CREATE POLICY "Public can read analysis_results_v2" ON analysis_results_v2
  FOR SELECT USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for crawler_data
CREATE OR REPLACE TRIGGER update_crawler_data_updated_at 
    BEFORE UPDATE ON crawler_data 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();