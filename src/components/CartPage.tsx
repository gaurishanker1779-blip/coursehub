import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Course } from '@/lib/types'
import { Trash, ShoppingCart } from '@phosphor-icons/react'

interface CartPageProps {
  cartItems: Course[]
  onRemoveFromCart: (courseId: string) => void
  onCheckout: () => void
  onNavigate: (page: string) => void
}

export function CartPage({ cartItems, onRemoveFromCart, onCheckout, onNavigate }: CartPageProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="py-12 sm:py-16 text-center px-4">
              <ShoppingCart size={48} className="mx-auto mb-4 text-muted-foreground sm:w-16 sm:h-16" weight="duotone" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Add some courses to get started with your learning journey
              </p>
              <Button onClick={() => onNavigate('courses')} className="bg-primary hover:bg-primary/90">
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <Badge variant="outline" className="text-xs border-accent/40 text-accent mb-2">
                              {item.category}
                            </Badge>
                            <h3 className="font-semibold text-base sm:text-lg line-clamp-2">{item.title}</h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-destructive hover:text-destructive shrink-0"
                          >
                            <Trash size={18} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className={
                              item.level === 'Beginner'
                                ? 'bg-green-500/20 text-green-300 border-green-500/40'
                                : item.level === 'Intermediate'
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                : 'bg-red-500/20 text-red-300 border-red-500/40'
                            }
                          >
                            {item.level}
                          </Badge>
                          <span className="text-lg sm:text-xl font-bold text-accent">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="border-border/50 bg-card/50 backdrop-blur lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">₹{total}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">₹{total}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button
                    onClick={onCheckout}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    onClick={() => onNavigate('courses')}
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                  >
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
