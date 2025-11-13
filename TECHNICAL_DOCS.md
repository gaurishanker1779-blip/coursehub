# Supabase Database Integration - Technical Documentation

## Overview

This application has been fully integrated with Supabase as the primary database backend, replacing the previous browser-based `useKV` storage system. All user data, payment requests, and course enrollments are now persisted in a PostgreSQL database hosted on Supabase.

## What Changed

### Before (useKV)
- Data stored only in browser localStorage
- Data lost when clearing browser data
- No cross-device access
- No real-time synchronization
- Limited scalability

### After (Supabase)
- Data stored in cloud PostgreSQL database
- Persistent across devices and browsers
- Real-time synchronization across all clients
- Scalable and production-ready
- Admin can access all data from dashboard

## Architecture

### Database Tables

#### 1. **users**
Stores all user accounts and membership information.

```typescript
{
  id: string              // Unique user identifier
  email: string           // User email (unique)
  password: string        // User password (plain text - should be hashed in production)
  name: string            // User full name
  is_admin: boolean       // Admin flag
  membership_type: string // 'weekly' | 'monthly' | 'yearly'
  membership_expires_at: timestamp
  membership_active: boolean
  phone: string
  country: string
  created_at: timestamp
}
```

#### 2. **payment_requests**
Tracks all payment requests for courses and memberships.

```typescript
{
  id: string
  user_id: string         // Foreign key to users.id
  user_email: string
  type: string            // 'course' | 'membership'
  amount: decimal
  course_id: string       // Course being purchased
  membership_type: string // If type === 'membership'
  status: string          // 'pending' | 'approved' | 'rejected'
  customer_info: jsonb    // Checkout form data
  created_at: timestamp
  updated_at: timestamp
}
```

#### 3. **free_course_enrollments**
Tracks user enrollments in free courses.

```typescript
{
  id: string
  user_id: string         // Foreign key to users.id
  course_id: string
  enrolled_at: timestamp
}
```

### React Hooks

#### **useAuth** (`src/hooks/use-auth.ts`)
Manages user authentication with Supabase backend.

**Key Methods:**
- `signUp(email, password, name)` - Creates new user account
- `signIn(email, password)` - Authenticates existing user
- `adminSignIn(username, password)` - Admin authentication (local only)
- `signOut()` - Logs out current user
- `updateUserMembership(userId, membership)` - Updates membership status
- `updateUserCheckoutInfo(userId, customerInfo)` - Stores checkout details

**State:**
- `authState` - Current authentication state
- `users` - Array of all users (for admin)
- `loading` - Loading indicator

#### **usePaymentRequests** (`src/hooks/use-payment-requests.ts`)
Manages payment request workflow with real-time updates.

**Key Methods:**
- `createPaymentRequest(...)` - Creates new payment request
- `approvePaymentRequest(requestId)` - Approves pending request
- `rejectPaymentRequest(requestId)` - Rejects pending request
- `getUserPurchasedCourses(userId)` - Gets user's purchased courses
- `getPendingRequests()` - Gets all pending requests (admin)
- `getUserRequests(userId)` - Gets user's own requests

**Features:**
- Real-time subscription to payment_requests table
- Automatic UI updates when payments are approved/rejected
- Derived purchased courses list from approved requests

#### **useFreeCourses** (`src/hooks/use-free-courses.ts`)
Manages free course enrollments.

**Key Methods:**
- `enrollInFreeCourse(userId, courseId)` - Enrolls user in free course
- `getUserEnrolledCourses(userId)` - Gets user's enrolled courses
- `isEnrolledInCourse(userId, courseId)` - Checks enrollment status

**Features:**
- Real-time subscription to enrollment changes
- Duplicate enrollment prevention

### Real-time Subscriptions

The application uses Supabase's real-time features to automatically sync data:

```typescript
// Example from use-payment-requests.ts
const subscription = supabase
  .channel('payment_requests_changes')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'payment_requests' 
  }, () => {
    loadPaymentRequests() // Reload data when changes occur
  })
  .subscribe()
```

**Benefits:**
- Admin sees new payment requests immediately
- Users see approved payments reflected instantly
- Multiple admin users can work simultaneously
- No manual refresh needed

### Session Management

User sessions are stored in localStorage for persistence:

```typescript
// From use-auth.ts
const [currentSession, setCurrentSession] = useState<AuthState>(() => {
  const stored = localStorage.getItem('current-session')
  return stored ? JSON.parse(stored) : DEFAULT_AUTH_STATE
})

useEffect(() => {
  localStorage.setItem('current-session', JSON.stringify(currentSession))
}, [currentSession])
```

## Data Flow Examples

### User Sign-Up Flow

1. User fills sign-up form
2. `SignUpPage` calls `onSignUp(email, password, name)`
3. `useAuth.signUp()` executes:
   ```typescript
   - Check if email exists in Supabase
   - If not, insert new user into 'users' table
   - Store user in local session
   - Reload users list
   ```
4. User redirected to home page

### Payment Approval Flow

1. Admin opens admin panel
2. `usePaymentRequests` loads all requests and subscribes to changes
3. Admin clicks "Approve" on pending request
4. `approvePaymentRequest(requestId)` executes:
   ```typescript
   - Update status to 'approved' in Supabase
   - If membership: update user's membership in 'users' table
   - Real-time subscription triggers reload
   - UI updates automatically
   ```
5. User sees approved course in "My Courses"

### Free Course Enrollment

