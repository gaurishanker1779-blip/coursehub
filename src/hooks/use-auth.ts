import { useState, useEffect } from 'react'
import { User, AuthState, CustomerInfo } from '@/lib/types'
import { supabase } from '@/lib/supabase'

const ADMIN_USERNAME = 'adarsh'
const ADMIN_PASSWORD = 'Adarshkosta@1'

const DEFAULT_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false
}

export function useAuth() {
  const [users, setUsers] = useState<User[]>([])
  const [currentSession, setCurrentSession] = useState<AuthState>(() => {
    const stored = localStorage.getItem('current-session')
    return stored ? JSON.parse(stored) : DEFAULT_AUTH_STATE
  })
  const [loading, setLoading] = useState(true)

  const authState = currentSession

  useEffect(() => {
    localStorage.setItem('current-session', JSON.stringify(currentSession))
  }, [currentSession])

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    if (authState.user) {
      refreshUserData(authState.user.id)
    }
  }, [users])

  const loadUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    if (!error && data) {
      const mappedUsers: User[] = data.map(u => ({
        id: u.id,
        email: u.email,
        password: u.password,
        name: u.name,
        createdAt: u.created_at,
        membership: u.membership_active ? {
          type: u.membership_type as 'weekly' | 'monthly' | 'yearly',
          expiresAt: u.membership_expires_at || '',
          active: u.membership_active
        } : undefined,
        customerInfo: u.phone ? {
          firstName: u.name.split(' ')[0] || '',
          lastName: u.name.split(' ').slice(1).join(' ') || '',
          email: u.email,
          phone: u.phone,
          address: u.country || ''
        } : undefined
      }))
      setUsers(mappedUsers)
    }
    setLoading(false)
  }

  const refreshUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (!error && data && authState.user) {
      const updatedUser: User = {
        id: data.id,
        email: data.email,
        password: data.password,
        name: data.name,
        createdAt: data.created_at,
        membership: data.membership_active ? {
          type: data.membership_type as 'weekly' | 'monthly' | 'yearly',
          expiresAt: data.membership_expires_at || '',
          active: data.membership_active
        } : undefined,
        customerInfo: data.phone ? {
          firstName: data.name.split(' ')[0] || '',
          lastName: data.name.split(' ').slice(1).join(' ') || '',
          email: data.email,
          phone: data.phone,
          address: data.country || ''
        } : undefined
      }
      
      if (JSON.stringify(updatedUser) !== JSON.stringify(authState.user)) {
        setCurrentSession({
          isAuthenticated: true,
          isAdmin: false,
          user: updatedUser
        })
      }
    }
  }

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; message: string }> => {
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return { success: false, message: 'Email already registered. Please sign in instead.' }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      name,
      is_admin: false,
      membership_active: false,
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single()

    if (error) {
      return { success: false, message: 'Failed to create account. Please try again.' }
    }

    const user: User = {
      id: data.id,
      email: data.email,
      password: data.password,
      name: data.name,
      createdAt: data.created_at
    }

    setCurrentSession({
      isAuthenticated: true,
      user,
      isAdmin: false
    })

    await loadUsers()
    
    return { success: true, message: 'Account created successfully! You are now signed in.' }
  }

  const signIn = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (error || !user) {
      return { success: false, message: 'No account found with this email and password. Please check your credentials or sign up.' }
    }

    const mappedUser: User = {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      createdAt: user.created_at,
      membership: user.membership_active ? {
        type: user.membership_type as 'weekly' | 'monthly' | 'yearly',
        expiresAt: user.membership_expires_at || '',
        active: user.membership_active
      } : undefined,
      customerInfo: user.phone ? {
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phone: user.phone,
        address: user.country || ''
      } : undefined
    }

    setCurrentSession({
      isAuthenticated: true,
      user: mappedUser,
      isAdmin: false
    })
    
    return { success: true, message: `Welcome back, ${user.name}!` }
  }

  const adminSignIn = (username: string, password: string): { success: boolean; message: string } => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setCurrentSession({
        isAuthenticated: true,
        user: null,
        isAdmin: true
      })
      return { success: true, message: 'Admin access granted' }
    }
    return { success: false, message: 'Invalid admin credentials' }
  }

  const signOut = () => {
    setCurrentSession(DEFAULT_AUTH_STATE)
  }

  const updateUserMembership = async (userId: string, membership: User['membership']) => {
    const { error } = await supabase
      .from('users')
      .update({
        membership_type: membership?.type,
        membership_expires_at: membership?.expiresAt,
        membership_active: membership?.active || false
      })
      .eq('id', userId)

    if (!error) {
      await loadUsers()
      
      if (authState.user?.id === userId) {
        setCurrentSession({
          isAuthenticated: true,
          isAdmin: false,
          user: authState.user ? { ...authState.user, membership } : null
        })
      }
    }
  }

  const updateUserCheckoutInfo = async (userId: string, customerInfo: CustomerInfo) => {
    const { error } = await supabase
      .from('users')
      .update({
        phone: customerInfo.phone,
        country: customerInfo.address
      })
      .eq('id', userId)

    if (!error) {
      await loadUsers()
      
      if (authState.user?.id === userId) {
        setCurrentSession({
          isAuthenticated: true,
          isAdmin: false,
          user: authState.user ? { ...authState.user, customerInfo } : null
        })
      }
    }
  }

  return {
    authState,
    signUp,
    signIn,
    adminSignIn,
    signOut,
    updateUserMembership,
    updateUserCheckoutInfo,
    users,
    loading
  }
}
