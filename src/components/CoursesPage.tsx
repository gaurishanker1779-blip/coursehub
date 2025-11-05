import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CourseCard } from './CourseCard'
import { Course } from '@/lib/types'
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react'

interface CoursesPageProps {
  courses: Course[]
  onAddToCart: (course: Course) => void
  cartItems: Course[]
  purchasedCourseIds: string[]
}

export function CoursesPage({ courses, onAddToCart, cartItems, purchasedCourseIds }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(courses.map(c => c.category))
    return Array.from(cats).sort()
  }, [courses])

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || course.category === selectedCategory
      const matchesLevel = !selectedLevel || course.level === selectedLevel
      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [courses, searchQuery, selectedCategory, selectedLevel])

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedLevel(null)
    setSearchQuery('')
  }

  const hasActiveFilters = selectedCategory || selectedLevel || searchQuery

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Explore Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Course Library</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse through {courses.length}+ premium cybersecurity and tech courses
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card/50 border-border/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Funnel size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={
                    selectedCategory === category
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'border-border/50 hover:border-accent/50'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(level => (
                <Button
                  key={level}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                  className={
                    selectedLevel === level
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'border-border/50 hover:border-accent/50'
                  }
                >
                  {level}
                </Button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="border-accent/40 text-accent">
              {filteredCourses.length} courses found
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onAddToCart={onAddToCart}
              isInCart={cartItems.some(item => item.id === course.id)}
              isPurchased={purchasedCourseIds.includes(course.id)}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No courses found matching your criteria</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
