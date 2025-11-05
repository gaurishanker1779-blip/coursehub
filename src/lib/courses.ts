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

const prices = [199, 299, 399, 499, 599, 259, 359, 459, 559]

export function generateCourses(count: number = 500): Course[] {
  const courses: Course[] = []
  
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length]
    const titlePrefix = titles[Math.floor(Math.random() * titles.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const price = prices[Math.floor(Math.random() * prices.length)]
    const level = ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)] as Course['level']
    
    courses.push({
      id: `course-${i + 1}`,
      title: `${titlePrefix} ${topic}`,
      description: `Learn ${topic.toLowerCase()} from industry experts with real-world examples and hands-on labs. This comprehensive course covers everything you need to master ${topic.toLowerCase()} in ${category.toLowerCase()}.`,
      category,
      price,
      level,
      thumbnail: `https://picsum.photos/seed/${i + 1}/400/300`,
      courseLink: `https://example.com/course/${i + 1}`
    })
  }
  
  return courses
}
