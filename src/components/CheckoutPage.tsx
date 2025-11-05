import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Course } from '@/lib/types'
import { QrCode, CheckCircle, Tag, X } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface CheckoutPageProps {
  items: Course[]
  membershipType?: 'weekly' | 'monthly' | 'yearly'
  membershipPrice?: number
  onConfirmPayment: () => void
  onNavigate: (page: string) => void
}

const COUPON_CODES = {
  GET20: { discount: 20, description: '20% off' },
  FREE30: { discount: 30, description: '30% off' },
  GET10: { discount: 10, description: '10% off' },
} as const

const GST_RATE = 0.18

export function CheckoutPage({ items, membershipType, membershipPrice, onConfirmPayment, onNavigate }: CheckoutPageProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<keyof typeof COUPON_CODES | null>(null)

  const subtotal = membershipPrice || items.reduce((sum, item) => sum + item.price, 0)

  const calculations = useMemo(() => {
    let discountAmount = 0
    if (appliedCoupon && COUPON_CODES[appliedCoupon]) {
      discountAmount = subtotal * (COUPON_CODES[appliedCoupon].discount / 100)
    }

    const total = subtotal - discountAmount
    const baseAmount = total / (1 + GST_RATE)
    const gstAmount = total - baseAmount

    return {
      subtotal,
      discountAmount,
      discountPercentage: appliedCoupon ? COUPON_CODES[appliedCoupon].discount : 0,
      baseAmount,
      gstAmount,
      total: Math.round(total * 100) / 100,
    }
  }, [subtotal, appliedCoupon])

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase() as keyof typeof COUPON_CODES
    if (COUPON_CODES[code]) {
      setAppliedCoupon(code)
      toast.success(`Coupon ${code} applied! You saved ${COUPON_CODES[code].discount}%`)
    } else {
      toast.error('Invalid coupon code')
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    toast.info('Coupon removed')
  }

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="lg:col-span-3 space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
                  <CardDescription className="text-sm">
                    {membershipType ? 'Membership Plan' : `${items.length} course(s)`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {membershipType ? (
                    <div className="space-y-2 bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-base sm:text-lg block">
                            {membershipType === 'weekly' ? '7-Day Access Pass' : membershipType === 'monthly' ? 'Monthly Subscription' : 'Yearly Subscription'}
                          </span>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Unlimited access to all 500+ courses
                          </p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">Premium</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs sm:text-sm line-clamp-2 mb-2">{item.title}</p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {item.level}
                              </Badge>
                            </div>
                          </div>
                          <span className="font-semibold text-sm sm:text-base shrink-0 text-primary">₹{item.price}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price (Incl. GST)</span>
                      <span className="font-medium">₹{calculations.subtotal.toFixed(2)}</span>
                    </div>

                    <AnimatePresence>
                      {appliedCoupon && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between text-sm overflow-hidden"
                        >
                          <span className="text-green-500 flex items-center gap-1">
                            <Tag size={16} weight="fill" />
                            Discount ({calculations.discountPercentage}%)
                          </span>
                          <span className="font-medium text-green-500">-₹{calculations.discountAmount.toFixed(2)}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Separator />

                    <div className="bg-muted/30 p-3 rounded-lg space-y-2 text-xs">
                      <p className="font-semibold text-muted-foreground mb-2">Price Breakdown</p>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Amount</span>
                        <span className="font-medium">₹{calculations.baseAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GST (18%)</span>
                        <span className="font-medium">₹{calculations.gstAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span>Total Amount</span>
                      <span className="text-accent">₹{calculations.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-xl">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Tag size={20} className="text-accent" weight="fill" />
                    Apply Coupon Code
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Have a promo code? Enter it below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {appliedCoupon ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 rounded-full p-2">
                          <Tag size={20} className="text-green-500" weight="fill" />
                        </div>
                        <div>
                          <p className="font-semibold text-green-500">{appliedCoupon}</p>
                          <p className="text-xs text-muted-foreground">{COUPON_CODES[appliedCoupon].description} applied</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X size={18} />
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Apply
                      </Button>
                    </div>
                  )}

                  {!appliedCoupon && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-muted-foreground mb-2">Available coupons:</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(COUPON_CODES).map(([code, info]) => (
                          <Badge
                            key={code}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent/10 hover:border-accent transition-all"
                            onClick={() => {
                              setCouponCode(code)
                              setTimeout(() => handleApplyCoupon(), 100)
                            }}
                          >
                            {code} - {info.description}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur shadow-xl sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Payment Method</CardTitle>
                  <CardDescription className="text-sm">
                    Scan QR code to complete payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6">
                  <div className="bg-white p-4 sm:p-6 rounded-lg flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <QrCode size={160} className="text-gray-800 mx-auto mb-2 sm:w-[180px] sm:h-[180px]" weight="regular" />
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold">UPI QR Code</p>
                      <p className="text-xs text-gray-500 mt-1">Any UPI app accepted</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-center font-bold text-lg text-primary mb-1">Amount to Pay</p>
                    <p className="text-center text-3xl font-bold text-accent">₹{calculations.total.toFixed(2)}</p>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="bg-gradient-to-br from-accent to-primary text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                      <span>Open any UPI app (GPay, PhonePe, Paytm)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="bg-gradient-to-br from-accent to-primary text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                      <span>Scan the QR code above</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="bg-gradient-to-br from-accent to-primary text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                      <span>Confirm payment of ₹{calculations.total.toFixed(2)}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="bg-gradient-to-br from-accent to-primary text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold">4</span>
                      <span>Click button below after payment</span>
                    </p>
                  </div>

                  <Button
                    onClick={handleConfirmPayment}
                    disabled={paymentConfirmed}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-sm sm:text-base shadow-lg"
                    size="lg"
                  >
                    {paymentConfirmed ? (
                      <>
                        <CheckCircle size={18} className="mr-2 sm:w-5 sm:h-5" weight="fill" />
                        Payment Submitted
                      </>
                    ) : (
                      "I've Completed Payment"
                    )}
                  </Button>

                  <AnimatePresence>
                    {paymentConfirmed && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/40 rounded-lg p-3 sm:p-4 text-xs sm:text-sm"
                      >
                        <p className="text-accent font-semibold mb-1 flex items-center gap-2">
                          <CheckCircle size={16} weight="fill" />
                          Request Pending
                        </p>
                        <p className="text-muted-foreground">
                          Admin verification in progress. Check "My Courses" for updates.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
