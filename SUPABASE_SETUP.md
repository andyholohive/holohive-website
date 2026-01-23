# Supabase Setup Instructions

## 1. Create the database table

Run this SQL in your Supabase dashboard (SQL Editor):

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  project_name TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  telegram TEXT,
  funding TEXT,
  token_status TEXT,
  timeline TEXT,
  goals TEXT
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (for the public form)
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

## 2. Get your API credentials

1. Go to your Supabase dashboard
2. Navigate to **Settings → API**
3. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (the one labeled "anon" / "public")

## 3. Create environment file

Create a `.env.local` file in the website root:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Restart the dev server

```bash
npm run dev
```

## 5. (Optional) Set up email notifications

To get notified when someone submits the form, you can:

### Option A: Supabase Database Webhooks
1. Go to **Database → Webhooks** in Supabase
2. Create a webhook that triggers on INSERT to `contact_submissions`
3. Point it to a service like Zapier, Make, or your own API

### Option B: Supabase Edge Functions
Create an Edge Function that sends emails via Resend/SendGrid when triggered

### Option C: Use Supabase + Zapier/Make
1. Connect Zapier to your Supabase table
2. Set up a Zap that sends an email when a new row is added

## Testing

After setup, submit a test form and check your Supabase dashboard under **Table Editor → contact_submissions** to see the submission.
