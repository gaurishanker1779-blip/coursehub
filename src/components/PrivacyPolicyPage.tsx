import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Shield, CheckCircle } from '@phosphor-icons/react'

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
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
              <Shield className="mr-2" size={16} weight="fill" />
              Your Privacy Matters
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy
              <span className="block mt-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Policy
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
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At CourseHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                    <p>We collect information that you voluntarily provide to us when you register on the website, make a purchase, or contact us. This may include:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Name and email address</li>
                      <li>Payment information (processed securely through third-party payment processors)</li>
                      <li>Phone number (optional)</li>
                      <li>Course progress and completion data</li>
                      <li>Communications with our support team</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                    <p>When you access our website, we may automatically collect:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Device and browser information</li>
                      <li>IP address and location data</li>
                      <li>Usage data (pages visited, time spent, etc.)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  How We Use Your Information
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Process your transactions and manage your account</li>
                    <li>Send you course materials and updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you marketing communications (you can opt-out anytime)</li>
                    <li>Improve our website and services based on user feedback</li>
                    <li>Prevent fraud and enhance security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Information Sharing
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Service Providers:</strong> We share information with trusted third-party service providers who help us operate our platform (payment processors, email services, hosting providers)</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                    <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your consent</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information. This includes SSL encryption, secure payment processing, regular security audits, and restricted access to personal data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Cookies and Tracking
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We use cookies and similar tracking technologies to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Remember your preferences and settings</li>
                    <li>Keep you signed in</li>
                    <li>Analyze how you use our website</li>
                    <li>Provide personalized content and recommendations</li>
                  </ul>
                  <p>You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Your Rights
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Access, update, or delete your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Lodge a complaint with a data protection authority</li>
                  </ul>
                  <p className="mt-4">To exercise these rights, please contact us at support@coursehub.com</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Children's Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Data Retention
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal information within 30 days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
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
