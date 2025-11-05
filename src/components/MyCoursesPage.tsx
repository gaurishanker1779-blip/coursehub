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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">Access your purchased courses and track your progress</p>
        </div>

        {hasMembership && (
          <Card className="mb-8 border-accent bg-accent/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-accent" weight="fill" />
                <CardTitle>Active Membership</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You have full access to all courses until {formatDate(user.membership!.expiresAt)}
              </p>
            </CardContent>
          </Card>
        )}

        {pendingRequests.length > 0 && (
          <Card className="mb-8 border-yellow-500/40 bg-yellow-500/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock size={24} className="text-yellow-500" weight="fill" />
                <CardTitle>Pending Requests</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {request.type === 'membership' 
                          ? `Membership - ${request.membershipType}` 
                          : 'Course Purchase'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submitted on {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                      ₹{request.amount}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Waiting for admin approval. You'll get access once your payment is verified.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Available Courses</h2>
            <p className="text-muted-foreground">
              {purchasedCourses.length} course{purchasedCourses.length !== 1 ? 's' : ''} available
            </p>
          </div>
          {!hasMembership && purchasedCourses.length === 0 && (
            <Button onClick={() => onNavigate('courses')} className="bg-primary hover:bg-primary/90">
              Browse Courses
            </Button>
          )}
        </div>

        {purchasedCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                        <CheckCircle size={14} className="mr-1" weight="fill" />
                        Purchased
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <Badge variant="outline" className="text-xs border-accent/40 text-accent w-fit mb-2">
                      {course.category}
                    </Badge>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {course.description}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => window.open(course.courseLink, '_blank')}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <Eye size={18} className="mr-2" weight="bold" />
                      View Course
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="py-16 text-center">
              <BookOpen size={64} className="mx-auto mb-4 text-muted-foreground" weight="duotone" />
              <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by purchasing courses or getting a membership
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => onNavigate('courses')} className="bg-primary hover:bg-primary/90">
                  Browse Courses
                </Button>
                <Button onClick={() => onNavigate('membership')} variant="outline">
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
