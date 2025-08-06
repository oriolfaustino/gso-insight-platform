-- Create table for tracking domain submissions (for retargeting)
CREATE TABLE IF NOT EXISTS domain_submissions (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_domain_submissions_domain ON domain_submissions(domain);
CREATE INDEX IF NOT EXISTS idx_domain_submissions_submitted_at ON domain_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_domain_submissions_utm_source ON domain_submissions(utm_source);

-- Enable row level security
ALTER TABLE domain_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/select
CREATE POLICY "Enable insert for service role" ON domain_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Enable select for service role" ON domain_submissions
  FOR SELECT
  TO service_role
  USING (true);