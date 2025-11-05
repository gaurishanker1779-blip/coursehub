import { useKV } from '@github/spark/hooks'
import { User, AuthState } from '@/lib/types'
import { useState, useEffect } from 'react'

const ADMIN_USERNAME = 'adarsh'
const ADMIN_PASSWORD = 'Adarshkosta@1'

export function useAuth() {
  const [users, setUsers] = useKV<User[]>('users', [])
  const [currentUserId, setCurrentUserId] = useKV<string | null>('currentUserId', null)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useKV<boolean>('isAdminLoggedIn', false)
  
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isAdmin: false
  })

  useEffect(() => {
    if (isAdminLoggedIn) {
      setAuthState({
        isAuthenticated: true,
        user: null,
        isAdmin: true
      })
    } else if (currentUserId && users) {
      const user = users.find(u => u.id === currentUserId)
      if (user) {
        setAuthState({
          isAuthenticated: true,
          user,
          isAdmin: false
        })
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        isAdmin: false
      })
    }
  }, [currentUserId, users, isAdminLoggedIn])

  const signUp = (email: string, password: string, name: string): { success: boolean; message: string } => {
    const existingUser = users?.find(u => u.email === email)
    if (existingUser) {
      return { success: false, message: 'Email already registered' }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    }

    setUsers(current => [...(current || []), newUser])
    setCurrentUserId(newUser.id)
    return { success: true, message: 'Account created successfully' }
  }

  const signIn = (email: string, password: string): { success: boolean; message: string } => {
    const user = users?.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }

    setCurrentUserId(user.id)
    return { success: true, message: 'Signed in successfully' }
  }

  const adminSignIn = (username: string, password: string): { success: boolean; message: string } => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true)
      return { success: true, message: 'Admin signed in successfully' }
    }
    return { success: false, message: 'Invalid admin credentials' }
  }

  const signOut = () => {
    setCurrentUserId(null)
    setIsAdminLoggedIn(false)
  }

  const updateUserMembership = (userId: string, membership: User['membership']) => {
    setUsers(current =>
      (current || []).map(u => u.id === userId ? { ...u, membership } : u)
    )
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
