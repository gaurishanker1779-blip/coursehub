import { useKV } from '@github/spark/hooks'

export interface EnrolledFreeCourse {
  userId: string
  courseId: string
  enrolledAt: string
}

export function useFreeCourses() {
  const [enrolledCourses, setEnrolledCourses] = useKV<EnrolledFreeCourse[]>('enrolledFreeCourses', [])

  const enrollInFreeCourse = (userId: string, courseId: string) => {
    const existing = enrolledCourses?.find(
      ec => ec.userId === userId && ec.courseId === courseId
    )
    
    if (existing) {
      return { success: false, message: 'You are already enrolled in this course' }
    }

    const newEnrollment: EnrolledFreeCourse = {
      userId,
      courseId,
      enrolledAt: new Date().toISOString()
    }

    setEnrolledCourses(current => [...(current || []), newEnrollment])
    return { success: true, message: 'Successfully enrolled! Course added to My Courses.' }
  }

  const getUserEnrolledCourses = (userId: string): string[] => {
    return (enrolledCourses || [])
      .filter(ec => ec.userId === userId)
      .map(ec => ec.courseId)
  }

  const isEnrolledInCourse = (userId: string, courseId: string): boolean => {
    return (enrolledCourses || []).some(
      ec => ec.userId === userId && ec.courseId === courseId
    )
  }

  return {
    enrollInFreeCourse,
    getUserEnrolledCourses,
    isEnrolledInCourse
  }
}
