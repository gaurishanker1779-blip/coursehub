import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Certificate, Users, Lightning } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onNavigate: (page: string) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: BookOpen,
      title: '500+ Premium Courses',
      description: 'Access comprehensive cybersecurity and tech courses from industry experts'
    },
    {
      icon: Certificate,
      title: 'Expert-Led Content',
      description: 'Learn from professionals with real-world experience and proven track records'
    },
    {
      icon: Users,
      title: 'Flexible Learning',
      description: 'Study at your own pace with lifetime access to course materials'
    },
    {
      icon: Lightning,
      title: 'Instant Access',
      description: 'Get immediate course access after payment approval'
    }
  ]

  const stats = [
    { value: '500+', label: 'Courses' },
    { value: '50+', label: 'Topics' },
    { value: '10K+', label: 'Students' },
    { value: '4.8/5', label: 'Rating' }
  ]

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        <div className="container relative mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/40" variant="outline">
              🚀 Welcome to the Future of Learning
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Cybersecurity &
              <span className="block bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
                Tech Skills That Matter
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners advancing their careers with our comprehensive course library. From ethical hacking to cloud security, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => onNavigate('courses')}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group"
              >
                Browse Courses
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('membership')}
                className="border-accent/40 text-accent hover:bg-accent/10 text-lg px-8 py-6"
              >
                View Membership Plans
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CourseHub?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide everything you need to advance your career in cybersecurity and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon size={24} className="text-primary" weight="duotone" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get instant access to 500+ premium courses or unlock everything with a membership plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate('signup')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('courses')}
                className="text-lg px-8 py-6"
              >
                Explore Courses
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
