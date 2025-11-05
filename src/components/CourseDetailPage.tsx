import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Course } from '@/lib/types'
import {
  ShoppingCart,
  Check,
  Star,
  Clock,
  Users,
  Certificate,
  Video,
  ArrowLeft,
  BookOpen,
  Trophy,
  Laptop,
  CheckCircle,
  Play,
  LockKey
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface CourseDetailPageProps {
  course: Course
  onAddToCart: (course: Course) => void
  onBuyNow: (course: Course) => void
  isInCart: boolean
  isPurchased: boolean
  onNavigate: (page: string) => void
  isAuthenticated: boolean
}

const generateReviews = (courseTitle: string, rating: number) => {
  const reviews = [
    {
      name: 'Priya Sharma',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent course! The instructor explains complex concepts in a very simple way. Highly recommended for beginners.',
      verified: true
    },
    {
      name: 'Rahul Kumar',
      rating: 5,
      date: '1 month ago',
      comment: 'Best investment I made this year. The practical examples and hands-on projects really helped me understand the concepts.',
      verified: true
    },
    {
      name: 'Anjali Patel',
      rating: 4,
      date: '3 weeks ago',
      comment: 'Great content overall. Would have loved more real-world case studies, but still worth the price.',
      verified: true
    },
    {
      name: 'Vikram Singh',
      rating: 5,
      date: '1 week ago',
      comment: 'Outstanding! I got a job offer after completing this course. The skills taught here are exactly what companies are looking for.',
      verified: true
    },
    {
      name: 'Sneha Reddy',
      rating: 5,
      date: '2 months ago',
      comment: 'Very comprehensive and well-structured. The instructor is knowledgeable and the support is excellent.',
      verified: true
    }
  ]
  return reviews.slice(0, 5)
}

const generateLearningOutcomes = (category: string) => {
  const outcomes: Record<string, string[]> = {
    'Cybersecurity': [
      'Master the fundamentals of cybersecurity and ethical hacking',
      'Identify and prevent common security vulnerabilities',
      'Perform penetration testing on web applications',
      'Understand network security protocols and encryption',
      'Implement security best practices in real-world scenarios'
    ],
    'Web Development': [
      'Build responsive websites from scratch',
      'Master HTML, CSS, and JavaScript fundamentals',
      'Create dynamic web applications with modern frameworks',
      'Implement database integration and API development',
      'Deploy and maintain production-ready applications'
    ],
    'Data Science': [
      'Analyze and visualize complex datasets',
      'Build machine learning models from scratch',
      'Master Python libraries for data analysis',
      'Implement statistical analysis and hypothesis testing',
      'Create data-driven insights and predictions'
    ],
    'Cloud Computing': [
      'Design and deploy cloud infrastructure',
      'Master AWS/Azure/GCP core services',
      'Implement scalable and secure cloud solutions',
      'Automate cloud operations and deployments',
      'Optimize cloud costs and performance'
    ],
    'DevOps': [
      'Implement CI/CD pipelines for automated deployments',
      'Master Docker and Kubernetes for containerization',
      'Automate infrastructure with Infrastructure as Code',
      'Monitor and troubleshoot production systems',
      'Implement DevOps best practices and workflows'
    ]
  }
  return outcomes[category] || outcomes['Cybersecurity']
}

const generateCourseContent = (duration: string) => {
  return [
    { title: 'Introduction and Setup', lessons: 8, duration: '1h 30m', locked: false },
    { title: 'Core Concepts and Fundamentals', lessons: 12, duration: '2h 45m', locked: true },
    { title: 'Practical Implementation', lessons: 15, duration: '3h 20m', locked: true },
    { title: 'Advanced Techniques', lessons: 10, duration: '2h 15m', locked: true },
    { title: 'Real-World Projects', lessons: 8, duration: '2h 30m', locked: true },
    { title: 'Best Practices and Optimization', lessons: 6, duration: '1h 45m', locked: true },
    { title: 'Final Project and Certification', lessons: 4, duration: '1h 30m', locked: true }
  ]
}

export function CourseDetailPage({
  course,
  onAddToCart,
  onBuyNow,
  isInCart,
  isPurchased,
  onNavigate,
  isAuthenticated
}: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')
  const reviews = generateReviews(course.title, parseFloat(course.rating))
  const learningOutcomes = generateLearningOutcomes(course.category)
  const courseContent = generateCourseContent(course.duration)

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add courses to cart')
      onNavigate('signin')
      return
    }
    onAddToCart(course)
    toast.success('Course added to cart!')
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to purchase courses')
      onNavigate('signin')
      return
    }
    onBuyNow(course)
  }

  const gstIncluded = (course.price * 0.18).toFixed(2)
  const basePrice = (course.price / 1.18).toFixed(2)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('courses')}
          className="mb-4 sm:mb-6 hover:bg-accent/10"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur rounded-full p-4 sm:p-6">
                    <Play size={32} weight="fill" className="text-primary sm:w-12 sm:h-12" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <Badge className="bg-black/70 text-white border-0 backdrop-blur">
                    {course.category}
                  </Badge>
                  <Badge
                    className={
                      course.level === 'Beginner'
                        ? 'bg-green-500/90 text-white border-0 backdrop-blur'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-500/90 text-white border-0 backdrop-blur'
                        : 'bg-red-500/90 text-white border-0 backdrop-blur'
                    }
                  >
                    {course.level}
                  </Badge>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                      <Star size={20} weight="fill" className="text-yellow-500" />
                      <span className="font-bold text-lg">{course.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={20} className="text-accent" />
                    <span className="font-medium">{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={20} className="text-primary" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
                  <img
                    src={`https://i.pravatar.cc/150?u=${course.instructor}`}
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full border-2 border-accent"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-semibold text-base">{course.instructor}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-0">
                <div className="flex border-b border-border/50">
                  {(['overview', 'curriculum', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-accent border-b-2 border-accent bg-accent/5'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Trophy size={24} className="text-accent" />
                            What You'll Learn
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {learningOutcomes.map((outcome, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <CheckCircle
                                  size={20}
                                  weight="fill"
                                  className="text-green-500 shrink-0 mt-0.5"
                                />
                                <span className="text-sm text-muted-foreground">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Laptop size={24} className="text-primary" />
                            Course Features
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                              <Video size={24} className="text-accent" />
                              <div>
                                <p className="font-medium text-sm">HD Video Lectures</p>
                                <p className="text-xs text-muted-foreground">High quality content</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                              <Certificate size={24} className="text-primary" />
                              <div>
                                <p className="font-medium text-sm">Certificate</p>
                                <p className="text-xs text-muted-foreground">Upon completion</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                              <Clock size={24} className="text-green-500" />
                              <div>
                                <p className="font-medium text-sm">Lifetime Access</p>
                                <p className="text-xs text-muted-foreground">Learn at your pace</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                              <Users size={24} className="text-yellow-500" />
                              <div>
                                <p className="font-medium text-sm">Community Support</p>
                                <p className="text-xs text-muted-foreground">Get help anytime</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'curriculum' && (
                      <motion.div
                        key="curriculum"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen size={24} className="text-accent" />
                            Course Curriculum
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {courseContent.reduce((sum, section) => sum + section.lessons, 0)} lectures •{' '}
                            {course.duration}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {courseContent.map((section, index) => (
                            <div
                              key={index}
                              className="border border-border/50 rounded-lg overflow-hidden hover:border-accent/50 transition-colors"
                            >
                              <button className="w-full p-4 flex items-center justify-between bg-muted/20 hover:bg-muted/40 transition-colors">
                                <div className="flex items-center gap-3 text-left">
                                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm sm:text-base">{section.title}</p>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                      {section.lessons} lectures • {section.duration}
                                    </p>
                                  </div>
                                </div>
                                {section.locked && (
                                  <LockKey size={20} className="text-muted-foreground shrink-0" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                      <motion.div
                        key="reviews"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-6 p-6 bg-muted/20 rounded-lg">
                          <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold mb-2">{course.rating}</div>
                            <div className="flex gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={20}
                                  weight="fill"
                                  className="text-yellow-500"
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                          </div>
                          <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center gap-3">
                                <span className="text-sm w-12">{rating} star</span>
                                <Progress
                                  value={rating === 5 ? 85 : rating === 4 ? 12 : 3}
                                  className="flex-1 h-2"
                                />
                                <span className="text-sm text-muted-foreground w-12">
                                  {rating === 5 ? '85%' : rating === 4 ? '12%' : '3%'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {reviews.map((review, index) => (
                            <div
                              key={index}
                              className="p-4 border border-border/50 rounded-lg hover:border-accent/50 transition-colors"
                            >
                              <div className="flex items-start gap-3 mb-3">
                                <img
                                  src={`https://i.pravatar.cc/150?u=${review.name}`}
                                  alt={review.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">{review.name}</p>
                                    <span className="text-xs text-muted-foreground">{review.date}</span>
                                  </div>
                                  <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        size={14}
                                        weight={star <= review.rating ? 'fill' : 'regular'}
                                        className={
                                          star <= review.rating ? 'text-yellow-500' : 'text-gray-400'
                                        }
                                      />
                                    ))}
                                  </div>
                                  {review.verified && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs mb-2 border-green-500/50 text-green-500"
                                    >
                                      <CheckCircle size={12} weight="fill" className="mr-1" />
                                      Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-2xl">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                        ₹{course.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{(course.price * 1.5).toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Inclusive of GST: ₹{gstIncluded} (18%)
                    </p>
                    <div className="mt-2 inline-block bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-semibold">
                      {Math.round(((course.price * 1.5 - course.price) / (course.price * 1.5)) * 100)}% OFF
                    </div>
                  </div>

                  <Separator />

                  {isPurchased ? (
                    <Button disabled className="w-full bg-green-500/20 text-green-400 border border-green-500/40">
                      <Check size={20} className="mr-2" weight="bold" />
                      Already Purchased
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={handleBuyNow}
                        size="lg"
                        className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg text-base font-semibold"
                      >
                        Buy Now
                      </Button>
                      <Button
                        onClick={handleAddToCart}
                        disabled={isInCart}
                        variant="outline"
                        size="lg"
                        className="w-full border-2 border-accent/50 hover:bg-accent/10 text-base font-semibold"
                      >
                        {isInCart ? (
                          <>
                            <Check size={20} className="mr-2" weight="bold" />
                            In Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={20} className="mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
                    <p className="font-semibold">This course includes:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Video size={16} className="text-accent" />
                        <span>HD video content</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={16} className="text-primary" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Certificate size={16} className="text-green-500" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users size={16} className="text-yellow-500" />
                        <span>24/7 support</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 p-4 rounded-lg">
                    <p className="text-xs font-semibold text-accent mb-1">🔥 LIMITED TIME OFFER</p>
                    <p className="text-xs text-muted-foreground">
                      This course is at a special discounted price. Enroll now before the price increases!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