1. User clicks "Free Access" on course
2. `handleFreeAccess()` calls `enrollInFreeCourse(userId, courseId)`
3. Hook executes:
   ```typescript
   - Check if already enrolled
   - Insert enrollment into 'free_course_enrollments' table
   - Reload enrollments
   - Show success toast
   ```
4. Course appears in user's "My Courses"

## Environment Configuration

### Required Environment Variables

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Configuration Files

- `.env` - Contains actual credentials (DO NOT COMMIT)
- `.env.example` - Template for other developers
- `.gitignore` - Excludes .env from version control

## Security Considerations

### ⚠️ Current Implementation

1. **Passwords stored in plain text** - Production apps should use bcrypt or Argon2
2. **Permissive RLS policies** - Allow full CRUD for development
3. **API key in code** - Using anon key (safe for client-side)

### 🔒 Production Recommendations

1. **Use Supabase Auth** instead of custom authentication
2. **Hash all passwords** before storing
3. **Tighten RLS policies** to restrict access by user_id
4. **Implement rate limiting** on authentication endpoints
5. **Add email verification** for sign-ups
6. **Use secure session tokens** instead of localStorage
7. **Implement CSRF protection**
8. **Add input validation** on all database operations

### Row Level Security (RLS)

Current policies allow all operations for development. For production:

```sql
-- Example: Users can only read their own data
CREATE POLICY "Users can view own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

-- Example: Only admins can approve payments
CREATE POLICY "Only admins can approve" 
  ON payment_requests FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'admin');
```

## Database Queries

### Common Patterns

**Read user by email:**
```typescript
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single()
```

**Insert new record:**
```typescript
const { data } = await supabase
  .from('users')
  .insert([{ id, email, password, name }])
  .select()
  .single()
```

**Update record:**
```typescript
await supabase
  .from('payment_requests')
  .update({ status: 'approved' })
  .eq('id', requestId)
```

**Query with filter:**
```typescript
const { data } = await supabase
  .from('payment_requests')
  .select('*')
  .eq('status', 'pending')
  .order('created_at', { ascending: false })
```

## Testing the Integration

### 1. Create Test User
```bash
1. Go to Sign Up page
2. Create account: test@example.com / password123
3. Check Supabase Table Editor → users table
4. Verify new row exists
```

### 2. Test Free Course Enrollment
```bash
1. Sign in as test user
2. Browse to free course
3. Click "Free Access"
4. Check free_course_enrollments table
5. Verify enrollment record exists
```

### 3. Test Payment Request
```bash
1. Add course to cart
2. Proceed to checkout
3. Complete payment form
4. Check payment_requests table
5. Verify pending request exists
```

### 4. Test Admin Approval
```bash
1. Sign in as admin (adarsh / Adarshkosta@1)
2. See pending request in admin panel
3. Click Approve
4. Verify status changed to 'approved' in database
5. Sign in as user - course should appear in My Courses
```

### 5. Test Real-time Updates
```bash
1. Open admin panel in one browser
2. Open user account in another browser
3. Create payment request from user browser
4. Watch it appear in admin panel WITHOUT refresh
5. Approve in admin panel
6. Watch status update in user browser WITHOUT refresh
```

## Troubleshooting

### Common Issues

**Error: Missing Supabase environment variables**
- Check `.env` file exists
- Verify variable names start with `VITE_`
- Restart dev server after adding variables

**Error: RLS policy violation**
- Check if RLS is enabled on table
- Verify policies exist (see supabase-schema.sql)
- Check policy conditions match your query

**Data not syncing in real-time**
- Verify realtime is enabled for table
- Check subscription is created in useEffect
- Ensure cleanup function unsubscribes

**Authentication fails**
- Clear localStorage
- Check user exists in database
- Verify password matches exactly

## Migration Notes

### Data Migration

If you have existing data in `useKV` (localStorage):

1. Export data from browser console:
```javascript
console.log(localStorage.getItem('users-database'))
console.log(localStorage.getItem('paymentRequests'))
console.log(localStorage.getItem('enrolledFreeCourses'))
```

2. Parse and transform for Supabase schema
3. Insert via SQL Editor or API
4. Clear localStorage to start fresh

### Breaking Changes

- All auth hooks now return Promises (async)
- `useAuth` has `loading` property
- Cart items now use localStorage (not Supabase)
- Session stored in localStorage (not useKV)

## Performance Considerations

### Optimizations Implemented

1. **Indexed columns** for faster queries (email, user_id, status)
2. **Real-time subscriptions** prevent unnecessary polling
3. **Select specific columns** instead of `SELECT *` where possible
4. **Cached user lists** in admin panel

### Future Optimizations

1. Implement pagination for large course lists
2. Add caching layer for frequently accessed data
3. Use Supabase Edge Functions for complex queries
4. Implement optimistic UI updates
5. Add query debouncing for search

## Next Steps

### Recommended Improvements

1. **Migrate to Supabase Auth**
   - Use built-in auth system
   - Get magic links, OAuth, etc.
   - Better security out of the box

2. **Add File Storage**
   - Store course thumbnails in Supabase Storage
   - Upload user avatars
   - Store payment screenshots

3. **Implement Analytics**
   - Track course views
   - Monitor enrollment rates
   - Payment conversion metrics

4. **Add Email Notifications**
   - Payment approval notifications
   - Welcome emails
   - Course completion certificates

5. **Enhance Admin Features**
   - Bulk approve payments
   - Export payment reports
   - User management (suspend, delete)
   - Analytics dashboard

## Support

For Supabase-specific questions:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

For application-specific issues:
- Check `SUPABASE_SETUP.md` for setup instructions
- Review `supabase-schema.sql` for database structure
- Check browser console for error messages
