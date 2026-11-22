
CREATE TABLE public.investor_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT,
  perfil TEXT,
  mensagem TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.investor_leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (public form, no auth required)
CREATE POLICY "Allow public insert on investor_leads"
  ON public.investor_leads
  FOR INSERT
  WITH CHECK (true);

-- No select/update/delete for anon — data only readable via service role
