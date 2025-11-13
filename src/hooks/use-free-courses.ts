import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface EnrolledFreeCourse {
  userId: string
  courseId: string
  enrolledAt: string
}

export function useFreeCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledFreeCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEnrollments()
    
    const subscription = supabase
      .channel('enrollments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'free_course_enrollments' }, () => {
        loadEnrollments()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadEnrollments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('free_course_enrollments')
      .select('*')
    
    if (!error && data) {
      const mapped: EnrolledFreeCourse[] = data.map(d => ({
        userId: d.user_id,
        courseId: d.course_id,
        enrolledAt: d.enrolled_at
      }))
      setEnrolledCourses(mapped)
    }
    setLoading(false)
  }

  const enrollInFreeCourse = async (userId: string, courseId: string) => {
    const existing = enrolledCourses.find(
      ec => ec.userId === userId && ec.courseId === courseId
    )
    
    if (existing) {
      return { success: false, message: 'You are already enrolled in this course' }
    }

    const newEnrollment = {
      id: `enrollment-${Date.now()}`,
      user_id: userId,
      course_id: courseId,
      enrolled_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('free_course_enrollments')
      .insert([newEnrollment])

    if (error) {
      return { success: false, message: 'Failed to enroll. Please try again.' }
    }

    await loadEnrollments()
    return { success: true, message: 'Successfully enrolled! Course added to My Courses.' }
  }

  const getUserEnrolledCourses = (userId: string): string[] => {
    return enrolledCourses
      .filter(ec => ec.userId === userId)
      .map(ec => ec.courseId)
  }

  const isEnrolledInCourse = (userId: string, courseId: string): boolean => {
    return enrolledCourses.some(
      ec => ec.userId === userId && ec.courseId === courseId
    )
  }

  return {
    enrollInFreeCourse,
    getUserEnrolledCourses,
    isEnrolledInCourse,
    loading
  }
}
