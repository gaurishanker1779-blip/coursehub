import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Lightning, Shield, Infinity } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface MembershipPageProps {
  onSelectPlan: (type: 'weekly' | 'monthly' | 'yearly', price: number) => void
  isAuthenticated: boolean
  onNavigate: (page: string) => void
}

export function MembershipPage({ onSelectPlan, isAuthenticated, onNavigate }: MembershipPageProps) {
  const plans = [
    {
      type: 'weekly' as const,
      name: '7-Day Trial',
      price: 299,
      description: 'Perfect for exploring the platform',
      features: [
        'Access to all 500+ courses',
        'Download resources',
        'Course completion certificates',
        '7 days of unlimited learning',
        'HD video quality',
        'Mobile & desktop access'
      ],
      icon: Lightning
    },
    {
      type: 'monthly' as const,
      name: 'Pro Monthly',
      price: 999,
      description: 'Best for consistent learners',
      features: [
        'Access to all 500+ courses',
        'Download resources',
        'Course completion certificates',
        '30 days of unlimited learning',
        'Priority email support',
        'HD & 4K video quality',
        'Mobile & desktop access',
        'Offline downloads'
      ],
      popular: true,
      icon: Crown,
      savings: 'Save 40%'
    },
    {
      type: 'yearly' as const,
      name: 'Elite Yearly',
      price: 8999,
      description: 'Maximum value for serious professionals',
      features: [
        'Access to all 500+ courses',
        'Download resources',
        'Course completion certificates',
        '365 days of unlimited learning',
        '24/7 Priority support',
        'Exclusive community access',
        'Early access to new courses',
        'HD & 4K video quality',
        'Mobile & desktop access',
        'Offline downloads',
        '1-on-1 mentorship sessions',
        'Career guidance'
      ],
      icon: Infinity,
      savings: 'Save 70%'
    }
  ]

  const handleSelectPlan = (type: 'weekly' | 'monthly' | 'yearly', price: number) => {
    if (!isAuthenticated) {
      onNavigate('signin')
      return
    }
    onSelectPlan(type, price)
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/40 text-base px-4 py-1.5" variant="outline">
            <Crown size={18} className="mr-2" weight="fill" />
            Premium Membership Plans
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            Unlock <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">Everything</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Get unlimited access to 500+ premium courses. Learn at your own pace, master new skills, and transform your career.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={plan.popular ? 'sm:col-span-2 md:col-span-1 md:-mt-4' : ''}
              whileHover={{ y: -8, scale: plan.popular ? 1.02 : 1 }}
            >
              <Card className={`h-full flex flex-col relative overflow-hidden ${
                plan.popular
                  ? 'border-2 border-accent shadow-2xl shadow-accent/30 bg-gradient-to-br from-card via-card to-accent/5'
                  : 'border-border/50 bg-card/80 backdrop-blur hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10'
              } transition-all duration-500`}>
                {plan.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white border-0 shadow-lg text-sm px-4 py-1">
                        ⭐ Most Popular
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 pointer-events-none" />
                  </>
                )}

                {plan.savings && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-500/90 text-white border-0 shadow-lg">
                      {plan.savings}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-6 sm:pb-8 pt-8 sm:pt-10">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${
                    plan.popular ? 'from-accent to-primary' : 'from-primary/20 to-accent/20'
                  } flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-lg`}>
                    <plan.icon size={28} className={`${plan.popular ? 'text-white' : 'text-accent'} sm:w-8 sm:h-8`} weight="fill" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-center">{plan.name}</CardTitle>
                  <CardDescription className="text-center text-sm sm:text-base">{plan.description}</CardDescription>
                  <div className="mt-4 sm:mt-6 text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">₹{plan.price}</span>
                    <span className="text-muted-foreground block mt-1 text-sm sm:text-base">
                      /{plan.type === 'weekly' ? '7 days' : plan.type === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 px-5 sm:px-6">
                  <ul className="space-y-2.5 sm:space-y-3">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check 
                          size={20} 
                          className={`${plan.popular ? 'text-accent' : 'text-primary'} shrink-0 mt-0.5`} 
                          weight="bold" 
                        />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-5 sm:p-6 pt-0">
                  <Button
                    className={`w-full text-sm sm:text-base py-5 sm:py-6 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white shadow-xl hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105'
                        : 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300'
                    }`}
                    onClick={() => handleSelectPlan(plan.type, plan.price)}
                  >
                    {plan.popular ? '🚀 Get Started Now' : 'Choose Plan'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur border border-border/50 rounded-2xl p-6 sm:p-8 md:p-12 max-w-5xl mx-auto shadow-xl"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
              All Plans Include
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: 'Secure Payment', desc: 'SSL encrypted, 100% safe' },
              { icon: Infinity, title: 'No Hidden Fees', desc: 'Transparent pricing' },
              { icon: Check, title: 'Cancel Anytime', desc: 'No questions asked' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex flex-col items-center text-center p-5 sm:p-6 rounded-xl bg-background/50 hover:bg-accent/5 transition-colors duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 sm:mb-4">
                  <item.icon size={24} className="text-accent sm:w-7 sm:h-7" weight="duotone" />
                </div>
                <h4 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              💳 We accept all major payment methods
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-muted-foreground">
              <Badge variant="outline" className="border-border/50">Visa</Badge>
              <Badge variant="outline" className="border-border/50">Mastercard</Badge>
              <Badge variant="outline" className="border-border/50">PayPal</Badge>
              <Badge variant="outline" className="border-border/50">Razorpay</Badge>
              <Badge variant="outline" className="border-border/50">UPI</Badge>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 px-4">
            ✨ 100% Money-Back Guarantee - Try risk-free for 30 days
          </p>
        </motion.div>
      </div>
    </div>
  )
}
