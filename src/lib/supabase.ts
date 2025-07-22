import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pbogmzsiicpozblyjkxx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBib2dtenNpaWNwb3pibHlqa3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNzMwODksImV4cCI6MjA2ODc0OTA4OX0.zYgntTVqRR4232r4CGETLtEKSG01t5p44Pk1O77ehqU'

export const supabase = createClient(supabaseUrl, supabaseKey)