import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { PaymentRequest } from '@/lib/types'
import { CheckCircle, XCircle, Clock, User, Envelope, Phone, MapPin } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AdminPanelProps {
  paymentRequests: PaymentRequest[]
  onApprovePayment: (requestId: string) => void
  onRejectPayment: (requestId: string) => void
}

export function AdminPanel({ paymentRequests, onApprovePayment, onRejectPayment }: AdminPanelProps) {
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null)
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

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage payment requests and user access</p>
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
    </div>
  )
}
