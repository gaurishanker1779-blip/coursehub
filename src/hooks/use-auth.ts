import { useKV } from '@github/spark/hooks'
import { User, AuthState } from '@/lib/types'
import { useState, useEffect } from 'react'

const ADMIN_USERNAME = 'adarsh'
const ADMIN_PASSWORD = 'Adarshkosta@1'

export function useAuth() {
  const [users, setUsers] = useKV<User[]>('users', [])
  
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isAdmin: false
  })

  const signUp = (email: string, password: string, name: string): { success: boolean; message: string } => {
    const existingUser = users?.find(u => u.email === email)
    if (existingUser) {
      return { success: false, message: 'Email already registered. Please sign in instead.' }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    }

    setUsers(current => [...(current || []), newUser])
    
    setAuthState({
      isAuthenticated: true,
      user: newUser,
      isAdmin: false
    })
    
    return { success: true, message: 'Account created successfully! You are now signed in.' }
  }

  const signIn = (email: string, password: string): { success: boolean; message: string } => {
    const user = users?.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' }
    }

    setAuthState({
      isAuthenticated: true,
      user,
      isAdmin: false
    })
    
    return { success: true, message: `Welcome back, ${user.name}!` }
  }

  const adminSignIn = (username: string, password: string): { success: boolean; message: string } => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthState({
        isAuthenticated: true,
        user: null,
        isAdmin: true
      })
      return { success: true, message: 'Admin access granted' }
    }
    return { success: false, message: 'Invalid admin credentials' }
  }

  const signOut = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isAdmin: false
    })
  }

  const updateUserMembership = (userId: string, membership: User['membership']) => {
    setUsers(current =>
      (current || []).map(u => u.id === userId ? { ...u, membership } : u)
    )
    
    if (authState.user?.id === userId) {
      setAuthState(current => ({
        ...current,
        user: current.user ? { ...current.user, membership } : null
      }))
    }
  }

  return {
    authState,
    signUp,
    signIn,
    adminSignIn,
    signOut,
    updateUserMembership,
    users
  }
}
