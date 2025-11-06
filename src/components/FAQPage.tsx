import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { MagnifyingGlass, Plus, Minus } from '@phosphor-icons/react'
import { useState } from 'react'

interface FAQPageProps {
  onNavigate: (page: string) => void
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const faqCategories = [
    {
      title: 'General Questions',
      faqs: [
        {
          question: 'What is CourseHub?',
          answer: 'CourseHub is a premium online learning platform offering 500+ courses in cybersecurity, ethical hacking, web development, cloud computing, and other tech skills. We provide industry-recognized certifications, hands-on projects, and lifetime access to all course materials.'
        },
        {
          question: 'Who can take these courses?',
          answer: 'Our courses are designed for everyone - from complete beginners to advanced professionals. Each course clearly states its prerequisites. Whether you\'re a student, working professional, or career changer, you\'ll find courses suited to your level.'
        },
        {
          question: 'Do I need any prior experience?',
          answer: 'It depends on the course. We offer beginner-friendly courses that require no prior experience, as well as advanced courses for experienced professionals. Check each course\'s "Requirements" section to see what\'s needed.'
        },
        {
          question: 'Are the courses self-paced?',
          answer: 'Yes! All courses offer lifetime access, so you can learn at your own pace. Watch videos, complete assignments, and practice labs whenever it suits your schedule. There are no deadlines.'
        }
      ]
    },
    {
      title: 'Payment & Pricing',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept UPI payments (Google Pay, PhonePe, Paytm, etc.), debit cards, credit cards, net banking, and digital wallets. All payments are processed through secure, encrypted gateways.'
        },
        {
          question: 'How does the membership plan work?',
          answer: 'Our membership gives you unlimited access to ALL 500+ courses. Choose from weekly (₹299), monthly (₹1,499), or yearly (₹9,999) plans. Members get priority support, exclusive content, and early access to new courses.'
        },
        {
          question: 'Can I buy individual courses?',
          answer: 'Yes! You can purchase courses individually, with prices ranging from ₹199 to ₹599. Individual course purchases include lifetime access to that specific course.'
        },
        {
          question: 'Is there a refund policy?',
          answer: 'Yes! We offer a 100% money-back guarantee within 30 days of purchase if you\'re not satisfied. No questions asked. See our Refund Policy page for complete details.'
        },
        {
          question: 'Do you offer discounts?',
          answer: 'Yes! We regularly offer discount codes. Use GET20 for 20% off, GET30 for 30% off (limited time), or GET10 for 10% off your purchase. Follow us on social media for exclusive discount codes.'
        }
      ]
    },
    {
      title: 'Courses & Learning',
      faqs: [
        {
          question: 'How long do I have access to a course?',
          answer: 'Lifetime! Once you purchase a course or activate a membership, you have permanent access to all course materials, including future updates and new content added to the course.'
        },
        {
          question: 'Do courses get updated?',
          answer: 'Absolutely! We continuously update our courses to reflect the latest industry trends, tools, and technologies. All updates are free for enrolled students - you never pay again.'
        },
        {
          question: 'Will I get a certificate?',
          answer: 'Yes! Upon completing a course, you\'ll receive an industry-recognized completion certificate that you can share on LinkedIn, add to your resume, or show to employers.'
        },
        {
          question: 'Can I download the course videos?',
          answer: 'Course videos are available for streaming on our platform. Downloadable resources like PDFs, code files, and project materials are provided for each course.'
        },
        {
          question: 'What if I get stuck during a course?',
          answer: 'Every course has a Q&A section where you can ask questions. Our instructors and community members actively respond. Premium members get direct access to instructors and priority support.'
        }
      ]
    },
    {
      title: 'Account & Technical',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button, enter your name, email, and create a password. That\'s it! You\'ll receive a confirmation email and can start browsing courses immediately.'
        },
        {
          question: 'Can I access courses on mobile?',
          answer: 'Yes! Our platform is fully responsive and works perfectly on mobile phones, tablets, laptops, and desktops. Learn anywhere, anytime.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Forgot Password" on the sign-in page, enter your email, and we\'ll send you a password reset link. If you don\'t receive it, check your spam folder or contact support.'
        },
        {
          question: 'Can I share my account with others?',
          answer: 'No, accounts are for individual use only. Sharing accounts violates our Terms of Service and may result in account suspension. We offer special team/corporate plans for organizations.'
        },
        {
          question: 'What are your system requirements?',
          answer: 'You need a stable internet connection and a modern web browser (Chrome, Firefox, Safari, or Edge). For hands-on labs, some courses may require specific software, which will be mentioned in the course requirements.'
        }
      ]
    },
    {
      title: 'Careers & Certifications',
      faqs: [
        {
          question: 'Will these courses help me get a job?',
          answer: 'Our courses are designed with employability in mind. You\'ll build a portfolio of real-world projects, earn industry-recognized certifications, and learn in-demand skills. Many of our graduates have successfully landed jobs at top companies.'
        },
        {
          question: 'Are the certificates recognized by employers?',
          answer: 'Yes! Our certificates are recognized in the industry. They demonstrate your practical knowledge and skills. Many students successfully showcase these certificates on LinkedIn and during job interviews.'
        },
        {
          question: 'Do you provide job placement assistance?',
          answer: 'Premium members get access to our career services, including resume reviews, interview preparation, and job referrals to our partner companies. We also maintain an active job board with opportunities.'
        },
        {
          question: 'What skills will I learn?',
          answer: 'Depending on the course, you\'ll learn practical, hands-on skills in areas like ethical hacking, penetration testing, web development, cloud computing, DevOps, AI/ML, and more. Every course focuses on real-world applications.'
        }
      ]
    }
  ]

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  const toggleExpand = (categoryIndex: number, faqIndex: number) => {
    const globalIndex = categoryIndex * 1000 + faqIndex
    setExpandedIndex(expandedIndex === globalIndex ? null : globalIndex)
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
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked
              <span className="block mt-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions about CourseHub, our courses, and how we can help you succeed
            </p>

            <div className="relative max-w-xl mx-auto">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base bg-background/80 backdrop-blur border-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredFaqs.length === 0 ? (
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardContent className="p-12 text-center">
                <MagnifyingGlass size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try different keywords or browse all categories below
                </p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card className="border-border/50 bg-card/80 backdrop-blur overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 1000 + faqIndex
                      const isExpanded = expandedIndex === globalIndex
                      
                      return (
                        <div
                          key={faqIndex}
                          className="border-b border-border/50 last:border-0"
                        >
                          <button
                            onClick={() => toggleExpand(categoryIndex, faqIndex)}
                            className="w-full px-6 py-4 text-left hover:bg-accent/5 transition-colors flex items-start justify-between gap-4 group"
                          >
                            <span className="font-semibold text-base group-hover:text-accent transition-colors flex-1">
                              {faq.question}
                            </span>
                            {isExpanded ? (
                              <Minus size={20} className="text-accent shrink-0 mt-1" weight="bold" />
                            ) : (
                              <Plus size={20} className="text-muted-foreground shrink-0 mt-1 group-hover:text-accent transition-colors" weight="bold" />
                            )}
                          </button>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: isExpanded ? 'auto' : 0,
                              opacity: isExpanded ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 backdrop-blur">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
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
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}
