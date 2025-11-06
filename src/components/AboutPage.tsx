import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Trophy, Users, BookOpen, Shield, Heart, Target, Rocket, CheckCircle } from '@phosphor-icons/react'

interface AboutPageProps {
  onNavigate: (page: string) => void
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We deliver world-class education with industry-recognized certifications'
    },
    {
      icon: Heart,
      title: 'Student Success',
      description: 'Your success is our mission. We provide lifetime support and guidance'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: '100% secure platform with money-back guarantee and verified instructors'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Constantly updating courses with latest technologies and industry trends'
    }
  ]

  const team = [
    {
      name: 'Adarsh Kosta',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      bio: '15+ years in cybersecurity and ethical hacking. Former security consultant at Fortune 500 companies.'
    },
    {
      name: 'Dr. Priya Singh',
      role: 'Head of Curriculum',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      bio: 'PhD in Computer Science. 12+ years teaching experience at top universities.'
    },
    {
      name: 'Rahul Verma',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      bio: 'Full-stack developer and DevOps expert. Built systems for 1M+ users.'
    },
    {
      name: 'Sneha Kapoor',
      role: 'Head of Student Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Passionate about education. Helped 5,000+ students achieve their career goals.'
    }
  ]

  const stats = [
    { value: '10,000+', label: 'Students Trained' },
    { value: '500+', label: 'Premium Courses' },
    { value: '50+', label: 'Expert Instructors' },
    { value: '95%', label: 'Success Rate' }
  ]

  const achievements = [
    'Featured in Top 10 Online Learning Platforms 2024',
    'ISO 27001 Certified for Information Security',
    'Winner of Best EdTech Startup Award 2023',
    'Partnership with 100+ Leading Companies',
    '4.9/5 Average Rating from 10,000+ Reviews',
    'Trusted by Students from 50+ Countries'
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/40 text-base px-4 py-1.5">
              About CourseHub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering the Next Generation of
              <span className="block mt-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Tech Professionals
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Since 2020, we've been on a mission to make quality tech education accessible to everyone. 
              Our platform has helped over 10,000 students launch and advance their careers in cybersecurity, 
              software development, and emerging technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50"
              >
                <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/40">
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why We Built CourseHub</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              CourseHub was born from a simple belief: <strong className="text-foreground">quality tech education should be accessible to everyone</strong>, 
              regardless of background or financial situation. Our founder, Adarsh Kosta, spent years working in cybersecurity and saw firsthand 
              how the industry needed skilled professionals but traditional education was too expensive and outdated.
            </p>
            <p>
              In 2020, during the global pandemic, we launched CourseHub with just 10 courses. Today, we offer over 500+ comprehensive courses 
              covering cybersecurity, ethical hacking, web development, cloud computing, AI/ML, and more. Our courses are designed by industry 
              experts who are actively working in the field, ensuring you learn the most current and relevant skills.
            </p>
            <p>
              What sets us apart is our commitment to <strong className="text-foreground">student success</strong>. We don't just provide videos - 
              we offer hands-on labs, real-world projects, personalized mentorship, and a supportive community. Our students don't just learn; 
              they build portfolios, earn certifications, and land jobs at leading tech companies.
            </p>
            <p>
              We measure our success by your success. That's why we offer a <strong className="text-foreground">100% money-back guarantee</strong>, 
              lifetime access to course materials, and continuous updates to keep pace with the rapidly evolving tech landscape.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-br from-card/50 to-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/40">
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Stand For</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do at CourseHub
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border-border/50 bg-card/80 backdrop-blur hover:border-accent/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 mx-auto">
                        <value.icon size={32} className="text-accent" weight="duotone" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/40">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet the Experts Behind CourseHub</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate educators and industry professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="border-border/50 bg-card/80 backdrop-blur hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-accent mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/40">
                Recognition
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Awards & Achievements</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50"
                >
                  <CheckCircle size={24} weight="fill" className="text-green-500 shrink-0 mt-1" />
                  <span className="text-sm md:text-base">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
