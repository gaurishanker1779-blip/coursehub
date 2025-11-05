import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PaymentRequest } from '@/lib/types'
import { CheckCircle, XCircle, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AdminPanelProps {
  paymentRequests: PaymentRequest[]
  onApprovePayment: (requestId: string) => void
  onRejectPayment: (requestId: string) => void
}

export function AdminPanel({ paymentRequests, onApprovePayment, onRejectPayment }: AdminPanelProps) {
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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage payment requests and user access</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-yellow-500/40 bg-yellow-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{pendingRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/40 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{approvedRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="border-red-500/40 bg-red-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{rejectedRequests.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Payment Requests</CardTitle>
            <CardDescription>Review and manage payment verification requests</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentRequests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No payment requests yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRequests.sort((a, b) => 
                      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ).map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(request.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">{request.userEmail}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {request.type === 'membership' ? `Membership - ${request.membershipType}` : 'Course'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">₹{request.amount}</TableCell>
                        <TableCell>
                          {request.status === 'pending' && (
                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                              <Clock size={14} className="mr-1" />
                              Pending
                            </Badge>
                          )}
                          {request.status === 'approved' && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                              <CheckCircle size={14} className="mr-1" weight="fill" />
                              Approved
                            </Badge>
                          )}
                          {request.status === 'rejected' && (
                            <Badge className="bg-red-500/20 text-red-300 border-red-500/40">
                              <XCircle size={14} className="mr-1" weight="fill" />
                              Rejected
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === 'pending' && (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(request.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle size={16} className="mr-1" weight="bold" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(request.id)}
                                className="border-red-500/40 text-red-400 hover:bg-red-500/10"
                              >
                                <XCircle size={16} className="mr-1" weight="bold" />
                                Reject
                              </Button>
                            </div>
                          )}
                          {request.status === 'approved' && (
                            <span className="text-sm text-muted-foreground">
                              {formatDate(request.approvedAt!)}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
