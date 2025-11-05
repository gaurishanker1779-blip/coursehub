# Planning Guide

A premium, professional course marketplace platform where users can browse 500+ cybersecurity and tech courses with stunning visuals, purchase individual courses or membership plans through animated interfaces, and access their learning materials through a personalized dashboard with admin-controlled payment verification - featuring 3D/2D animations, testimonials, and enterprise-grade design.

**Experience Qualities**: 
1. **Premium & Professional** - Enterprise-grade design with polished UI, smooth animations, and high-quality imagery that instills confidence and credibility
2. **Engaging & Delightful** - Purposeful 3D/2D animations, interactive micro-interactions, and visual feedback that create memorable experiences
3. **Trustworthy & Transparent** - Clear pricing, testimonials, trust badges, money-back guarantee, and secure payment verification workflow

**Complexity Level**: Complex Application (advanced functionality, accounts)
  - Multi-role system (users and admin), authentication, payment workflow management, extensive course catalog with advanced filtering/search, membership tiers, 3D/2D animations, testimonials carousel, and complete CRUD operations for course access management

## Essential Features

### User Authentication
- **Functionality**: Complete sign-up/sign-in system with email and password
- **Purpose**: Secure user accounts and personalize course access
- **Trigger**: User clicks "Sign In" or "Sign Up" button
- **Progression**: Click auth button → Enter credentials → Validate → Redirect to dashboard/landing
- **Success criteria**: Users can create accounts, log in, and maintain sessions across visits

### Course Catalog & Browse
- **Functionality**: Display 500+ courses with professional images, ratings, student counts, duration, thumbnails, and pricing
- **Purpose**: Allow users to discover and select courses that match their interests
- **Trigger**: User lands on platform or navigates to courses page
- **Progression**: View landing → Browse courses → Filter/search by category/level → View course details → Add to cart
- **Success criteria**: All courses visible with real images, filterable, searchable with clear pricing and ratings

### Payment Request System
- **Functionality**: Users submit payment proof (UPI) and request approval for course/membership access
- **Purpose**: Enable purchases while maintaining admin verification control
- **Trigger**: User completes checkout with course/membership selection
- **Progression**: Select item → Proceed to checkout → View QR code → Upload/confirm payment → Submit request → Wait for approval
- **Success criteria**: Payment requests created with "pending" status, visible to admin

### Admin Panel
- **Functionality**: Secure dashboard (username: adarsh, password: Adarshkosta@1) to view and approve/reject payment requests
- **Purpose**: Maintain payment verification control and grant course access
- **Trigger**: Admin logs in with credentials
- **Progression**: Admin login → View pending requests → Review payment proof → Approve/reject → User gets access
- **Success criteria**: Admin can see all requests, approve them, and users immediately gain access

### User Dashboard (My Courses)
- **Functionality**: Personalized area showing purchased/approved courses with access links
- **Purpose**: Centralized learning hub for enrolled courses
- **Trigger**: User logs in and navigates to "My Courses"
- **Progression**: Login → View dashboard → See approved courses → Click "View Course" → Access content link
- **Success criteria**: Only approved courses visible with working access links

### Membership Plans
- **Functionality**: Subscription tiers with animated cards (7-day: ₹299, monthly: ₹999, yearly: ₹8999) granting access to all courses
- **Purpose**: Provide bulk access option and recurring revenue model
- **Trigger**: User views membership page or sees membership CTA
- **Progression**: View plans → Select tier → Checkout → Payment request → Admin approval → All courses unlocked
- **Success criteria**: Membership grants access to entire catalog after approval

### Landing Page Enhancements
- **Functionality**: Eye-catching hero with animations, stats counter, 3 key benefits, testimonials carousel, trust badges
- **Purpose**: Build trust, showcase value, and convert visitors to users
- **Trigger**: User visits homepage
- **Progression**: View hero → See stats → Read benefits → View testimonials → Click CTA
- **Success criteria**: Engaging first impression with smooth animations and clear value proposition

## Edge Case Handling
- **Duplicate sign-ups**: Prevent duplicate email registrations, show "already registered" message
- **Logged-out access**: Redirect to sign-in for protected pages (dashboard, checkout, my courses)
- **Invalid admin credentials**: Show error message, prevent access to admin panel
- **Expired sessions**: Auto-logout after period, require re-authentication
- **Empty states**: Show helpful messages for no courses, no purchases, no pending requests
- **Payment rejection**: Allow users to resubmit payment requests with updated information
- **Image loading**: Graceful fallbacks for course images that fail to load
- **Mobile navigation**: Hamburger menu with smooth animations for mobile devices

## Design Direction
The design should evoke premium quality, professionalism, and innovation - feeling like a cutting-edge enterprise learning platform with purposeful 3D/2D animations that guide attention and enhance usability, rich interface with stunning visuals and smooth micro-interactions that delight without distraction.

## Color Selection
Triadic color scheme using deep purples, vibrant cyans, and energetic accents to convey innovation, technology, and premium quality while maintaining excellent readability.

