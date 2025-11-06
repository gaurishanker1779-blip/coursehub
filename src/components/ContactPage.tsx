import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { EnvelopeSimple, Phone, MapPin, WhatsappLogo, Clock, PaperPlaneRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ContactPageProps {
  onNavigate: (page: string) => void
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactMethods = [
    {
      icon: EnvelopeSimple,
      title: 'Email Us',
      info: 'support@coursehub.com',
      description: 'We respond within 24 hours',
      action: 'mailto:support@coursehub.com'
    },
    {
      icon: WhatsappLogo,
      title: 'WhatsApp',
      info: '+91 98765 43210',
      description: 'Available 9 AM - 9 PM IST',
      action: 'https://wa.me/919876543210'
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 98765 43210',
      description: 'Mon-Sat, 9 AM - 6 PM IST',
      action: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Mumbai, Maharashtra',
      description: 'India - 400001',
      action: null
    }
  ]

  const faqs = [
    {
      question: 'How quickly will I get a response?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, use WhatsApp for faster response.'
    },
    {
      question: 'What are your support hours?',
      answer: 'Our support team is available Monday to Saturday, 9 AM to 9 PM IST. Emergency support is available 24/7 for premium members.'
    },
    {
      question: 'Can I schedule a call with an advisor?',
      answer: 'Yes! Premium members can schedule one-on-one consultation calls. Contact us to book your slot.'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

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
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              We're Here to
              <span className="block mt-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Help You
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have questions? Need support? Our team is ready to assist you. Reach out and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card 
                className="h-full border-border/50 bg-card/80 backdrop-blur hover:border-accent/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => method.action && window.open(method.action, '_blank')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 mx-auto">
                    <method.icon size={28} className="text-accent" weight="duotone" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                  <p className="text-sm font-medium text-accent mb-1">{method.info}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-sm text-muted-foreground">Fill out the form and we'll get back to you shortly</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <PaperPlaneRight className="mr-2" size={20} />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-accent" />
                  <div>
                    <p className="font-medium">Monday - Saturday</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 9:00 PM IST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-sm text-muted-foreground">Closed</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm text-accent font-medium">
                    🌟 Premium members get 24/7 priority support
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <h4 className="font-semibold mb-2 text-sm">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 backdrop-blur">
              <CardContent className="p-6 text-center">
                <WhatsappLogo size={48} className="text-green-500 mx-auto mb-3" weight="duotone" />
                <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with us on WhatsApp for instant support
                </p>
                <Button
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <WhatsappLogo className="mr-2" size={20} weight="fill" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
