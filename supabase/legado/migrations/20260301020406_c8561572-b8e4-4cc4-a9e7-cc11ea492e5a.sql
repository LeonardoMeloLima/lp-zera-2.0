-- Enable RLS on ong_leads (may already be enabled, safe to run)
ALTER TABLE public.ong_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Allow public insert on ong_leads"
ON public.ong_leads
FOR INSERT
WITH CHECK (true);

-- Block public reads (admin uses service role key via edge function)
CREATE POLICY "No public read on ong_leads"
ON public.ong_leads
FOR SELECT
USING (false);