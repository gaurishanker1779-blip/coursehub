import { useState, useEffect, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LandingPage } from './components/LandingPage'
import { CoursesPage } from './components/CoursesPage'
import { CourseDetailPage } from './components/CourseDetailPage'
import { MembershipPage } from './components/MembershipPage'
import { SignInPage } from './components/SignInPage'
import { SignUpPage } from './components/SignUpPage'
import { CartPage } from './components/CartPage'
import { CheckoutPage } from './components/CheckoutPage'
import { MyCoursesPage } from './components/MyCoursesPage'
import { AdminPanel } from './components/AdminPanel'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'
import { FAQPage } from './components/FAQPage'
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage'
import { TermsPage } from './components/TermsPage'
import { RefundPolicyPage } from './components/RefundPolicyPage'
import { useAuth } from './hooks/use-auth'
import { usePaymentRequests } from './hooks/use-payment-requests'
import { useFreeCourses } from './hooks/use-free-courses'
import { generateCourses } from './lib/courses'
import { Course } from './lib/types'

type Page = 'home' | 'courses' | 'course-detail' | 'membership' | 'signin' | 'signup' | 'cart' | 'checkout' | 'my-courses' | 'admin' | 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'refund'

const updateURL = (page: string, courseId?: string, courseTitle?: string) => {
  const baseUrl = window.location.origin
  let newUrl = baseUrl
  
  if (page === 'course-detail' && courseId && courseTitle) {
    const courseSlug = courseTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    newUrl = `${baseUrl}/course/${courseId.replace('course-', '')}/${courseSlug}`
  } else if (page === 'courses') {
    newUrl = `${baseUrl}/courses`
  } else if (page === 'membership') {
    newUrl = `${baseUrl}/membership`
  } else if (page === 'cart') {
    newUrl = `${baseUrl}/cart`
  } else if (page === 'checkout') {
    newUrl = `${baseUrl}/checkout`
  } else if (page === 'my-courses') {
    newUrl = `${baseUrl}/my-courses`
  } else if (page === 'signin') {
    newUrl = `${baseUrl}/signin`
  } else if (page === 'signup') {
    newUrl = `${baseUrl}/signup`
  } else if (page === 'admin') {
    newUrl = `${baseUrl}/admin`
  } else {
    newUrl = baseUrl
  }
  
  window.history.pushState({}, '', newUrl)
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
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
  const { enrollInFreeCourse, getUserEnrolledCourses, isEnrolledInCourse } = useFreeCourses()

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

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
    setCurrentPage('course-detail')
    updateURL('course-detail', course.id, course.title)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page)
    updateURL(page)
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

  const handleBuyNow = (course: Course) => {
    setCartItems(current => {
      const items = current || []
      if (!items.some(item => item.id === course.id)) {
        return [...items, course]
      }
      return items
    })
    setCheckoutType('course')
    setCurrentPage('checkout')
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

  const handleFreeAccess = (course: Course) => {
    if (!authState.user) return

    const result = enrollInFreeCourse(authState.user.id, course.id)
    if (result.success) {
      toast.success(result.message)
      setCurrentPage('my-courses')
    } else {
      toast.info(result.message)
    }
  }

  const enrolledCourseIds = authState.user ? getUserEnrolledCourses(authState.user.id) : []
  const purchasedCourseIds = authState.user 
    ? getUserPurchasedCourses(authState.user.id).map(pc => pc.courseId)
    : []

  const purchasedCourses = authState.user
    ? (authState.user.membership?.active 
        ? allCourses.filter(c => !c.isFree)
        : allCourses.filter(course => purchasedCourseIds.includes(course.id) && !course.isFree))
    : []

  const enrolledFreeCourses = authState.user
    ? allCourses.filter(course => enrolledCourseIds.includes(course.id))
    : []

  const allUserCourses = [...purchasedCourses, ...enrolledFreeCourses]

  const userRequests = authState.user ? getUserRequests(authState.user.id) : []

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        authState={authState}
        onSignOut={signOut}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        cartCount={(cartItems || []).length}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'courses' && (
          <CoursesPage
            courses={allCourses}
            onAddToCart={handleAddToCart}
            onViewCourse={handleViewCourse}
            cartItems={cartItems || []}
            purchasedCourseIds={purchasedCourseIds}
            enrolledCourseIds={enrolledCourseIds}
          />
        )}

        {currentPage === 'course-detail' && selectedCourse && (
          <CourseDetailPage
            course={selectedCourse}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onFreeAccess={handleFreeAccess}
            isInCart={(cartItems || []).some(item => item.id === selectedCourse.id)}
            isPurchased={purchasedCourseIds.includes(selectedCourse.id)}
            isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
            onNavigate={handleNavigate}
            isAuthenticated={authState.isAuthenticated}
          />
        )}

        {currentPage === 'membership' && (
          <MembershipPage
            onSelectPlan={handleSelectMembershipPlan}
            isAuthenticated={authState.isAuthenticated}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'faq' && (
          <FAQPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'terms' && (
          <TermsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'refund' && (
          <RefundPolicyPage onNavigate={handleNavigate} />
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
            purchasedCourses={allUserCourses}
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
      </main>

      <Footer onNavigate={handleNavigate} />

      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App