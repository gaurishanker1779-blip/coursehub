import { useKV } from '@github/spark/hooks'
import { PaymentRequest, PurchasedCourse } from '@/lib/types'

export function usePaymentRequests() {
  const [paymentRequests, setPaymentRequests] = useKV<PaymentRequest[]>('paymentRequests', [])
  const [purchasedCourses, setPurchasedCourses] = useKV<Record<string, PurchasedCourse[]>>('purchasedCourses', {})

  const createPaymentRequest = (
    userId: string,
    userEmail: string,
    type: 'course' | 'membership',
    amount: number,
    courseId?: string,
    membershipType?: 'weekly' | 'monthly' | 'yearly'
  ): string => {
    const newRequest: PaymentRequest = {
      id: `payment-${Date.now()}`,
      userId,
      userEmail,
      type,
      courseId,
      membershipType,
      amount,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    setPaymentRequests(current => [...(current || []), newRequest])
    return newRequest.id
  }

  const approvePaymentRequest = (requestId: string) => {
    setPaymentRequests(current =>
      (current || []).map(req =>
        req.id === requestId
          ? { ...req, status: 'approved' as const, approvedAt: new Date().toISOString() }
          : req
      )
    )

    const request = paymentRequests?.find(r => r.id === requestId)
    if (request && request.type === 'course' && request.courseId) {
      const purchase: PurchasedCourse = {
        courseId: request.courseId,
        purchasedAt: new Date().toISOString(),
        paymentRequestId: requestId
      }

      setPurchasedCourses(current => ({
        ...(current || {}),
        [request.userId]: [...((current || {})[request.userId] || []), purchase]
      }))
    }
  }

  const rejectPaymentRequest = (requestId: string) => {
    setPaymentRequests(current =>
      (current || []).map(req =>
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    )
  }

  const getUserPurchasedCourses = (userId: string): PurchasedCourse[] => {
    return (purchasedCourses || {})[userId] || []
  }

  const getPendingRequests = (): PaymentRequest[] => {
    return (paymentRequests || []).filter(req => req.status === 'pending')
  }

  const getUserRequests = (userId: string): PaymentRequest[] => {
    return (paymentRequests || []).filter(req => req.userId === userId)
  }

  return {
    paymentRequests: paymentRequests || [],
    createPaymentRequest,
    approvePaymentRequest,
    rejectPaymentRequest,
    getUserPurchasedCourses,
    getPendingRequests,
    getUserRequests
  }
}
