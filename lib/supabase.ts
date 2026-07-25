import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedSupabase: SupabaseClient | null = null

export const getSupabase = () => {
  if (cachedSupabase) return cachedSupabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

  cachedSupabase = createClient(supabaseUrl, supabaseAnonKey)
  return cachedSupabase
}

// Backwards compatibility ke liye export taake purana code na phanse
export const supabase = {
  from: (table: string) => getSupabase().from(table),
  auth: getSupabase().auth,
  channel: (name: string) => getSupabase().channel(name),
  removeChannel: (channel: any) => getSupabase().removeChannel(channel),
} as any
