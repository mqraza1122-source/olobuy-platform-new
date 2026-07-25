import { createClient } from '@supabase/supabase-js'

const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
}

const getSupabaseKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
}

// Lazy client generation to prevent build-time prerender crashes
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    const client = createClient(getSupabaseUrl(), getSupabaseKey())
    return (client as any)[prop]
  }
})
