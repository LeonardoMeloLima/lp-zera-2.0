import { createClient } from "@supabase/supabase-js";

// Public anon key – safe to expose in frontend code
const EXTERNAL_URL = "https://mkucjtlrnrpvjscuydki.supabase.co";
const EXTERNAL_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdWNqdGxybnJwdmpzY3V5ZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzQzMzAsImV4cCI6MjA4NzYxMDMzMH0.wKsYCR9YQ1qmtTgpeye0b6JZSMU1pEmU7rqwQ5mZUZo";

export const externalSupabase = createClient(EXTERNAL_URL, EXTERNAL_ANON_KEY);
