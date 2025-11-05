import { Button } from '@/components/ui/button'
import { User, ShoppingCart, SignOut, Shield, List, X } from '@phosphor-icons/react'
import { AuthState } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface HeaderProps {
  authState: AuthState
  onSignOut: () => void
  onNavigate: (page: string) => void
  currentPage: string
  cartCount: number
}

export function Header({ authState, onSignOut, onNavigate, currentPage, cartCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16">
          <motion.button
            onClick={() => handleNavigate('home')}
            className="text-2xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CourseHub
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {['home', 'courses', 'membership'].map((page) => (
              <motion.button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`text-sm font-medium transition-colors relative ${
                  currentPage === page ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
                {currentPage === page && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[1.3rem] left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary"
                  />
                )}
              </motion.button>
            ))}
            {authState.isAuthenticated && !authState.isAdmin && (
              <motion.button
                onClick={() => handleNavigate('my-courses')}
                className={`text-sm font-medium transition-colors relative ${
                  currentPage === 'my-courses' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                My Courses
                {currentPage === 'my-courses' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[1.3rem] left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary"
                  />
                )}
              </motion.button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {!authState.isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigate('signin')}
                  className="hidden sm:inline-flex"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleNavigate('signup')}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-accent/50 transition-all duration-300"
                >
                  Sign Up
                </Button>
              </>
            ) : authState.isAdmin ? (
              <div className="flex items-center gap-3">
                <Shield className="text-accent" size={20} weight="fill" />
                <span className="text-sm font-medium hidden sm:inline">Admin</span>
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
                  <motion.button
                    onClick={() => handleNavigate('cart')}
                    className="relative p-2 hover:bg-muted rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShoppingCart size={20} />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  </motion.button>
                )}
                <motion.button
                  onClick={() => handleNavigate('my-courses')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User size={20} weight="fill" />
                </motion.button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                  className="hidden sm:inline-flex"
                >
                  <SignOut size={18} />
                </Button>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-3">
              <button
                onClick={() => handleNavigate('home')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  currentPage === 'home' ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate('courses')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  currentPage === 'courses' ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigate('membership')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  currentPage === 'membership' ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                }`}
              >
                Membership
              </button>
              {authState.isAuthenticated && !authState.isAdmin && (
                <button
                  onClick={() => handleNavigate('my-courses')}
                  className={`text-left py-2 px-4 rounded-lg transition-colors ${
                    currentPage === 'my-courses' ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  My Courses
                </button>
              )}
              {!authState.isAuthenticated && (
                <button
                  onClick={() => handleNavigate('signin')}
                  className="text-left py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors sm:hidden"
                >
                  Sign In
                </button>
              )}
              {authState.isAuthenticated && !authState.isAdmin && (
                <button
                  onClick={onSignOut}
                  className="text-left py-2 px-4 rounded-lg text-destructive hover:bg-destructive/10 transition-colors sm:hidden"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
