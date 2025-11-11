import { useKV } from '@github/spark/hooks'
import { User, AuthState, CustomerInfo } from '@/lib/types'
import { useEffect } from 'react'

const ADMIN_USERNAME = 'adarsh'
const ADMIN_PASSWORD = 'Adarshkosta@1'

const DEFAULT_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false
}

export function useAuth() {
  const [users, setUsers] = useKV<User[]>('users-database', [])
  const [currentSession, setCurrentSession] = useKV<AuthState>('current-session', DEFAULT_AUTH_STATE)
  
  const authState = currentSession || DEFAULT_AUTH_STATE

  useEffect(() => {
    if (authState.user) {
      const updatedUser = users?.find(u => u.id === authState.user!.id)
      if (updatedUser && JSON.stringify(updatedUser) !== JSON.stringify(authState.user)) {
        setCurrentSession({
          isAuthenticated: true,
          isAdmin: false,
          user: updatedUser
        })
      }
    }
  }, [users])

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
    
    setCurrentSession({
      isAuthenticated: true,
      user: newUser,
      isAdmin: false
    })
    
    return { success: true, message: 'Account created successfully! You are now signed in.' }
  }

  const signIn = (email: string, password: string): { success: boolean; message: string } => {
    const user = users?.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, message: 'No account found with this email and password. Please check your credentials or sign up.' }
    }

    setCurrentSession({
      isAuthenticated: true,
      user,
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

  const updateUserMembership = (userId: string, membership: User['membership']) => {
    setUsers(current =>
      (current || []).map(u => u.id === userId ? { ...u, membership } : u)
    )
    
    if (authState.user?.id === userId) {
      setCurrentSession({
        isAuthenticated: true,
        isAdmin: false,
        user: authState.user ? { ...authState.user, membership } : null
      })
    }
  }

  const updateUserCheckoutInfo = (userId: string, customerInfo: CustomerInfo) => {
    setUsers(current =>
      (current || []).map(u => u.id === userId ? { ...u, customerInfo } : u)
    )
    
    if (authState.user?.id === userId) {
      setCurrentSession({
        isAuthenticated: true,
        isAdmin: false,
        user: authState.user ? { ...authState.user, customerInfo } : null
      })
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
    users
  }
}
