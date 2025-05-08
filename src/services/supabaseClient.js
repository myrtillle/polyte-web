// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Get these values from your Supabase project settings
const supabaseUrl = 'https://bhyzwpsfacoidcirlmnn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeXp3cHNmYWNvaWRjaXJsbW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTU2MjAsImV4cCI6MjA1NTY5MTYyMH0.B5-vGR_lDukslmmvzDolavxgBmeV0fI_66VQyb3kCxM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
