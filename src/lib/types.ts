export interface Course {
  id: string
  title: string
  description: string
  category: string
  price: number
  isFree?: boolean
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string
  courseLink: string
  rating: string
  students: number
  duration: string
  instructor: string
  curriculum?: string[]
  whatYouLearn?: string[]
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: string
  membership?: Membership
}

export interface Membership {
  type: 'weekly' | 'monthly' | 'yearly'
  expiresAt: string
  active: boolean
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
}

export interface PaymentRequest {
  id: string
  userId: string
  userEmail: string
  type: 'course' | 'membership'
  courseId?: string
  membershipType?: 'weekly' | 'monthly' | 'yearly'
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  approvedAt?: string
  customerInfo?: CustomerInfo
}

export interface PurchasedCourse {
  courseId: string
  purchasedAt: string
  paymentRequestId: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isAdmin: boolean
}
