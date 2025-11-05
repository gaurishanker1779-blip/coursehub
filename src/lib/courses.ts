import { Course } from './types'

const categories = [
  'Ethical Hacking',
  'Penetration Testing',
  'Web Security',
  'Network Security',
  'Malware Analysis',
  'Cryptography',
  'Cloud Security',
  'Mobile Security',
  'OSINT',
  'Bug Bounty',
  'Incident Response',
  'Security Operations',
  'Forensics',
  'Social Engineering',
  'IoT Security'
]

const titles = [
  'Complete Guide to',
  'Mastering',
  'Advanced',
  'Professional',
  'Practical',
  'Ultimate',
  'Comprehensive',
  'Zero to Hero in',
  'Expert Level',
  'Hands-on'
]

const topics = [
  'SQL Injection',
  'XSS Attacks',
  'CSRF Protection',
  'Buffer Overflow',
  'Linux Exploitation',
  'Windows Privilege Escalation',
  'Active Directory Attacks',
  'Wireless Hacking',
  'Password Cracking',
  'Network Scanning',
  'Vulnerability Assessment',
  'Web Application Testing',
  'API Security',
  'Container Security',
  'Kubernetes Security',
  'AWS Security',
  'Azure Security',
  'Reverse Engineering',
  'Binary Exploitation',
  'Memory Forensics',
  'Threat Hunting',
  'SIEM Implementation',
  'IDS/IPS Setup',
  'Red Team Operations',
  'Blue Team Defense',
  'Purple Team Collaboration'
]

const prices = [99, 199, 299, 399, 499, 599, 149, 249, 349, 449, 549]

const courseImages = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
]

export function generateCourses(count: number = 500): Course[] {
  const courses: Course[] = []
  
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length]
    const titlePrefix = titles[Math.floor(Math.random() * titles.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const price = prices[Math.floor(Math.random() * prices.length)]
    const level = ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)] as Course['level']
    const imageIndex = i % courseImages.length
    
    courses.push({
      id: `course-${i + 1}`,
      title: `${titlePrefix} ${topic}`,
      description: `Learn ${topic.toLowerCase()} from industry experts with real-world examples and hands-on labs. This comprehensive course covers everything you need to master ${topic.toLowerCase()} in ${category.toLowerCase()}.`,
      category,
      price,
      level,
      thumbnail: courseImages[imageIndex],
      courseLink: `https://example.com/course/${i + 1}`,
      rating: (4 + Math.random()).toFixed(1),
      students: Math.floor(Math.random() * 10000) + 500,
      duration: `${Math.floor(Math.random() * 20) + 5} hours`,
      instructor: 'Expert Instructor'
    })
  }
  
  return courses
}
