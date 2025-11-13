import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  users: {
    id: string
    email: string
    name: string
    password: string
    is_admin: boolean
    membership_type?: string
    membership_expires_at?: string
    membership_active: boolean
    phone?: string
    country?: string
    created_at: string
  }
  payment_requests: {
    id: string
    user_id: string
    user_email: string
    type: 'course' | 'membership'
    amount: number
    course_id?: string
    membership_type?: 'weekly' | 'monthly' | 'yearly'
    status: 'pending' | 'approved' | 'rejected'
    customer_info?: any
    created_at: string
    updated_at: string
  }
  free_course_enrollments: {
    id: string
    user_id: string
    course_id: string
    enrolled_at: string
  }
  cart_items: {
    id: string
    user_id: string
    course_id: string
    course_data: any
    created_at: string
  }
}