- **Primary Color**: Deep Purple (oklch(0.45 0.15 290)) - Conveys sophistication, innovation, and premium quality; used for primary CTAs and brand elements
- **Secondary Colors**: Dark Slate (oklch(0.25 0.02 260)) for backgrounds creating depth; Cyan Blue (oklch(0.65 0.15 220)) for secondary actions and info highlights
- **Accent Color**: Electric Cyan (oklch(0.75 0.18 200)) - High-energy highlight for CTAs, course cards, and interactive elements with gradient animations
- **Foreground/Background Pairings**:
  - Background (Deep Slate oklch(0.12 0.02 260)): White text (oklch(0.98 0 0)) - Ratio 16.2:1 ✓
  - Card (Dark Surface oklch(0.18 0.03 265)): Off-white text (oklch(0.95 0.01 270)) - Ratio 14.8:1 ✓
  - Primary (Deep Purple oklch(0.45 0.15 290)): White text (oklch(1 0 0)) - Ratio 7.2:1 ✓
  - Secondary (Medium Slate oklch(0.35 0.04 265)): White text (oklch(0.98 0 0)) - Ratio 9.1:1 ✓
  - Accent (Electric Cyan oklch(0.75 0.18 200)): Dark text (oklch(0.15 0.02 260)) - Ratio 12.3:1 ✓
  - Muted (Dim Slate oklch(0.30 0.03 260)): Light gray text (oklch(0.85 0.01 265)) - Ratio 8.4:1 ✓

## Font Selection
Typefaces should communicate modern professionalism with excellent screen readability, using Inter font family for clean geometric appearance that projects confidence and authority with excellent legibility across all screen sizes.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold/56-72px/tight (-0.02em) - Landing page hero with gradient animation
  - H2 (Section Headers): Inter Bold/40-48px/tight (-0.01em) - Major sections with gradient text
  - H3 (Card Titles): Inter SemiBold/20-24px/normal - Course cards, feature titles
  - H4 (Subsections): Inter SemiBold/18-20px/normal - Category headers, dashboard sections
  - Body (Paragraphs): Inter Regular/16-18px/relaxed (1.6) - Descriptions, content
  - Small (Meta): Inter Regular/14px/normal - Prices, dates, ratings, secondary info
  - Button Text: Inter SemiBold/16px/tight - All CTA buttons with gradient backgrounds

## Animations
Purposeful 3D/2D animations throughout that enhance usability and create delight - parallax hero backgrounds, floating particles, card lift animations on hover, smooth page transitions, testimonial carousel with fade effects, gradient animations on text, and satisfying button feedback.

- **Purposeful Meaning**: 
  - Hero parallax creates depth and engagement
  - Floating particles add life to backgrounds
  - Card hover lifts (y: -8px, scale: 1.02) invite exploration
  - Button scale feedback (0.95) confirms actions
  - Staggered entrance animations establish hierarchy
  - Gradient text animations draw attention to CTAs
  - Smooth page transitions maintain context
  
- **Hierarchy of Movement**: 
  - Hero elements fade in first with parallax
  - Stats counter animates with spring physics
  - Course cards appear with staggered delays (50ms each)
  - Hover states respond within 300ms
  - Page transitions use 600ms duration
  - Micro-interactions complete in 200-400ms

## Component Selection
- **Components**: 
  - Card (course display with professional images, ratings, hover effects, gradient borders)
  - Button (gradient CTAs, hover scale effects, shadow transitions)
  - Dialog (payment QR display, course details modal, confirmation dialogs)
  - Input, Label, Form (enhanced with focus rings, animations)
  - Tabs (membership plans, course categories, dashboard sections)
  - Badge (gradient backgrounds, course difficulty, "NEW" indicator, trust badges)
  - Table (admin panel request management)
  - Avatar (user profile display with hover effects)
  - Separator (visual section breaks with gradients)
  - Scroll-area (course list overflow)
  
- **Customizations**: 
  - Gradient card backgrounds with hover glow effects
  - Professional course images from Unsplash
  - Animated testimonial carousel with dots navigation
  - Floating particle backgrounds
  - Parallax hero section
  - Animated gradient text
  - 3D card lift animations
  - Mobile hamburger menu with smooth slide animations
  - Custom trust badge section
  - Stats counter with spring animations
  
- **States**: 
  - Buttons: Gradient backgrounds, hover lifts with enhanced shadow, active scales down, disabled reduces opacity
  - Cards: Subtle border, hover lifts (y: -8px) with enhanced glow, gradient border on popular items
  - Inputs: Gray border, focus shows accent ring with glow, error shows destructive red
  - Navigation: Active tab indicator with layoutId animation
  
- **Icon Selection**: 
  - ShoppingCart (cart with badge counter), User (profile), SignOut (logout), Shield (admin/security), CheckCircle (approved), Clock (pending), BookOpen (courses), Crown (premium), Play (start learning), Star (ratings), Lightning (speed), Infinity (unlimited), Trophy (achievement), MagnifyingGlass (search), Funnel (filters)
  
- **Spacing**: 
  - Container padding: px-6 md:px-12 lg:px-24
  - Section gaps: py-24 (major sections), py-12 (subsections)
  - Card grids: gap-6 md:gap-8 (course cards)
  - Form elements: space-y-4
  - Button padding: px-10 py-7 (hero CTAs), px-6 py-3 (secondary)
  
- **Mobile**: 
  - Hero text scales from 36px to 72px at breakpoints
  - Course grid: 1 column mobile, 2 at md, 3 at lg, 4 at xl
  - Navigation collapses to animated hamburger menu below 768px
  - Admin table switches to card layout on mobile
  - Touch-friendly buttons (min 44px height)
  - Optimized animations for mobile performance
