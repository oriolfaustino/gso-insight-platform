-- GSO Insight Platform Database Schema
-- Run this in your Supabase SQL Editor

-- Table for storing website analysis results
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  overall_score INTEGER NOT NULL,
  ai_recommendation_rate INTEGER NOT NULL,
  competitive_ranking INTEGER NOT NULL,
  content_relevance INTEGER NOT NULL,
  brand_mention_quality INTEGER NOT NULL,
  search_compatibility INTEGER NOT NULL,
  website_authority INTEGER NOT NULL,
  consistency_score INTEGER NOT NULL,
  topic_coverage INTEGER NOT NULL,
  trust_signals INTEGER NOT NULL,
  expertise_rating INTEGER NOT NULL,
  analysis_date TIMESTAMP WITH TIME ZONE NOT NULL,
  crawler_used VARCHAR(50) DEFAULT 'Firecrawl',
  word_count INTEGER DEFAULT 0,
  title TEXT DEFAULT '',
  trust_signals_found TEXT[] DEFAULT '{}',
  critical_issues TEXT[] DEFAULT '{}',
  quick_wins TEXT[] DEFAULT '{}',
  investment_recommendations TEXT[] DEFAULT '{}',
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing email collections from pricing modal
CREATE TABLE IF NOT EXISTS email_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  domain_analyzed VARCHAR(255) NOT NULL,
  analysis_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analysis_results_domain ON analysis_results(domain);
CREATE INDEX IF NOT EXISTS idx_analysis_results_created_at ON analysis_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_results_overall_score ON analysis_results(overall_score);

CREATE INDEX IF NOT EXISTS idx_email_collections_email ON email_collections(email);
CREATE INDEX IF NOT EXISTS idx_email_collections_created_at ON email_collections(created_at DESC);

-- Row Level Security (RLS) policies
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_collections ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to do everything
CREATE POLICY "Service role can do everything on analysis_results" ON analysis_results
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can do everything on email_collections" ON email_collections
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Policy to allow public read access to analysis results (for demo purposes)
CREATE POLICY "Public can read analysis_results" ON analysis_results
  FOR SELECT USING (true);

-- Policy to allow public insert to email collections (for lead generation)
CREATE POLICY "Public can insert email_collections" ON email_collections
  FOR INSERT WITH CHECK (true);