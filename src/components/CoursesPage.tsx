import { useState, useMemo, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CourseCard } from './CourseCard'
import { Course } from '@/lib/types'
import { MagnifyingGlass, Funnel, X, Sparkle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface CoursesPageProps {
  courses: Course[]
  onAddToCart: (course: Course) => void
  onViewCourse: (course: Course) => void
  cartItems: Course[]
  purchasedCourseIds: string[]
  enrolledCourseIds?: string[]
}

export function CoursesPage({ courses, onAddToCart, onViewCourse, cartItems, purchasedCourseIds, enrolledCourseIds = [] }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const categories = useMemo(() => {
    const cats = new Set(courses.map(c => c.category))
    return Array.from(cats).sort()
  }, [courses])

  const filteredCourses = useMemo(() => {
    const searchLower = debouncedSearchQuery.toLowerCase().trim()
    
    const filtered = courses.filter(course => {
      const matchesSearch = !searchLower || 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.level.toLowerCase().includes(searchLower)
      
      const matchesCategory = !selectedCategory || course.category === selectedCategory
      const matchesLevel = !selectedLevel || course.level === selectedLevel
      
      return matchesSearch && matchesCategory && matchesLevel
    })

    if (!searchLower && !selectedCategory && !selectedLevel) {
      return filtered.slice(0, 50)
    }
    
    return filtered
  }, [courses, debouncedSearchQuery, selectedCategory, selectedLevel])

  const clearFilters = useCallback(() => {
    setSelectedCategory(null)
    setSelectedLevel(null)
    setSearchQuery('')
    setDebouncedSearchQuery('')
  }, [])

  const hasActiveFilters = selectedCategory || selectedLevel || searchQuery

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-background to-card/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/40" variant="outline">
            <Sparkle size={16} weight="fill" className="mr-1" />
            📚 Course Library
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">Course Library</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Browse through {courses.length}+ premium cybersecurity and tech courses from industry experts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-6"
        >
          <div className="relative">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" size={20} />
            <Input
              type="text"
              placeholder="Search courses, categories, topics, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-20 h-14 text-base bg-card/80 backdrop-blur border-border/50 focus:border-accent/50 shadow-lg transition-all"
              aria-label="Search courses"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    setSearchQuery('')
                    setDebouncedSearchQuery('')
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>
            {isSearching && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 shadow-lg">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Funnel size={20} className="text-accent" weight="fill" />
                <span className="text-sm font-semibold">Filters</span>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
                >
                  <X size={16} className="mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-accent to-primary text-white border-0 shadow-lg shadow-accent/30'
                            : 'border-border/50 hover:border-accent/50 hover:bg-accent/5'
                        }
                        aria-pressed={selectedCategory === category}
                      >
                        {category}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Difficulty Level</label>
                <div className="flex flex-wrap gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map(level => (
                    <motion.div key={level} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                        className={
                          selectedLevel === level
                            ? level === 'Beginner'
                              ? 'bg-green-500 text-white border-0 shadow-lg hover:bg-green-600'
                              : level === 'Intermediate'
                              ? 'bg-yellow-500 text-white border-0 shadow-lg hover:bg-yellow-600'
                              : 'bg-red-500 text-white border-0 shadow-lg hover:bg-red-600'
                            : 'border-border/50 hover:border-accent/50 hover:bg-accent/5'
                        }
                        aria-pressed={selectedLevel === level}
                      >
                        {level}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between"
          >
            <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5 text-base px-4 py-1.5">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </Badge>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredCourses.length > 0 ? (
            <motion.div
              key="courses-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.5) }}
                  layout
                >
                  <CourseCard
                    course={course}
                    onAddToCart={onAddToCart}
                    onViewCourse={onViewCourse}
                    isInCart={cartItems.some(item => item.id === course.id)}
                    isPurchased={purchasedCourseIds.includes(course.id)}
                    isEnrolled={enrolledCourseIds.includes(course.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlass size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                <X size={18} className="mr-2" />
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
