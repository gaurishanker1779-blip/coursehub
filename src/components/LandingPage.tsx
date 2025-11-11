import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Certificate, Users, Lightning, Star, Play, Shield, Clock, Trophy, CheckCircle } from '@phosphor-icons/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

interface LandingPageProps {
  onNavigate: (page: string) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: BookOpen,
      title: 'Learn Anytime',
      description: 'Access 500+ courses 24/7 from anywhere in the world'
    },
    {
      icon: Certificate,
      title: 'Certified Courses',
      description: 'Industry-recognized certifications upon completion'
    },
    {
      icon: Users,
      title: 'Affordable',
      description: 'Premium education at prices everyone can afford'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: '100% Secure Payment',
      description: 'SSL encrypted, Razorpay secured payment gateway'
    },
    {
      icon: Clock,
      title: 'Lifetime Access',
      description: 'Learn at your own pace with unlimited course access'
    },
    {
      icon: Trophy,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with 10+ years experience'
    },
    {
      icon: CheckCircle,
      title: 'Money-Back Guarantee',
      description: '100% refund within 30 days if not satisfied'
    }
  ]

  const stats = [
    { value: '500+', label: 'Premium Courses' },
    { value: '10,000+', label: 'Active Learners' },
    { value: '50+', label: 'Expert Instructors' },
    { value: '4.9/5', label: 'Average Rating' }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Cybersecurity Analyst',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      quote: 'CourseHub transformed my career! The ethical hacking course helped me land my dream job in cybersecurity.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Penetration Tester',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      quote: 'Best investment I made in my education. The instructors are amazing and the content is always up-to-date.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Security Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      quote: 'From beginner to professional in 6 months. The hands-on labs and real-world scenarios are incredible!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-accent/30"
        />
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        </div>

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        <div className="container relative mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/40 backdrop-blur-sm text-base px-4 py-1.5" variant="outline">
                ✨ Join 10,000+ Successful Learners
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Learn Skills That Make
              <span className="block mt-2 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
                You Money
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              500+ Courses, One Platform. Master cybersecurity, ethical hacking, and tech skills from industry experts.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-12 px-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('courses')}
                className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 group shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <Play size={20} weight="fill" className="mr-2" />
                Start Learning Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('membership')}
                className="border-2 border-accent/40 text-accent hover:bg-accent/10 text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 backdrop-blur-sm w-full sm:w-auto"
              >
                Get Access
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground px-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500 shrink-0" weight="fill" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500 shrink-0" weight="fill" />
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-16 sm:mt-20 md:mt-24 px-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background to-card/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/40" variant="outline">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Succeed in Tech
              </span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              World-class education platform designed to help you master in-demand skills
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 group">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon size={32} className="text-accent sm:w-9 sm:h-9" weight="duotone" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-accent transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <CardContent className="p-5 sm:p-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                      <benefit.icon size={24} className="text-primary sm:w-7 sm:h-7" weight="duotone" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 border-y border-green-500/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="inline-block mb-4"
              >
                <Badge className="bg-green-500/20 text-green-500 border-green-500/40 text-lg px-6 py-2" variant="outline">
                  🎁 5 PREMIUM COURSES - 100% FREE
                </Badge>
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Start Learning Today - Zero Cost!
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                Get instant lifetime access to 5 complete professional courses worth ₹2,495 - absolutely FREE!
              </p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-accent font-bold text-xl"
              >
                ⚡ Limited Time Offer • Claim Now ⚡
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'Python Full Stack Web Development',
                  desc: 'Master Python, Django, Flask & React. Build 10+ real projects.',
                  hours: '50+',
                  projects: '10+',
                  students: '15,420',
                  img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop',
                  value: '₹599'
                },
                {
                  title: 'JavaScript Complete Course',
                  desc: 'From basics to advanced. ES6+, DOM, APIs & modern frameworks.',
                  hours: '60+',
                  projects: '15+',
                  students: '12,850',
                  img: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
                  value: '₹499'
                },
                {
                  title: 'Cybersecurity & Ethical Hacking',
                  desc: 'Complete penetration testing bootcamp. 20+ hands-on labs.',
                  hours: '80+',
                  projects: '20+',
                  students: '18,920',
                  img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
                  value: '₹799'
                },
                {
                  title: 'All-in-One Programming',
                  desc: 'Python, JavaScript, Java, C++, Web & Mobile. Ultimate bundle!',
                  hours: '100+',
                  projects: '30+',
                  students: '21,340',
                  img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
                  value: '₹999'
                }
              ].map((course, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className="h-full border-2 border-green-500/30 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 text-white border-0 text-xs px-2 py-1 font-bold">
                          FREE
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white border-0 text-xs px-2 py-1 font-bold line-through">
                          {course.value}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 text-white text-xs">
                          <div className="flex -space-x-1">
                            {[1, 2, 3].map((i) => (
                              <img
                                key={i}
                                src={`https://i.pravatar.cc/150?u=stu${idx}${i}`}
                                alt=""
                                className="w-5 h-5 rounded-full border border-white"
                              />
                            ))}
                          </div>
                          <span className="font-semibold">{course.students} enrolled</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {course.desc}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-accent shrink-0" />
                          <span>{course.hours} Hours</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Trophy size={14} className="text-accent shrink-0" />
                          <span>{course.projects} Projects</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => onNavigate('courses')}
                        size="sm"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        Get Free Access
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <Card className="h-full border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur hover:border-accent hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 overflow-hidden group flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="text-6xl"
                    >
                      🎉
                    </motion.div>
                    <div>
                      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                        Worth ₹2,495
                      </div>
                      <div className="text-5xl font-black text-green-500 mb-4">
                        NOW FREE!
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle size={16} weight="fill" className="text-green-500" />
                        <span>All 5 Courses Unlocked</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle size={16} weight="fill" className="text-green-500" />
                        <span>Lifetime Access</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle size={16} weight="fill" className="text-green-500" />
                        <span>All Future Updates</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle size={16} weight="fill" className="text-green-500" />
                        <span>No Credit Card</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => onNavigate('courses')}
                      size="lg"
                      className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg"
                    >
                      Claim All Courses FREE
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 max-w-3xl mx-auto"
            >
              <p className="text-center text-sm text-muted-foreground">
                💡 <strong className="text-foreground">Why we offer these for FREE?</strong> We believe in democratizing education. 
                Experience our world-class teaching quality with these free courses, then explore our premium catalog of 500+ courses 
                to continue your learning journey. <strong className="text-accent">No strings attached!</strong>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/40" variant="outline">
              Student Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur shadow-2xl">
                <CardContent className="p-6 sm:p-8 md:p-10 lg:p-14">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                    <motion.img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-accent/50 shadow-lg shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-3 sm:mb-4">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} size={20} weight="fill" className="text-yellow-500 sm:w-6 sm:h-6" />
                        ))}
                      </div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground mb-4 sm:mb-6 leading-relaxed italic">
                        "{testimonials[activeTestimonial].quote}"
                      </p>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-accent">{testimonials[activeTestimonial].name}</div>
                        <div className="text-sm sm:text-base text-muted-foreground">{testimonials[activeTestimonial].role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-accent w-10'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container relative mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed">
              Join 10,000+ learners who are already mastering in-demand skills. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                onClick={() => onNavigate('signup')}
                className="bg-white text-primary hover:bg-white/90 text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('courses')}
                className="border-2 border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 backdrop-blur-sm w-full sm:w-auto"
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
