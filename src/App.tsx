import { useState, useEffect, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from 'sonner'
import { Header } from './components/Header'
import { LandingPage } from './components/LandingPage'
import { CoursesPage } from './components/CoursesPage'
import { MembershipPage } from './components/MembershipPage'
import { SignInPage } from './components/SignInPage'
import { SignUpPage } from './components/SignUpPage'
import { CartPage } from './components/CartPage'
import { CheckoutPage } from './components/CheckoutPage'
import { MyCoursesPage } from './components/MyCoursesPage'
import { AdminPanel } from './components/AdminPanel'
import { useAuth } from './hooks/use-auth'
import { usePaymentRequests } from './hooks/use-payment-requests'
import { generateCourses } from './lib/courses'
import { Course } from './lib/types'

type Page = 'home' | 'courses' | 'membership' | 'signin' | 'signup' | 'cart' | 'checkout' | 'my-courses' | 'admin'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [cartItems, setCartItems] = useKV<Course[]>('cartItems', [])
  const [checkoutType, setCheckoutType] = useState<'course' | 'membership'>('course')
  const [checkoutMembershipType, setCheckoutMembershipType] = useState<'weekly' | 'monthly' | 'yearly'>('weekly')
  const [checkoutMembershipPrice, setCheckoutMembershipPrice] = useState(0)

  const { authState, signUp, signIn, adminSignIn, signOut, updateUserMembership } = useAuth()
  const {
    paymentRequests,
    createPaymentRequest,
    approvePaymentRequest,
    rejectPaymentRequest,
    getUserPurchasedCourses,
    getPendingRequests,
    getUserRequests
  } = usePaymentRequests()

  const allCourses = useMemo(() => generateCourses(500), [])

  useEffect(() => {
    if (!authState.isAuthenticated && (currentPage === 'my-courses' || currentPage === 'checkout' || currentPage === 'cart')) {
      setCurrentPage('signin')
    }
    if (!authState.isAdmin && currentPage === 'admin') {
      setCurrentPage('home')
    }
    if (authState.isAdmin && currentPage === 'home') {
      setCurrentPage('admin')
    }
  }, [authState, currentPage])

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddToCart = (course: Course) => {
    setCartItems(current => {
      const items = current || []
      if (items.some(item => item.id === course.id)) {
        return items
      }
      return [...items, course]
    })
  }

  const handleRemoveFromCart = (courseId: string) => {
    setCartItems(current => (current || []).filter(item => item.id !== courseId))
  }

  const handleCheckout = () => {
    setCheckoutType('course')
    setCurrentPage('checkout')
  }

  const handleSelectMembershipPlan = (type: 'weekly' | 'monthly' | 'yearly', price: number) => {
    setCheckoutType('membership')
    setCheckoutMembershipType(type)
    setCheckoutMembershipPrice(price)
    setCurrentPage('checkout')
  }

  const handleConfirmPayment = () => {
    if (!authState.user) return

    if (checkoutType === 'membership') {
      createPaymentRequest(
        authState.user.id,
        authState.user.email,
        'membership',
        checkoutMembershipPrice,
        undefined,
        checkoutMembershipType
      )
    } else {
      const items = cartItems || []
      items.forEach(course => {
        createPaymentRequest(
          authState.user!.id,
          authState.user!.email,
          'course',
          course.price,
          course.id
        )
      })
      setCartItems([])
    }
  }

  const handleApprovePayment = (requestId: string) => {
    approvePaymentRequest(requestId)
    
    const request = paymentRequests.find(r => r.id === requestId)
    if (request && request.type === 'membership') {
      const duration = request.membershipType === 'weekly' ? 7 : request.membershipType === 'monthly' ? 30 : 365
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + duration)
      
      updateUserMembership(request.userId, {
        type: request.membershipType!,
        expiresAt: expiresAt.toISOString(),
        active: true
      })
    }
  }

  const purchasedCourseIds = authState.user 
    ? getUserPurchasedCourses(authState.user.id).map(pc => pc.courseId)
    : []

  const purchasedCourses = authState.user
    ? (authState.user.membership?.active 
        ? allCourses 
        : allCourses.filter(course => purchasedCourseIds.includes(course.id)))
    : []

  const userRequests = authState.user ? getUserRequests(authState.user.id) : []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        authState={authState}
        onSignOut={signOut}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        cartCount={(cartItems || []).length}
      />

      {currentPage === 'home' && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'courses' && (
        <CoursesPage
          courses={allCourses}
          onAddToCart={handleAddToCart}
          cartItems={cartItems || []}
          purchasedCourseIds={purchasedCourseIds}
        />
      )}

      {currentPage === 'membership' && (
        <MembershipPage
          onSelectPlan={handleSelectMembershipPlan}
          isAuthenticated={authState.isAuthenticated}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'signin' && (
        <SignInPage
          onSignIn={signIn}
          onAdminSignIn={adminSignIn}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'signup' && (
        <SignUpPage
          onSignUp={signUp}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cartItems={cartItems || []}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          items={checkoutType === 'course' ? (cartItems || []) : []}
          membershipType={checkoutType === 'membership' ? checkoutMembershipType : undefined}
          membershipPrice={checkoutType === 'membership' ? checkoutMembershipPrice : undefined}
          onConfirmPayment={handleConfirmPayment}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'my-courses' && authState.user && (
        <MyCoursesPage
          purchasedCourses={purchasedCourses}
          userRequests={userRequests}
          user={authState.user}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'admin' && authState.isAdmin && (
        <AdminPanel
          paymentRequests={paymentRequests}
          onApprovePayment={handleApprovePayment}
          onRejectPayment={rejectPaymentRequest}
        />
      )}

      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App