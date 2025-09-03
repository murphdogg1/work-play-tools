import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Subscriber {
  id: string
  email: string
  status: 'pending' | 'confirmed' | 'unsubscribed'
  token: string
  created_at: string
  confirmed_at?: string
}

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: Subscriber
        Insert: Omit<Subscriber, 'id' | 'created_at'>
        Update: Partial<Omit<Subscriber, 'id' | 'created_at'>>
      }
    }
  }
}
