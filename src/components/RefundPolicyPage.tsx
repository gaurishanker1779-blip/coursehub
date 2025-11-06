import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowsClockwise, CheckCircle, XCircle } from '@phosphor-icons/react'

interface RefundPolicyPageProps {
  onNavigate: (page: string) => void
}

export function RefundPolicyPage({ onNavigate }: RefundPolicyPageProps) {
  const eligibleReasons = [
    'Course content does not match the description',
    'Technical issues preventing course access (unresolved after support contact)',
    'Duplicate purchase made by mistake',
    'Course quality is significantly below standards',
    'You are not satisfied with the course content'
  ]

  const ineligibleReasons = [
    'Request made after 30 days of purchase',
    'More than 50% of course content has been accessed',
    'Account has been banned for violating Terms of Service',
    'Course materials have been downloaded or shared',
    'Membership refund requested after 7 days of activation'
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <section className="relative overflow-hidden py-16 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-6 bg-green-500/20 text-green-500 border-green-500/40 text-base px-4 py-1.5">
              <ArrowsClockwise className="mr-2" size={16} weight="fill" />
              100% Money-Back Guarantee
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Refund
              <span className="block mt-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We stand behind our courses with a 30-day money-back guarantee. Your satisfaction is our priority.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={48} className="text-green-500" weight="fill" />
                </div>
                <h2 className="text-3xl font-bold mb-4">30-Day Money-Back Guarantee</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  If you're not completely satisfied with your course purchase, you can request a full refund within 30 days. No questions asked.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur shadow-xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">How Our Refund Policy Works</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We want you to feel confident in your purchase. Here's everything you need to know about our refund policy:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Review the Course</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Start the course and explore the content. Take your time to determine if it meets your expectations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Request Within 30 Days</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        If you're not satisfied, submit a refund request within 30 days of purchase through your account or by contacting support.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Get Your Money Back</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Once approved, refunds are processed within 5-7 business days to your original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-6">Refund Eligibility</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle size={24} className="text-green-500" weight="fill" />
                      You ARE Eligible If:
                    </h3>
                    <ul className="space-y-3">
                      {eligibleReasons.map((reason, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" weight="fill" />
                          <span className="text-muted-foreground">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <XCircle size={24} className="text-red-500" weight="fill" />
                      You are NOT Eligible If:
                    </h3>
                    <ul className="space-y-3">
                      {ineligibleReasons.map((reason, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" weight="fill" />
                          <span className="text-muted-foreground">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Course Purchase Refunds</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Individual Courses:</strong> Full refund available within 30 days of purchase if you have accessed less than 50% of the course content.
                  </p>
                  <p>
                    <strong className="text-foreground">Processing Time:</strong> Refunds are typically processed within 5-7 business days after approval. The time it takes for the refund to appear in your account depends on your payment provider.
                  </p>
                  <p>
                    <strong className="text-foreground">Access After Refund:</strong> Once a refund is issued, you will immediately lose access to the course content and any certificates earned.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Membership Refunds</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Weekly Membership (₹299):</strong> Full refund available within 7 days of activation if no courses have been accessed.
                  </p>
                  <p>
                    <strong className="text-foreground">Monthly Membership (₹1,499):</strong> Full refund available within 7 days of activation. Partial refunds (prorated) may be considered within 14 days on a case-by-case basis.
                  </p>
                  <p>
                    <strong className="text-foreground">Yearly Membership (₹9,999):</strong> Full refund available within 14 days of activation. Partial refunds (prorated) may be considered within 30 days on a case-by-case basis.
                  </p>
                  <p className="text-sm bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    ⚠️ <strong className="text-foreground">Important:</strong> Memberships that have been used to access courses or download materials may not be eligible for a full refund. We review each case individually.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>To request a refund, please follow these steps:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Log in to your CourseHub account</li>
                    <li>Go to "My Courses" and click on the course you want a refund for</li>
                    <li>Click "Request Refund" and fill out the brief form</li>
                    <li>Alternatively, email us at support@coursehub.com with your order details</li>
                    <li>Include your order number, reason for refund, and any additional comments</li>
                  </ol>
                  <p className="mt-4">
                    Our support team will review your request and respond within 24-48 hours. Most refund requests are approved within 2 business days.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Exceptions</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We reserve the right to refuse refunds in the following cases:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Repeated refund requests indicating abuse of our refund policy</li>
                    <li>Account violations or fraudulent activity</li>
                    <li>Course content has been downloaded, copied, or shared with others</li>
                    <li>Completion certificates have been downloaded or shared</li>
                  </ul>
                  <p className="mt-4">
                    We monitor refund patterns to ensure our policy is not abused. Accounts with excessive refund requests may be subject to review and potential suspension.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Partial Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In certain circumstances, partial refunds may be approved at our discretion. This includes situations where technical issues affected your learning experience but were later resolved, or where you've accessed a significant portion of a course but have valid concerns about content quality.
                </p>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you have questions about our refund policy or need assistance with a refund request:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      📧
                    </div>
                    <div>
                      <p className="font-semibold">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@coursehub.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      💬
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      ⏰
                    </div>
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 backdrop-blur">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help with any refund-related questions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onNavigate('contact')}
                  size="lg"
                  className="bg-accent hover:bg-accent/90"
                >
                  Contact Support
                </Button>
                <Button
                  onClick={() => onNavigate('faq')}
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  View FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
