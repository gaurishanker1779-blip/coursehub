import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface SignInPageProps {
  onSignIn: (email: string, password: string) => { success: boolean; message: string }
  onAdminSignIn: (username: string, password: string) => { success: boolean; message: string }
  onNavigate: (page: string) => void
}

export function SignInPage({ onSignIn, onAdminSignIn, onNavigate }: SignInPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    let result
    if (isAdmin) {
      result = onAdminSignIn(email, password)
    } else {
      result = onSignIn(email, password)
    }

    if (result.success) {
      toast.success(result.message)
      onNavigate(isAdmin ? 'admin' : 'home')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isAdmin ? 'Admin Sign In' : 'Sign In'}
          </CardTitle>
          <CardDescription>
            {isAdmin ? 'Enter your admin credentials' : 'Enter your email and password to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{isAdmin ? 'Username' : 'Email'}</Label>
              <Input
                id="email"
                type={isAdmin ? 'text' : 'email'}
                placeholder={isAdmin ? 'Enter username' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsAdmin(!isAdmin)}
            >
              {isAdmin ? 'Sign in as User' : 'Sign in as Admin'}
            </Button>

            {!isAdmin && (
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-accent hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
