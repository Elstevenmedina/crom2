import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY

const isConfigured =
  supabaseUrl &&
  supabasePublicKey &&
  supabaseUrl !== 'your_supabase_project_url_here' &&
  supabasePublicKey !== 'your_supabase_public_key_here'

if (!isConfigured) {
  console.warn(
    'Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLIC_KEY in your .env file.'
  )
}

// Solo crea el cliente si hay credenciales válidas, de lo contrario exporta null
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabasePublicKey)
  : null
