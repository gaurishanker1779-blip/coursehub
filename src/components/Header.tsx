import { Button } from '@/components/ui/button'
import { User, ShoppingCart, SignOut, Shield } from '@phosphor-icons/react'
import { AuthState } from '@/lib/types'

interface HeaderProps {
  authState: AuthState
  onSignOut: () => void
  onNavigate: (page: string) => void
  currentPage: string
  cartCount: number
}

export function Header({ authState, onSignOut, onNavigate, currentPage, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            CourseHub
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                currentPage === 'home' ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                currentPage === 'courses' ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => onNavigate('membership')}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                currentPage === 'membership' ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              Membership
            </button>
            {authState.isAuthenticated && !authState.isAdmin && (
              <button
                onClick={() => onNavigate('my-courses')}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  currentPage === 'my-courses' ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                My Courses
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {!authState.isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('signin')}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('signup')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </>
            ) : authState.isAdmin ? (
              <div className="flex items-center gap-3">
                <Shield className="text-accent" size={20} weight="fill" />
                <span className="text-sm font-medium">Admin</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                >
                  <SignOut size={18} />
                </Button>
              </div>
            ) : (
              <>
                {cartCount > 0 && (
                  <button
                    onClick={() => onNavigate('cart')}
                    className="relative p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('my-courses')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <User size={20} weight="fill" />
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                >
                  <SignOut size={18} />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
