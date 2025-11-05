import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown } from '@phosphor-icons/react'
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
      name: '7-Day Access',
      price: 299,
      description: 'Perfect for trying out the platform',
      features: [
        'Access to all 500+ courses',
        'Download resources',
        'Course completion certificates',
        '7 days of unlimited learning'
      ]
    },
    {
      type: 'monthly' as const,
      name: 'Monthly Plan',
      price: 999,
      description: 'Best for consistent learners',
      features: [
        'Access to all 500+ courses',
        'Download resources',
        'Course completion certificates',
        '30 days of unlimited learning',
        'Priority support'
      ],
      popular: true
    },
    {
      type: 'yearly' as const,
      name: 'Yearly Plan',
      price: 8999,
      description: 'Maximum value for serious learners',
      features: [
        'Access to all 500+ courses',
        'Download resources',
        'Course completion certificates',
        '365 days of unlimited learning',
        'Priority support',
        'Exclusive community access',
        'Early access to new courses'
      ]
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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/40" variant="outline">
            <Crown size={16} className="mr-1" weight="fill" />
            Premium Membership
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Everything</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get unlimited access to our entire course library. Learn at your own pace, anytime, anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={plan.popular ? 'md:-mt-4' : ''}
            >
              <Card className={`h-full flex flex-col relative ${
                plan.popular
                  ? 'border-accent shadow-lg shadow-accent/20'
                  : 'border-border/50'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.type === 'weekly' ? '7 days' : plan.type === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={20} className="text-accent shrink-0 mt-0.5" weight="bold" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    onClick={() => handleSelectPlan(plan.type, plan.price)}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include access to our complete course library
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-accent" weight="bold" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-accent" weight="bold" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-accent" weight="bold" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
