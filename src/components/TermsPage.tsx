import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { FileText, CheckCircle } from '@phosphor-icons/react'

interface TermsPageProps {
  onNavigate: (page: string) => void
}

export function TermsPage({ onNavigate }: TermsPageProps) {
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
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/40 text-base px-4 py-1.5">
              <FileText className="mr-2" size={16} weight="fill" />
              Legal Agreement
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of
              <span className="block mt-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-card/80 backdrop-blur shadow-xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using CourseHub's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Use License
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Permission is granted to temporarily access the materials (information or software) on CourseHub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on CourseHub's website</li>
                    <li>Remove any copyright or proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    <li>Share your account credentials with others</li>
                  </ul>
                  <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by CourseHub at any time.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  User Accounts
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.</p>
                  <p>You are responsible for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Maintaining the confidentiality of your account and password</li>
                    <li>Restricting access to your computer and account</li>
                    <li>All activities that occur under your account</li>
                  </ul>
                  <p>Accounts are for individual use only. Sharing accounts is strictly prohibited and may result in immediate termination of your account without refund.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Course Access and Content
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Upon purchasing a course or activating a membership, you receive a non-exclusive, non-transferable license to access the course content for personal use only.</p>
                  <p><strong className="text-foreground">Lifetime Access:</strong> Individual course purchases and active memberships provide lifetime access to course materials, including future updates to that content.</p>
                  <p><strong className="text-foreground">Membership Plans:</strong> Membership access is valid for the duration of your subscription period (weekly, monthly, or yearly). Upon expiration, you will lose access to membership benefits unless renewed.</p>
                  <p>We reserve the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Update, modify, or remove course content at our discretion</li>
                    <li>Discontinue courses with advance notice</li>
                    <li>Limit the number of times you can download materials</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Payment Terms
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>All prices are in Indian Rupees (INR) unless otherwise stated. We accept payment via UPI, credit/debit cards, and other methods displayed at checkout.</p>
                  <p><strong className="text-foreground">Course Purchases:</strong> Payments for individual courses are one-time charges providing lifetime access.</p>
                  <p><strong className="text-foreground">Memberships:</strong> Membership fees are charged based on the plan you select:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Weekly Plan: ₹299 (7 days access)</li>
                    <li>Monthly Plan: ₹1,499 (30 days access)</li>
                    <li>Yearly Plan: ₹9,999 (365 days access)</li>
                  </ul>
                  <p>Memberships do not auto-renew. You must manually renew your membership before expiration to maintain access.</p>
                  <p><strong className="text-foreground">Payment Processing:</strong> All payments are processed securely through third-party payment providers. We do not store your payment card information.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Refund Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer a 30-day money-back guarantee on all course purchases. See our full Refund Policy page for complete details on eligibility and the refund process.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Intellectual Property
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>All content on CourseHub, including but not limited to text, graphics, logos, videos, audio, software, and course materials, is the property of CourseHub or its content suppliers and is protected by international copyright laws.</p>
                  <p>You may not:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Reproduce, distribute, or publicly display course content</li>
                    <li>Create derivative works from our content</li>
                    <li>Download course videos for distribution or sale</li>
                    <li>Share course materials with non-enrolled users</li>
                    <li>Use our content for commercial purposes without written permission</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Prohibited Activities
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon intellectual property rights</li>
                    <li>Transmit viruses, malware, or harmful code</li>
                    <li>Engage in unauthorized framing or linking</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use automated systems (bots, scrapers) to access our site</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Impersonate any person or entity</li>
                    <li>Use our services for any fraudulent purpose</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Certificates
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Upon successful completion of a course, you will receive a completion certificate. Certificates are provided for educational purposes and indicate course completion, not professional certification or accreditation. CourseHub is not an accredited institution. Certificates can be verified by employers or others through our certificate verification system.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Disclaimers
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The materials on CourseHub's website are provided on an 'as is' basis. CourseHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Any warranties of merchantability or fitness for a particular purpose</li>
                    <li>That our services will be uninterrupted, timely, secure, or error-free</li>
                    <li>That course content will meet your specific requirements</li>
                    <li>That you will achieve specific results or job placement</li>
                  </ul>
                  <p>CourseHub does not guarantee employment or specific career outcomes from taking our courses.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall CourseHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use CourseHub's materials, even if CourseHub or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Termination
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including if you breach the Terms.</p>
                  <p>Upon termination:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Your right to use our services will immediately cease</li>
                    <li>You will lose access to all course materials</li>
                    <li>No refunds will be issued for violations of Terms</li>
                  </ul>
                  <p>You may delete your account at any time by contacting support. Refunds for active courses will be subject to our Refund Policy.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>📧 Email: support@coursehub.com</p>
                  <p>📱 WhatsApp: +91 98765 43210</p>
                  <p>📍 Address: Mumbai, Maharashtra, India - 400001</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
