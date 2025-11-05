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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="py-16 text-center">
              <ShoppingCart size={64} className="mx-auto mb-4 text-muted-foreground" weight="duotone" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some courses to get started with your learning journey
              </p>
              <Button onClick={() => onNavigate('courses')} className="bg-primary hover:bg-primary/90">
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge variant="outline" className="text-xs border-accent/40 text-accent mb-2">
                              {item.category}
                            </Badge>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
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
                          <span className="text-xl font-bold text-accent">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="border-border/50 bg-card/50 backdrop-blur sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">₹{total}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">₹{total}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button
                    onClick={onCheckout}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    onClick={() => onNavigate('courses')}
                    variant="outline"
                    className="w-full"
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
