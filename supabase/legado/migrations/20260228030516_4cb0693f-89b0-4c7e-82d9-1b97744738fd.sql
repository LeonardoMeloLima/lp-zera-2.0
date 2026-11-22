
-- Create NGOs table for institution registration
CREATE TABLE public.ngos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  cep TEXT NOT NULL,
  endereco TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public registration form, no auth required)
CREATE POLICY "Anyone can register an NGO"
  ON public.ngos
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins should read NGO data (deny public reads for PII protection)
CREATE POLICY "No public read access to NGOs"
  ON public.ngos
  FOR SELECT
  USING (false);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_ngos_updated_at
  BEFORE UPDATE ON public.ngos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
