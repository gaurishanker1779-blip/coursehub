import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Course } from '@/lib/types'
import { ShoppingCart, Check } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface CourseCardProps {
  course: Course
  onAddToCart: (course: Course) => void
  isInCart: boolean
  isPurchased: boolean
}

export function CourseCard({ course, onAddToCart, isInCart, isPurchased }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
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
            <Badge
              variant="secondary"
              className={
                course.level === 'Beginner'
                  ? 'bg-green-500/20 text-green-300 border-green-500/40'
                  : course.level === 'Intermediate'
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                  : 'bg-red-500/20 text-red-300 border-red-500/40'
              }
            >
              {course.level}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 p-6">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs border-accent/40 text-accent">
              {course.category}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <div className="text-2xl font-bold text-accent">
            ₹{course.price}
          </div>
          {isPurchased ? (
            <Button disabled className="bg-green-500/20 text-green-300 border-green-500/40">
              <Check size={18} className="mr-2" weight="bold" />
              Purchased
            </Button>
          ) : (
            <Button
              onClick={() => onAddToCart(course)}
              disabled={isInCart}
              className={
                isInCart
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary hover:bg-primary/90'
              }
            >
              {isInCart ? (
                <>
                  <Check size={18} className="mr-2" weight="bold" />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
