import { useState, useEffect } from 'react'
import { PaymentRequest, PurchasedCourse, CustomerInfo } from '@/lib/types'
import { supabase } from '@/lib/supabase'

export function usePaymentRequests() {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPaymentRequests()
    
    const subscription = supabase
      .channel('payment_requests_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payment_requests' }, () => {
        loadPaymentRequests()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadPaymentRequests = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('payment_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      const mapped: PaymentRequest[] = data.map(d => ({
        id: d.id,
        userId: d.user_id,
        userEmail: d.user_email,
        type: d.type as 'course' | 'membership',
        courseId: d.course_id,
        membershipType: d.membership_type as 'weekly' | 'monthly' | 'yearly' | undefined,
        amount: d.amount,
        status: d.status as 'pending' | 'approved' | 'rejected',
        createdAt: d.created_at,
        approvedAt: d.updated_at !== d.created_at ? d.updated_at : undefined,
        customerInfo: d.customer_info
      }))
      setPaymentRequests(mapped)
    }
    setLoading(false)
  }

  const createPaymentRequest = async (
    userId: string,
    userEmail: string,
    type: 'course' | 'membership',
    amount: number,
    courseId?: string,
    membershipType?: 'weekly' | 'monthly' | 'yearly',
    customerInfo?: CustomerInfo
  ): Promise<string> => {
    const newRequest = {
      id: `payment-${Date.now()}`,
      user_id: userId,
      user_email: userEmail,
      type,
      course_id: courseId,
      membership_type: membershipType,
      amount,
      status: 'pending',
      customer_info: customerInfo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('payment_requests')
      .insert([newRequest])
      .select()
      .single()

    if (!error && data) {
      await loadPaymentRequests()
      return data.id
    }
    
    return newRequest.id
  }

  const approvePaymentRequest = async (requestId: string) => {
    const { error } = await supabase
      .from('payment_requests')
      .update({ 
        status: 'approved',
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (!error) {
      await loadPaymentRequests()
    }
  }

  const rejectPaymentRequest = async (requestId: string) => {
    const { error } = await supabase
      .from('payment_requests')
      .update({ 
        status: 'rejected',
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (!error) {
      await loadPaymentRequests()
    }
  }

  const getUserPurchasedCourses = (userId: string): PurchasedCourse[] => {
    return paymentRequests
      .filter(req => req.userId === userId && req.status === 'approved' && req.type === 'course' && req.courseId)
      .map(req => ({
        courseId: req.courseId!,
        purchasedAt: req.approvedAt || req.createdAt,
        paymentRequestId: req.id
      }))
  }

  const getPendingRequests = (): PaymentRequest[] => {
    return paymentRequests.filter(req => req.status === 'pending')
  }

  const getUserRequests = (userId: string): PaymentRequest[] => {
    return paymentRequests.filter(req => req.userId === userId)
  }

  return {
    paymentRequests,
    createPaymentRequest,
    approvePaymentRequest,
    rejectPaymentRequest,
    getUserPurchasedCourses,
    getPendingRequests,
    getUserRequests,
    loading
  }
}
