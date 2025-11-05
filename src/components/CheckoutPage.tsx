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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {membershipType ? 'Membership Plan' : `${items.length} course(s)`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {membershipType ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {membershipType === 'weekly' ? '7-Day Access' : membershipType === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
                        </span>
                        <span className="font-bold text-accent">₹{membershipPrice}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Access to all 500+ courses
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.title}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <span className="font-semibold ml-4">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">₹{total}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Scan QR code and confirm payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode size={200} className="text-gray-800 mx-auto mb-2" weight="regular" />
                      <p className="text-sm text-gray-600 font-medium">UPI QR Code</p>
                      <p className="text-xs text-gray-500 mt-1">Scan with any UPI app</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-muted-foreground">
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
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {paymentConfirmed ? (
                      <>
                        <CheckCircle size={20} className="mr-2" weight="fill" />
                        Payment Request Submitted
                      </>
                    ) : (
                      "I've Completed Payment"
                    )}
                  </Button>

                  {paymentConfirmed && (
                    <div className="bg-accent/10 border border-accent/40 rounded-lg p-4 text-sm">
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
