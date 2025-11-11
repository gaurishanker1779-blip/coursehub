import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Sparkle, CheckCircle, Fire } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DopamineRewardsProps {
  trigger?: 'enroll' | 'purchase' | 'complete' | 'login' | 'streak'
  onClose?: () => void
}

export function DopamineRewards({ trigger, onClose }: DopamineRewardsProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (trigger) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        onClose?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [trigger, onClose])

  const rewards = {
    enroll: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      title: '🎉 Awesome!',
      message: 'Course enrolled successfully!',
      points: '+50 XP'
    },
    purchase: {
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      title: '⭐ Great Choice!',
      message: 'Course purchased! Start learning now!',
      points: '+100 XP'
    },
    complete: {
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      title: '🏆 Amazing Progress!',
      message: 'Lesson completed! Keep going!',
      points: '+25 XP'
    },
    login: {
      icon: Fire,
      color: 'text-orange-500',
      bgColor: 'from-orange-500/20 to-red-500/20',
      title: '🔥 Welcome Back!',
      message: 'Continue your learning journey!',
      points: '+10 XP'
    },
    streak: {
      icon: Sparkle,
      color: 'text-cyan-500',
      bgColor: 'from-cyan-500/20 to-blue-500/20',
      title: '✨ Streak Active!',
      message: "You're on fire! Keep it up!",
      points: '+20 XP'
    }
  }

  const reward = trigger ? rewards[trigger] : null

  if (!show || !reward) return null

  const Icon = reward.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -50 }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
      >
        <Card className={`border-2 bg-gradient-to-r ${reward.bgColor} backdrop-blur-xl shadow-2xl min-w-[300px]`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className={`${reward.color}`}
              >
                <Icon size={48} weight="fill" />
              </motion.div>
              <div className="flex-1">
                <div className="font-bold text-lg mb-1">{reward.title}</div>
                <div className="text-sm text-muted-foreground">{reward.message}</div>
              </div>
              <Badge className="bg-accent text-accent-foreground font-bold">
                {reward.points}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

interface ProgressTrackerProps {
  totalCourses: number
  completedCourses: number
}

export function ProgressTracker({ totalCourses, completedCourses }: ProgressTrackerProps) {
  const percentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0
  const level = Math.floor(completedCourses / 5) + 1
  const coursesToNextLevel = ((level * 5) - completedCourses)

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Your Progress</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              Level {level}
              <Badge className="bg-accent text-accent-foreground">
                {completedCourses} Courses
              </Badge>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Trophy size={40} className="text-accent" weight="fill" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress to Level {level + 1}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {coursesToNextLevel > 0 ? `${coursesToNextLevel} more courses to next level!` : 'Level up! 🎉'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-lg font-bold text-accent">{completedCourses}</div>
            <div className="text-xs text-muted-foreground">Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{completedCourses * 50}</div>
            <div className="text-xs text-muted-foreground">XP Earned</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{level}</div>
            <div className="text-xs text-muted-foreground">Level</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface AchievementBadgeProps {
  achievement: {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    progress?: number
    target?: number
  }
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const progress = achievement.progress || 0
  const target = achievement.target || 1
  const percentage = (progress / target) * 100

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${!achievement.unlocked && 'opacity-50 grayscale'}`}
    >
      <Card className={`border-2 ${achievement.unlocked ? 'border-accent/50 bg-gradient-to-br from-accent/10 to-primary/10' : 'border-border/50'}`}>
        <CardContent className="p-4 text-center">
          <div className="text-4xl mb-2">{achievement.icon}</div>
          <div className="font-bold text-sm mb-1">{achievement.title}</div>
          <div className="text-xs text-muted-foreground mb-2">{achievement.description}</div>
          {!achievement.unlocked && target > 1 && (
            <div className="space-y-1">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {progress}/{target}
              </div>
            </div>
          )}
          {achievement.unlocked && (
            <Badge className="mt-2 bg-green-500 text-white">
              <CheckCircle size={12} className="mr-1" weight="fill" />
              Unlocked
            </Badge>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
