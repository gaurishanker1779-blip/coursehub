import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Course } from '@/lib/types'
import { Eye, Check, Star, Clock, Users } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface CourseCardProps {
  course: Course
  onAddToCart: (course: Course) => void
  onViewCourse: (course: Course) => void
  isInCart: boolean
  isPurchased: boolean
}

export function CourseCard({ course, onAddToCart, onViewCourse, isInCart, isPurchased }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onViewCourse(course)}
      className="cursor-pointer"
    >
      <Card className="h-full flex flex-col border-border/50 bg-card/80 backdrop-blur hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 overflow-hidden group">
        <div className="relative h-52 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className={
                course.level === 'Beginner'
                  ? 'bg-green-500/90 text-white border-0 backdrop-blur shadow-lg'
                  : course.level === 'Intermediate'
                  ? 'bg-yellow-500/90 text-white border-0 backdrop-blur shadow-lg'
                  : 'bg-red-500/90 text-white border-0 backdrop-blur shadow-lg'
              }
            >
              {course.level}
            </Badge>
          </div>

          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-black/70 text-white border-0 backdrop-blur shadow-lg">
              {course.category}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 p-6">
          <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
            {course.title}
          </h3>
          
          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star size={16} weight="fill" className="text-yellow-500" />
              <span className="font-medium text-foreground">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{(course.students / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {course.description}
          </p>

          <div className="text-sm text-muted-foreground">
            By {course.instructor}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-border/50">
          <div className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            ₹{course.price}
          </div>
          {isPurchased ? (
            <Button disabled className="bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/20">
              <Check size={18} className="mr-2" weight="bold" />
              Purchased
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onViewCourse(course)
              }}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-accent/50 transition-all duration-300"
            >
              <Eye size={18} className="mr-2" />
              View Details
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
