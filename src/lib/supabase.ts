import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rgndjaqwylulfsxqtsof.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbmRqYXF3eWx1bGZzeHF0c29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjMxMjAsImV4cCI6MjA5ODY5OTEyMH0.la1ok6iChufaJkfLxQeEfvQBnEgeCU9GKI627F7x7bA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
