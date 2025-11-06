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

const prices = [99, 199, 299, 399, 499, 599, 699, 799, 899, 999, 1099, 1199, 1299, 1399, 1499]

const pythonCourseDetails = {
  title: 'Python Full Stack Web Development',
  description: 'Complete course covering Python, Django, Flask, React, databases, and deployment. Build real-world projects and launch your web development career.',
  duration: '50+ Hours',
  projects: '10+ Projects',
  curriculum: [
    'Python Fundamentals & Advanced Concepts',
    'Object-Oriented Programming in Python',
    'Django Framework - Backend Development',
    'Flask Microservices & REST APIs',
    'React.js - Modern Frontend Development',
    'Database Design & Management (SQL & NoSQL)',
    'User Authentication & Authorization',
    'Building Real-World Full Stack Applications',
    'API Integration & Third-Party Services',
    'Deployment & DevOps (AWS, Heroku, Docker)',
    'Testing & Debugging Best Practices',
    'Version Control with Git & GitHub',
    'Final Capstone Project'
  ],
  whatYouLearn: [
    'Master Python programming from basics to advanced',
    'Build complete web applications with Django and Flask',
    'Create modern, responsive frontends with React',
    'Design and manage databases effectively',
    'Implement secure user authentication systems',
    'Deploy applications to production servers',
    'Work with APIs and integrate third-party services',
    'Follow industry best practices and coding standards',
    'Build 10+ real-world projects for your portfolio',
    'Get lifetime access to all course materials',
    'Earn a certificate of completion'
  ]
}

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
  
  courses.push({
    id: 'course-1',
    title: pythonCourseDetails.title,
    description: pythonCourseDetails.description,
    category: 'Free Courses',
    price: 0,
    isFree: true,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    courseLink: 'https://mega.nz/folder/python-full-stack',
    rating: '4.9',
    students: 15420,
    duration: pythonCourseDetails.duration,
    instructor: 'Expert Instructor',
    curriculum: pythonCourseDetails.curriculum,
    whatYouLearn: pythonCourseDetails.whatYouLearn
  })
  
  for (let i = 1; i < count; i++) {
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
      isFree: false,
      level,
      thumbnail: courseImages[imageIndex],
      courseLink: `https://mega.nz/folder/${i + 1}`,
      rating: (4 + Math.random()).toFixed(1),
      students: Math.floor(Math.random() * 10000) + 500,
      duration: `${Math.floor(Math.random() * 20) + 5} hours`,
      instructor: 'Expert Instructor'
    })
  }
  
  return courses
}
