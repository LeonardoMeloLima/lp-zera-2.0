ALTER TABLE public.b2b_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on b2b_leads"
ON public.b2b_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "No public read on b2b_leads"
ON public.b2b_leads
FOR SELECT
USING (false);