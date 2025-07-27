# GSO Insight Platform - Setup Instructions

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local` file with:

```env
# Firecrawl API (for website crawling)
FIRECRAWL_API_KEY=your_firecrawl_key_here

# Supabase (database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here  
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key_here

# Resend (email notifications)
RESEND_API_KEY=your_resend_key_here
NOTIFICATION_EMAIL=your@email.com
```

### 3. Database Setup
1. Create Supabase project at https://supabase.com
2. Run the SQL in `database-schema.sql` in Supabase SQL Editor
3. Add your Supabase credentials to `.env.local`

### 4. External Services Setup

**Firecrawl** (Website Crawling):
- Sign up at https://firecrawl.dev
- Get API key and add to `.env.local`

**Resend** (Email Notifications):
- Sign up at https://resend.com  
- Get API key and add to `.env.local`
- Add your notification email

### 5. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📊 Admin Dashboard
Visit `/admin` to view all leads and analyses

## 🎯 Features
- Real website analysis with Firecrawl
- 10-metric GSO scoring algorithm
- Lead generation with pricing modal
- Database storage for all data
- Email notifications for new leads
- Admin dashboard for management
- 24-hour caching for consistency

## 🔧 Production Deployment
1. Deploy to Vercel/Netlify
2. Add environment variables to hosting platform
3. Verify custom domain in Resend for branded emails

## 💡 Customization
- Modify pricing in `src/components/PricingModal.tsx`
- Adjust GSO metrics in `src/app/api/analyze/route.ts`
- Customize UI/branding in React components