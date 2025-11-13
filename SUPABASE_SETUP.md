# Supabase Database Setup Guide

## 🔴 CRITICAL SECURITY NOTICE

**WARNING**: Your Supabase API key has been exposed in this conversation. You **MUST** rotate your API key immediately before deploying this application.

### How to Rotate Your API Key:

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `tnayxpbyltuctsvtrdcv`
3. Navigate to **Settings** → **API**
4. Under "Project API keys", click **Reset** on the `anon` key
5. Copy the new key and update your `.env` file

## 📋 Setup Instructions

### Step 1: Set Up Supabase Database

1. **Open your Supabase project**:
   - Go to https://tnayxpbyltuctsvtrdcv.supabase.co
   - Or visit https://app.supabase.com and select your project

2. **Run the database schema**:
   - Navigate to the **SQL Editor** in your Supabase dashboard
   - Open the file `supabase-schema.sql` from this project
   - Copy all the SQL code
   - Paste it into the SQL Editor
   - Click **Run** to execute the schema

3. **Verify tables were created**:
   - Go to **Table Editor** in Supabase
   - You should see these tables:
     - `users`
     - `payment_requests`
     - `free_course_enrollments`

### Step 2: Configure Environment Variables

1. **Create your `.env` file**:
   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file** with your new credentials:
   ```env
   VITE_SUPABASE_URL=https://tnayxpbyltuctsvtrdcv.supabase.co
   VITE_SUPABASE_ANON_KEY=your-new-anon-key-here
   ```

3. **IMPORTANT**: Never commit the `.env` file to git. It's already in `.gitignore`.

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run the Application

```bash
npm run dev
```

## 🗄️ Database Schema

### Tables

#### `users`
Stores all user accounts including regular users and their membership information.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key, unique user ID |
| email | TEXT | User's email address (unique) |
| password | TEXT | User's password (hashed in production) |
| name | TEXT | User's full name |
| is_admin | BOOLEAN | Whether user has admin privileges |
| membership_type | TEXT | Type of membership (weekly/monthly/yearly) |
| membership_expires_at | TIMESTAMP | When membership expires |
| membership_active | BOOLEAN | Whether membership is currently active |
| phone | TEXT | User's phone number |
| country | TEXT | User's country/address |
| created_at | TIMESTAMP | Account creation timestamp |

#### `payment_requests`
Stores all payment requests for courses and memberships.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key, unique request ID |
| user_id | TEXT | References users.id |
| user_email | TEXT | User's email |
| type | TEXT | 'course' or 'membership' |
| amount | DECIMAL | Payment amount |
| course_id | TEXT | ID of course being purchased (if applicable) |
| membership_type | TEXT | Type of membership (if applicable) |
| status | TEXT | 'pending', 'approved', or 'rejected' |
| customer_info | JSONB | Customer checkout information |
| created_at | TIMESTAMP | Request creation time |
| updated_at | TIMESTAMP | Last update time |

#### `free_course_enrollments`
Tracks user enrollments in free courses.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key, unique enrollment ID |
| user_id | TEXT | References users.id |
| course_id | TEXT | ID of the enrolled course |
| enrolled_at | TIMESTAMP | Enrollment timestamp |

## 🔒 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies that allow:
- Read access for all authenticated users
- Insert/Update permissions as needed
- Automatic cascade deletes for related records

### Realtime Subscriptions
The application uses Supabase realtime to automatically sync data:
- Payment requests update in real-time
- Course enrollments sync instantly
- User data stays current across sessions

## 🚀 Features Implemented

### ✅ Complete Supabase Integration
- **Authentication**: User sign-up and sign-in stored in Supabase
- **Payment Tracking**: All payment requests stored in database
- **Course Enrollments**: Free course enrollments persisted
- **Admin Dashboard**: Real-time updates for admin panel
- **User Profiles**: Customer information and memberships

### ✅ Real-time Updates
- Payment requests update instantly in admin panel
- Course enrollments sync across sessions
- User membership status reflects immediately

### ✅ Data Persistence
- All user data persists between sessions
- Cart items, enrollments, and purchases stored securely
- No data loss on page refresh

## 📝 Migration from useKV

The application has been fully migrated from the local `useKV` storage to Supabase:

| Feature | Before (useKV) | After (Supabase) |
|---------|---------------|------------------|
| Users | Local browser storage | Supabase `users` table |
| Payments | Local browser storage | Supabase `payment_requests` table |
| Enrollments | Local browser storage | Supabase `free_course_enrollments` table |
| Persistence | Per-browser only | Cross-device, permanent |
| Real-time | Manual refresh | Automatic sync |

## 🛠️ Development

### Testing the Integration

1. **Create a test user**:
   - Sign up with a new account
   - Check Supabase Table Editor to see the user in `users` table

2. **Test course enrollment**:
   - Enroll in a free course
   - Verify entry appears in `free_course_enrollments` table

3. **Test payment flow**:
   - Add course to cart and checkout
   - Check `payment_requests` table for new entries
   - Login as admin and approve payment
   - Verify status updates in real-time

### Admin Access

Username: `adarsh`
Password: `Adarshkosta@1`

## ⚠️ Important Notes

1. **Security**: This implementation stores passwords in plain text. For production, implement proper password hashing (bcrypt, Argon2, etc.).

2. **API Keys**: The current `.env` file contains exposed credentials. These MUST be rotated before deployment.

3. **RLS Policies**: Current policies are permissive for development. Tighten them for production.

4. **Session Management**: Consider implementing Supabase Auth for more secure authentication in production.

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime Subscriptions](https://supabase.com/docs/guides/realtime)
