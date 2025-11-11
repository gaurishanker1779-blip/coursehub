import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaymentRequest, User as UserType } from '@/lib/types'
import { CheckCircle, XCircle, Clock, User, Envelope, Phone, MapPin, Database, Crown, Calendar } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AdminPanelProps {
  paymentRequests: PaymentRequest[]
  onApprovePayment: (requestId: string) => void
  onRejectPayment: (requestId: string) => void
  users: UserType[]
}

export function AdminPanel({ paymentRequests, onApprovePayment, onRejectPayment, users }: AdminPanelProps) {
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [showDatabaseDialog, setShowDatabaseDialog] = useState(false)
  
  const pendingRequests = paymentRequests.filter(req => req.status === 'pending')
  const approvedRequests = paymentRequests.filter(req => req.status === 'approved')
  const rejectedRequests = paymentRequests.filter(req => req.status === 'rejected')

  const handleApprove = (requestId: string) => {
    onApprovePayment(requestId)
    toast.success('Payment approved! User will get access to their purchase.')
  }

  const handleReject = (requestId: string) => {
    onRejectPayment(requestId)
    toast.error('Payment request rejected.')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getUserCheckoutInfo = (userId: string) => {
    const userPayments = paymentRequests.filter(req => req.userId === userId && req.customerInfo)
    if (userPayments.length > 0) {
      return userPayments[userPayments.length - 1].customerInfo
    }
    return null
  }

  const handleViewUserDetails = (user: UserType) => {
    setSelectedUser(user)
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage payment requests and user access</p>
          </div>
          <Button 
            onClick={() => setShowDatabaseDialog(true)}
            className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            size="lg"
          >
            <Database size={20} className="mr-2" weight="bold" />
            Check Databases
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-yellow-500/40 bg-yellow-500/5">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500">{pendingRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/40 bg-green-500/5">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-green-500">{approvedRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="border-red-500/40 bg-red-500/5">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-red-500">{rejectedRequests.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Payment Requests</CardTitle>
            <CardDescription className="text-sm">Review and manage payment verification requests</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentRequests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm sm:text-base">
                No payment requests yet
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[640px] sm:min-w-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">User</TableHead>
                        <TableHead className="text-xs sm:text-sm">Type</TableHead>
                        <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentRequests.sort((a, b) => 
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                      ).map(request => (
                        <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedRequest(request)}>
                          <TableCell className="text-xs sm:text-sm text-muted-foreground">
                            {formatDate(request.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-xs sm:text-sm">{request.userEmail}</p>
                              {request.customerInfo && (
                                <p className="text-xs text-muted-foreground">
                                  {request.customerInfo.firstName} {request.customerInfo.lastName}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {request.type === 'membership' ? `Membership - ${request.membershipType}` : 'Course'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-xs sm:text-sm">₹{request.amount}</TableCell>
                          <TableCell>
                            {request.status === 'pending' && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40 text-xs">
                                <Clock size={12} className="mr-1" />
                                Pending
                              </Badge>
                            )}
                            {request.status === 'approved' && (
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/40 text-xs">
                                <CheckCircle size={12} className="mr-1" weight="fill" />
                                Approved
                              </Badge>
                            )}
                            {request.status === 'rejected' && (
                              <Badge className="bg-red-500/20 text-red-300 border-red-500/40 text-xs">
                                <XCircle size={12} className="mr-1" weight="fill" />
                                Rejected
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            {request.status === 'pending' && (
                              <div className="flex gap-1 sm:gap-2 justify-end">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(request.id)}
                                  className="bg-green-500 hover:bg-green-600 text-xs px-2 sm:px-3"
                                >
                                  <CheckCircle size={14} className="sm:mr-1" weight="bold" />
                                  <span className="hidden sm:inline">Approve</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReject(request.id)}
                                  className="border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs px-2 sm:px-3"
                                >
                                  <XCircle size={14} className="sm:mr-1" weight="bold" />
                                  <span className="hidden sm:inline">Reject</span>
                                </Button>
                              </div>
                            )}
                            {request.status === 'approved' && (
                              <span className="text-xs text-muted-foreground">
                                {formatDate(request.approvedAt!)}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Request Details</DialogTitle>
            <DialogDescription>
              Complete information about this payment request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Payment ID</p>
                  <p className="text-sm font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="text-sm font-medium">{formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <Badge variant="outline">
                    {selectedRequest.type === 'membership' 
                      ? `Membership - ${selectedRequest.membershipType}` 
                      : 'Course'}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="text-lg font-bold text-accent">₹{selectedRequest.amount}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  Customer Information
                </h3>
                
                {selectedRequest.customerInfo ? (
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <User size={14} />
                          First Name
                        </p>
                        <p className="text-sm font-medium">{selectedRequest.customerInfo.firstName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <User size={14} />
                          Last Name
                        </p>
                        <p className="text-sm font-medium">{selectedRequest.customerInfo.lastName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Envelope size={14} />
                        Email Address
                      </p>
                      <p className="text-sm font-medium">{selectedRequest.customerInfo.email}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Phone size={14} />
                        Phone Number
                      </p>
                      <p className="text-sm font-medium">{selectedRequest.customerInfo.phone}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <MapPin size={14} />
                        Home Address
                      </p>
                      <p className="text-sm font-medium whitespace-pre-line">{selectedRequest.customerInfo.address}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic bg-muted/30 p-4 rounded-lg">
                    No customer information provided for this payment request.
                  </p>
                )}
              </div>

              {selectedRequest.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      handleApprove(selectedRequest.id)
                      setSelectedRequest(null)
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle size={18} className="mr-2" weight="bold" />
                    Approve Payment
                  </Button>
                  <Button
                    onClick={() => {
                      handleReject(selectedRequest.id)
                      setSelectedRequest(null)
                    }}
                    variant="outline"
                    className="flex-1 border-red-500/40 text-red-400 hover:bg-red-500/10"
                  >
                    <XCircle size={18} className="mr-2" weight="bold" />
                    Reject Payment
                  </Button>
                </div>
              )}
              
              {selectedRequest.status === 'approved' && (
                <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-4">
                  <p className="text-green-500 font-semibold text-sm flex items-center gap-2">
                    <CheckCircle size={16} weight="fill" />
                    Payment Approved on {formatDate(selectedRequest.approvedAt!)}
                  </p>
                </div>
              )}
              
              {selectedRequest.status === 'rejected' && (
                <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4">
                  <p className="text-red-500 font-semibold text-sm flex items-center gap-2">
                    <XCircle size={16} weight="fill" />
                    Payment Rejected
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showDatabaseDialog} onOpenChange={setShowDatabaseDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Database size={24} className="text-primary" weight="bold" />
              User Database
            </DialogTitle>
            <DialogDescription>
              All registered users with their account and checkout information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <User size={20} className="text-primary" weight="bold" />
                <span className="font-semibold">Total Registered Users: {users.length}</span>
              </div>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No users registered yet
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((user, index) => {
                  const checkoutInfo = getUserCheckoutInfo(user.id)
                  const userPaymentsCount = paymentRequests.filter(req => req.userId === user.id).length
                  
                  return (
                    <Card 
                      key={user.id} 
                      className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/40 transition-all cursor-pointer"
                      onClick={() => handleViewUserDetails(user)}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User size={20} className="text-primary" weight="bold" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-base sm:text-lg">{user.name}</h3>
                                  <p className="text-xs text-muted-foreground">User #{index + 1}</p>
                                </div>
                              </div>
                            </div>
                            {user.membership?.active && (
                              <Badge className="bg-accent/20 text-accent border-accent/40">
                                <Crown size={14} className="mr-1" weight="fill" />
                                Member
                              </Badge>
                            )}
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Envelope size={14} />
                                Email (Login)
                              </p>
                              <p className="text-sm font-medium break-all">{user.email}</p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <User size={14} />
                                Password
                              </p>
                              <p className="text-sm font-mono font-medium">{user.password}</p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar size={14} />
                                Registered On
                              </p>
                              <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
                            </div>
                          </div>

                          {checkoutInfo && (
                            <div className="border-t border-border pt-4 mt-4">
                              <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                                Checkout Information
                              </h4>
                              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <User size={14} />
                                    Full Name
                                  </p>
                                  <p className="text-sm font-medium">
                                    {checkoutInfo.firstName} {checkoutInfo.lastName}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Phone size={14} />
                                    Phone Number
                                  </p>
                                  <p className="text-sm font-medium">{checkoutInfo.phone}</p>
                                </div>

                                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Envelope size={14} />
                                    Checkout Email
                                  </p>
                                  <p className="text-sm font-medium break-all">{checkoutInfo.email}</p>
                                </div>

                                <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin size={14} />
                                    Home Address
                                  </p>
                                  <p className="text-sm font-medium whitespace-pre-line">{checkoutInfo.address}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="border-t border-border pt-3 mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Total Payments: {userPaymentsCount}</span>
                              {user.membership?.active && (
                                <span className="flex items-center gap-1">
                                  <Crown size={12} weight="fill" className="text-accent" />
                                  Expires: {new Date(user.membership.expiresAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewUserDetails(user)
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User size={24} className="text-primary" weight="bold" />
              User Account Details
            </DialogTitle>
            <DialogDescription>
              Complete information for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg mb-4">Account Information</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">User ID</p>
                    <p className="text-sm font-mono font-medium">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                    <p className="text-sm font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email (Login)</p>
                    <p className="text-sm font-medium break-all">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Password</p>
                    <p className="text-sm font-mono font-medium">{selectedUser.password}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Registration Date</p>
                    <p className="text-sm font-medium">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Membership Status</p>
                    {selectedUser.membership?.active ? (
                      <Badge className="bg-accent/20 text-accent border-accent/40">
                        <Crown size={14} className="mr-1" weight="fill" />
                        Active - {selectedUser.membership.type}
                      </Badge>
                    ) : (
                      <Badge variant="outline">No Active Membership</Badge>
                    )}
                  </div>
                </div>

                {selectedUser.membership?.active && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Membership Expires</p>
                    <p className="text-sm font-medium">{formatDate(selectedUser.membership.expiresAt)}</p>
                  </div>
                )}
              </div>

              {(() => {
                const checkoutInfo = getUserCheckoutInfo(selectedUser.id)
                return checkoutInfo ? (
                  <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-primary" />
                      Checkout & Contact Information
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">First Name</p>
                        <p className="text-sm font-medium">{checkoutInfo.firstName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Last Name</p>
                        <p className="text-sm font-medium">{checkoutInfo.lastName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                        <p className="text-sm font-medium break-all">{checkoutInfo.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
                        <p className="text-sm font-medium">{checkoutInfo.phone}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs text-muted-foreground mb-1">Home Address</p>
                        <p className="text-sm font-medium whitespace-pre-line">{checkoutInfo.address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      No checkout information available. User hasn't made any purchases yet.
                    </p>
                  </div>
                )
              })()}

              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg mb-4">Payment History</h3>
                
                {(() => {
                  const userPayments = paymentRequests.filter(req => req.userId === selectedUser.id)
                  
                  return userPayments.length > 0 ? (
                    <div className="space-y-3">
                      {userPayments.map(payment => (
                        <div key={payment.id} className="border border-border p-4 rounded-lg">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <p className="text-sm font-semibold">
                                {payment.type === 'membership' 
                                  ? `Membership - ${payment.membershipType}` 
                                  : `Course Purchase`}
                              </p>
                              <p className="text-xs text-muted-foreground">{formatDate(payment.createdAt)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-accent">₹{payment.amount}</p>
                              {payment.status === 'approved' && (
                                <Badge className="bg-green-500/20 text-green-300 border-green-500/40 text-xs mt-1">
                                  <CheckCircle size={12} className="mr-1" weight="fill" />
                                  Approved
                                </Badge>
                              )}
                              {payment.status === 'pending' && (
                                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40 text-xs mt-1">
                                  <Clock size={12} className="mr-1" />
                                  Pending
                                </Badge>
                              )}
                              {payment.status === 'rejected' && (
                                <Badge className="bg-red-500/20 text-red-300 border-red-500/40 text-xs mt-1">
                                  <XCircle size={12} className="mr-1" weight="fill" />
                                  Rejected
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No payment history</p>
                  )
                })()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
