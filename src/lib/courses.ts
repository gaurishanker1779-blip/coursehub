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

const freeCourseDetails = {
  python: {
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
  },
  javascript: {
    title: 'JavaScript Complete Course - Beginner to Advanced',
    description: 'Master JavaScript from scratch! Learn ES6+, DOM manipulation, async programming, APIs, and modern frameworks. Build 15+ real projects.',
    duration: '60+ Hours',
    projects: '15+ Projects',
    curriculum: [
      'JavaScript Fundamentals & Syntax',
      'ES6+ Modern JavaScript Features',
      'DOM Manipulation & Events',
      'Async JavaScript - Promises & Async/Await',
      'Working with APIs & AJAX',
      'Object-Oriented Programming in JavaScript',
      'Functional Programming Concepts',
      'JavaScript Design Patterns',
      'Error Handling & Debugging',
      'Local Storage & Session Storage',
      'Introduction to TypeScript',
      'Node.js Basics',
      'Building Interactive Web Applications',
      'Performance Optimization Techniques',
      'Final Real-World Projects'
    ],
    whatYouLearn: [
      'Master JavaScript from absolute basics to advanced',
      'Build dynamic and interactive web applications',
      'Work with modern ES6+ features and syntax',
      'Handle asynchronous operations like a pro',
      'Integrate with REST APIs and external services',
      'Implement OOP and functional programming patterns',
      'Debug and optimize JavaScript code',
      'Build 15+ hands-on projects',
      'Prepare for React, Vue, and Angular',
      'Get lifetime access and updates',
      'Certificate of completion included'
    ]
  },
  cybersecurity: {
    title: 'Cybersecurity & Ethical Hacking Full Course',
    description: 'Complete ethical hacking bootcamp! Learn penetration testing, network security, web app hacking, and secure your digital world.',
    duration: '80+ Hours',
    projects: '20+ Labs',
    curriculum: [
      'Introduction to Cybersecurity & Ethics',
      'Networking Fundamentals for Hackers',
      'Linux for Ethical Hacking',
      'Information Gathering & Reconnaissance',
      'Scanning & Enumeration Techniques',
      'Vulnerability Analysis & Assessment',
      'System Hacking & Exploitation',
      'Malware Threats & Analysis',
      'Sniffing & Man-in-the-Middle Attacks',
      'Social Engineering Techniques',
      'Web Application Penetration Testing',
      'SQL Injection & XSS Attacks',
      'Wireless Network Hacking',
      'Cryptography & Encryption',
      'Incident Response & Forensics',
      'Cloud Security Fundamentals',
      'Bug Bounty Hunting',
      'Security Tools: Metasploit, Burp Suite, Nmap',
      'Building a Career in Cybersecurity',
      'Final Penetration Testing Project'
    ],
    whatYouLearn: [
      'Master ethical hacking from ground up',
      'Perform professional penetration testing',
      'Identify and exploit security vulnerabilities',
      'Secure networks and web applications',
      'Use industry-standard hacking tools',
      'Understand cryptography and encryption',
      'Conduct wireless network security audits',
      'Start a career in cybersecurity',
      'Build a professional hacking lab',
      'Earn recognized certification',
      'Join the bug bounty community'
    ]
  },
  allinone: {
    title: 'All-in-One Programming Masterclass',
    description: 'The ultimate programming bundle! Learn Python, JavaScript, Java, C++, databases, web dev, mobile apps, and more in one complete course.',
    duration: '100+ Hours',
    projects: '30+ Projects',
    curriculum: [
      'Programming Fundamentals & Logic',
      'Python - From Basics to Advanced',
      'JavaScript & Modern Web Development',
      'Java - Object-Oriented Programming',
      'C++ - Systems Programming',
      'HTML5, CSS3 & Responsive Design',
      'React.js & Modern Frontend',
      'Node.js & Express Backend',
      'SQL & NoSQL Databases',
      'Git & GitHub Version Control',
      'Data Structures & Algorithms',
      'API Development & Integration',
      'Mobile App Development Basics',
      'Cloud Computing Fundamentals',
      'DevOps & CI/CD Introduction',
      'Software Testing & Quality Assurance',
      'Design Patterns & Best Practices',
      'Building E-commerce Applications',
      'Building Social Media Apps',
      'Final Capstone Multi-Platform Project'
    ],
    whatYouLearn: [
      'Master 5+ programming languages',
      'Build full-stack web applications',
      'Create mobile apps and desktop software',
      'Work with multiple databases',
      'Implement data structures and algorithms',
      'Use Git for professional version control',
      'Deploy applications to the cloud',
      'Build 30+ diverse projects',
      'Prepare for technical interviews',
      'Start freelancing or get hired',
      'Lifetime access to all content',
      'Multiple certificates of completion'
    ]
  }
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
    title: freeCourseDetails.python.title,
    description: freeCourseDetails.python.description,
    category: 'Free Courses',
    price: 0,
    isFree: true,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    courseLink: 'https://mega.nz/folder/CJxVRLgA#GCMngA08ukSDoGmbHtFp9g',
    rating: '4.9',
    students: 15420,
    duration: freeCourseDetails.python.duration,
    instructor: 'Expert Instructor',
    curriculum: freeCourseDetails.python.curriculum,
    whatYouLearn: freeCourseDetails.python.whatYouLearn
  })

  courses.push({
    id: 'course-2',
    title: freeCourseDetails.javascript.title,
    description: freeCourseDetails.javascript.description,
    category: 'Free Courses',
    price: 0,
    isFree: true,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
    courseLink: 'https://mega.nz/folder/javascript-complete',
    rating: '4.8',
    students: 12850,
    duration: freeCourseDetails.javascript.duration,
    instructor: 'Expert Instructor',
    curriculum: freeCourseDetails.javascript.curriculum,
    whatYouLearn: freeCourseDetails.javascript.whatYouLearn
  })

  courses.push({
    id: 'course-3',
    title: freeCourseDetails.cybersecurity.title,
    description: freeCourseDetails.cybersecurity.description,
    category: 'Free Courses',
    price: 0,
    isFree: true,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    courseLink: 'https://mega.nz/folder/cybersecurity-ethical-hacking',
    rating: '5.0',
    students: 18920,
    duration: freeCourseDetails.cybersecurity.duration,
    instructor: 'Expert Instructor',
    curriculum: freeCourseDetails.cybersecurity.curriculum,
    whatYouLearn: freeCourseDetails.cybersecurity.whatYouLearn
  })

  courses.push({
    id: 'course-4',
    title: freeCourseDetails.allinone.title,
    description: freeCourseDetails.allinone.description,
    category: 'Free Courses',
    price: 0,
    isFree: true,
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    courseLink: 'https://mega.nz/folder/all-in-one-programming',
    rating: '4.9',
    students: 21340,
    duration: freeCourseDetails.allinone.duration,
    instructor: 'Expert Instructor',
    curriculum: freeCourseDetails.allinone.curriculum,
    whatYouLearn: freeCourseDetails.allinone.whatYouLearn
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
