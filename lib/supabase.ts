import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

export const getSupabase = () => {
  if (cachedClient) return cachedClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
    }
  })

  return cachedClient
}

// Proxy wrapper so existing `supabase.from()` calls work seamlessly without changing components
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabase()
    return (client as any)[prop]
  }
})
