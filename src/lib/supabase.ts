import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!.trim().replace(/\s+/g, '')

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types for TypeScript
export interface AnalysisResult {
  id?: string
  domain: string
  overall_score: number
  ai_recommendation_rate: number
  competitive_ranking: number
  content_relevance: number
  brand_mention_quality: number
  search_compatibility: number
  website_authority: number
  consistency_score: number
  topic_coverage: number
  trust_signals: number
  expertise_rating: number
  analysis_date: string
  crawler_used: string
  word_count: number
  title: string
  trust_signals_found: string[]
  critical_issues: string[]
  quick_wins: string[]
  investment_recommendations: string[]
  raw_data: Record<string, unknown>
  created_at?: string
}

export interface EmailCollection {
  id?: string
  email: string
  domain_analyzed: string
  analysis_score: number
  created_at?: string
}