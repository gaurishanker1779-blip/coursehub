# Planning Guide

A comprehensive course marketplace platform where users can browse 500+ cybersecurity and tech courses, purchase individual courses or membership plans, and access their learning materials through a personalized dashboard with admin-controlled payment verification.

**Experience Qualities**: 
1. **Professional** - Enterprise-grade design with polished UI that instills confidence and credibility
2. **Streamlined** - Intuitive navigation from discovery to purchase to learning with minimal friction
3. **Trustworthy** - Clear pricing, transparent approval process, and secure payment verification workflow

**Complexity Level**: Complex Application (advanced functionality, accounts)
  - Multi-role system (users and admin), authentication, payment workflow management, extensive course catalog with filtering/search, membership tiers, and complete CRUD operations for course access management

## Essential Features

### User Authentication
- **Functionality**: Complete sign-up/sign-in system with email and password
- **Purpose**: Secure user accounts and personalize course access
- **Trigger**: User clicks "Sign In" or "Sign Up" button
- **Progression**: Click auth button → Enter credentials → Validate → Redirect to dashboard/landing
- **Success criteria**: Users can create accounts, log in, and maintain sessions across visits

### Course Catalog & Browse
- **Functionality**: Display 500+ courses with titles, descriptions, thumbnails, and pricing
- **Purpose**: Allow users to discover and select courses that match their interests
- **Trigger**: User lands on platform or navigates to courses page
- **Progression**: View landing → Browse courses → Filter/search → View course details → Add to cart
- **Success criteria**: All courses visible, filterable, searchable with clear pricing

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
- **Functionality**: Subscription tiers (7-day: ₹299, monthly, yearly) granting access to all courses
- **Purpose**: Provide bulk access option and recurring revenue model
- **Trigger**: User views membership page or sees membership CTA
- **Progression**: View plans → Select tier → Checkout → Payment request → Admin approval → All courses unlocked
- **Success criteria**: Membership grants access to entire catalog after approval

## Edge Case Handling
- **Duplicate sign-ups**: Prevent duplicate email registrations, show "already registered" message
- **Logged-out access**: Redirect to sign-in for protected pages (dashboard, checkout, my courses)
- **Invalid admin credentials**: Show error message, prevent access to admin panel
- **Expired sessions**: Auto-logout after period, require re-authentication
- **Empty states**: Show helpful messages for no courses, no purchases, no pending requests
- **Payment rejection**: Allow users to resubmit payment requests with updated information

## Design Direction
The design should evoke trust, professionalism, and modernity - feeling like a premium enterprise learning platform with smooth, purposeful animations that guide attention without distraction, rich but not cluttered interface with clear information hierarchy.

## Color Selection
Triadic color scheme using deep purples, vibrant cyans, and energetic accents to convey innovation, technology, and premium quality while maintaining excellent readability.

- **Primary Color**: Deep Purple (oklch(0.45 0.15 290)) - Conveys sophistication, innovation, and premium quality; used for primary CTAs and brand elements
- **Secondary Colors**: Dark Slate (oklch(0.25 0.02 260)) for backgrounds creating depth; Cyan Blue (oklch(0.65 0.15 220)) for secondary actions and info highlights
- **Accent Color**: Electric Cyan (oklch(0.75 0.18 200)) - High-energy highlight for CTAs, course cards, and interactive elements
- **Foreground/Background Pairings**:
  - Background (Deep Slate oklch(0.12 0.02 260)): White text (oklch(0.98 0 0)) - Ratio 16.2:1 ✓
  - Card (Dark Surface oklch(0.18 0.03 265)): Off-white text (oklch(0.95 0.01 270)) - Ratio 14.8:1 ✓
  - Primary (Deep Purple oklch(0.45 0.15 290)): White text (oklch(1 0 0)) - Ratio 7.2:1 ✓
  - Secondary (Medium Slate oklch(0.35 0.04 265)): White text (oklch(0.98 0 0)) - Ratio 9.1:1 ✓
  - Accent (Electric Cyan oklch(0.75 0.18 200)): Dark text (oklch(0.15 0.02 260)) - Ratio 12.3:1 ✓
  - Muted (Dim Slate oklch(0.30 0.03 260)): Light gray text (oklch(0.85 0.01 265)) - Ratio 8.4:1 ✓

## Font Selection
Typefaces should communicate modern professionalism with excellent screen readability, using a clean geometric sans-serif for headings that projects confidence and authority, paired with a highly legible humanist sans-serif for body text.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold/48px/tight (-0.02em) - Landing page hero
  - H2 (Section Headers): Inter SemiBold/36px/tight (-0.01em) - Major sections
  - H3 (Card Titles): Inter SemiBold/24px/normal - Course cards, feature titles
  - H4 (Subsections): Inter Medium/20px/normal - Category headers, dashboard sections
  - Body (Paragraphs): Inter Regular/16px/relaxed (1.6) - Descriptions, content
  - Small (Meta): Inter Regular/14px/normal - Prices, dates, secondary info
  - Button Text: Inter SemiBold/16px/tight - All CTA buttons

## Animations
Subtle, purposeful micro-interactions that enhance usability without calling attention to themselves - smooth page transitions, gentle hover states on cards, and satisfying button feedback that makes the interface feel responsive and alive.

- **Purposeful Meaning**: Smooth fade-ins on page load establish hierarchy, card lifts on hover invite exploration, button scale feedback confirms actions
- **Hierarchy of Movement**: Hero elements fade in first, followed by course cards in staggered sequence; payment approval status changes use smooth color transitions to communicate state

## Component Selection
- **Components**: 
  - Card (course display with image, title, price, hover effects)
  - Button (primary CTAs, secondary actions, ghost variants for navigation)
  - Dialog (payment QR display, course details modal, confirmation dialogs)
  - Input, Label, Form (sign in/up, admin login, payment confirmation)
  - Tabs (membership plans, course categories, dashboard sections)
  - Badge (course difficulty, "NEW" indicator, membership status, payment status)
  - Table (admin panel request management)
  - Avatar (user profile display)
  - Separator (visual section breaks)
  - Scroll-area (course list overflow)
  
- **Customizations**: 
  - Gradient card backgrounds for featured courses
  - Custom QR code placeholder component for payment display
  - Animated checkmark for approval confirmations
  - Price display component with currency formatting (₹)
  
- **States**: 
  - Buttons: Default has primary gradient, hover lifts with shadow, active scales down, disabled reduces opacity
  - Cards: Default has subtle border, hover lifts with glow effect, selected adds accent border
  - Inputs: Default gray border, focus shows accent ring with glow, error shows destructive red, success shows green
  
- **Icon Selection**: 
  - ShoppingCart (checkout), User (profile/auth), Lock (admin/security), CheckCircle (approved), Clock (pending), Book (courses), Crown (membership), Eye (view course), Plus/Minus (quantity), Filter (course filtering), Search (course search)
  
- **Spacing**: 
  - Container padding: px-6 md:px-12 lg:px-24
  - Section gaps: space-y-16 (major sections), space-y-8 (subsections)
  - Card grids: gap-6 (course cards)
  - Form elements: space-y-4
  - Button padding: px-6 py-3 (primary), px-4 py-2 (secondary)
  
- **Mobile**: 
  - Hero text scales from 32px to 48px at md breakpoint
  - Course grid: 1 column mobile, 2 at md, 3 at lg, 4 at xl
  - Navigation collapses to hamburger menu below 768px
  - Admin table switches to card layout on mobile
  - Fixed bottom nav for mobile course browsing with sticky checkout button
