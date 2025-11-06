import { motion } from 'framer-motion'
import { EnvelopeSimple, WhatsappLogo, MapPin, Heart } from '@phosphor-icons/react'

interface FooterProps {
  onNavigate: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Courses', page: 'courses' },
    { label: 'Membership', page: 'membership' },
    { label: 'About Us', page: 'about' }
  ]

  const supportLinks = [
    { label: 'Contact Support', page: 'contact' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Refund Policy', page: 'refund' },
    { label: 'Customer Care', page: 'contact' }
  ]

  const legalLinks = [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' },
    { label: 'Refund Policy', page: 'refund' }
  ]

  return (
    <footer className="bg-gradient-to-br from-card via-background to-card border-t border-border/50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <motion.button
              onClick={() => onNavigate('home')}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              CourseHub
            </motion.button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Learn skills that make you money. 500+ premium courses in cybersecurity, web development, and emerging technologies.
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="w-10 h-10 rounded-lg bg-green-500/10 hover:bg-green-500/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <WhatsappLogo size={20} className="text-green-500" weight="fill" />
              </motion.button>
              <motion.button
                onClick={() => onNavigate('contact')}
                className="w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <EnvelopeSimple size={20} className="text-accent" weight="fill" />
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.page + link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <EnvelopeSimple size={18} className="text-accent shrink-0 mt-0.5" weight="fill" />
                <a href="mailto:support@coursehub.com" className="hover:text-accent transition-colors">
                  support@coursehub.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <WhatsappLogo size={18} className="text-green-500 shrink-0 mt-0.5" weight="fill" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" weight="fill" />
                <span>Mumbai, Maharashtra<br />India - 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} CourseHub. All rights reserved. Made with <Heart size={14} weight="fill" className="inline text-red-500 mx-1" /> for learners worldwide.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              🔒 SSL Secured
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              ✓ ISO 27001 Certified
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              💯 100% Money-Back Guarantee
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              ⭐ 4.9/5 Rating
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
