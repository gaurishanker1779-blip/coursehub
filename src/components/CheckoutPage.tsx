import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Course } from '@/lib/types'
import { QrCode, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface CheckoutPageProps {
  items: Course[]
  membershipType?: 'weekly' | 'monthly' | 'yearly'
  membershipPrice?: number
  onConfirmPayment: () => void
  onNavigate: (page: string) => void
}

export function CheckoutPage({ items, membershipType, membershipPrice, onConfirmPayment, onNavigate }: CheckoutPageProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const total = membershipPrice || items.reduce((sum, item) => sum + item.price, 0)

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true)
    toast.success('Payment request submitted! Waiting for admin approval.')
    onConfirmPayment()
    setTimeout(() => {
      onNavigate('my-courses')
    }, 2000)
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
                  <CardDescription className="text-sm">
                    {membershipType ? 'Membership Plan' : `${items.length} course(s)`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {membershipType ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm sm:text-base">
                          {membershipType === 'weekly' ? '7-Day Access' : membershipType === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
                        </span>
                        <span className="font-bold text-accent text-sm sm:text-base">₹{membershipPrice}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Access to all 500+ courses
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs sm:text-sm line-clamp-2">{item.title}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <span className="font-semibold text-sm sm:text-base shrink-0">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">₹{total}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Payment Method</CardTitle>
                  <CardDescription className="text-sm">
                    Scan QR code and confirm payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6">
                  <div className="bg-white p-4 sm:p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode size={160} className="text-gray-800 mx-auto mb-2 sm:w-[200px] sm:h-[200px]" weight="regular" />
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">UPI QR Code</p>
                      <p className="text-xs text-gray-500 mt-1">Scan with any UPI app</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="bg-accent/20 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                      <span>Scan the QR code using your UPI app (Google Pay, PhonePe, Paytm, etc.)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="bg-accent/20 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                      <span>Complete the payment of ₹{total}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="bg-accent/20 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                      <span>Click "I've Completed Payment" below</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="bg-accent/20 text-accent rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">4</span>
                      <span>Admin will verify and approve your payment</span>
                    </p>
                  </div>

                  <Button
                    onClick={handleConfirmPayment}
                    disabled={paymentConfirmed}
                    className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
                    size="lg"
                  >
                    {paymentConfirmed ? (
                      <>
                        <CheckCircle size={18} className="mr-2 sm:w-5 sm:h-5" weight="fill" />
                        Payment Request Submitted
                      </>
                    ) : (
                      "I've Completed Payment"
                    )}
                  </Button>

                  {paymentConfirmed && (
                    <div className="bg-accent/10 border border-accent/40 rounded-lg p-3 sm:p-4 text-xs sm:text-sm">
                      <p className="text-accent font-medium mb-1">Request Pending</p>
                      <p className="text-muted-foreground">
                        Your payment request has been submitted. You'll get access once the admin approves it. Check "My Courses" for updates.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
