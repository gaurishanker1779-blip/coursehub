import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Course, PaymentRequest, User } from '@/lib/types'
import { Eye, Clock, CheckCircle, BookOpen } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface MyCoursesPageProps {
  purchasedCourses: Course[]
  userRequests: PaymentRequest[]
  user: User | null
  onNavigate: (page: string) => void
}

export function MyCoursesPage({ purchasedCourses, userRequests, user, onNavigate }: MyCoursesPageProps) {
  const pendingRequests = userRequests.filter(req => req.status === 'pending')
  const hasMembership = user?.membership?.active

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Access your purchased courses and track your progress</p>
        </div>

        {hasMembership && (
          <Card className="mb-6 sm:mb-8 border-accent bg-accent/5">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-accent sm:w-6 sm:h-6" weight="fill" />
                <CardTitle className="text-lg sm:text-xl">Active Membership</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base">
                You have full access to all courses until {formatDate(user.membership!.expiresAt)}
              </p>
            </CardContent>
          </Card>
        )}

        {pendingRequests.length > 0 && (
          <Card className="mb-6 sm:mb-8 border-yellow-500/40 bg-yellow-500/5">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-yellow-500 sm:w-6 sm:h-6" weight="fill" />
                <CardTitle className="text-lg sm:text-xl">Pending Requests</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingRequests.map(request => (
                  <div key={request.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {request.type === 'membership' 
                          ? `Membership - ${request.membershipType}` 
                          : 'Course Purchase'}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Submitted on {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40 w-fit">
                      ₹{request.amount}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4">
                Waiting for admin approval. You'll get access once your payment is verified.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Available Courses</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {purchasedCourses.length} course{purchasedCourses.length !== 1 ? 's' : ''} available
            </p>
          </div>
          {!hasMembership && purchasedCourses.length === 0 && (
            <Button onClick={() => onNavigate('courses')} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              Browse Courses
            </Button>
          )}
        </div>

        {purchasedCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {purchasedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 overflow-hidden">
                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/40 text-xs">
                        <CheckCircle size={12} className="mr-1" weight="fill" />
                        Purchased
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3 sm:pb-4">
                    <Badge variant="outline" className="text-xs border-accent/40 text-accent w-fit mb-2">
                      {course.category}
                    </Badge>
                    <CardTitle className="text-base sm:text-lg line-clamp-2">{course.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 pb-3 sm:pb-4">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                      {course.description}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      onClick={() => window.open(course.courseLink, '_blank')}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-sm"
                    >
                      <Eye size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" weight="bold" />
                      View Course
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="py-12 sm:py-16 text-center px-4">
              <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground sm:w-16 sm:h-16" weight="duotone" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No Courses Yet</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Start your learning journey by purchasing courses or getting a membership
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => onNavigate('courses')} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Browse Courses
                </Button>
                <Button onClick={() => onNavigate('membership')} variant="outline" className="w-full sm:w-auto">
                  View Memberships
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
