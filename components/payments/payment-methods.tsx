"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CreditCard, Trash2, Edit } from "lucide-react"
import { AddPaymentMethodDialog } from "./add-payment-method-dialog"

const paymentMethods = [
  {
    id: "pm_1",
    type: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    holderName: "John Doe",
  },
  {
    id: "pm_2",
    type: "mastercard",
    last4: "5555",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
    holderName: "John Doe",
  },
]

export function PaymentMethods() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        )
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Saved Payment Methods</CardTitle>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Securely save your payment methods for faster checkout. All payment information is encrypted and stored
            securely.
          </p>
        </CardContent>
      </Card>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getCardIcon(method.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">•••• •••• •••• {method.last4}</span>
                      {method.isDefault && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.holderName} • Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Billing Address</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>John Doe</p>
                <p>123 Main Street</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tax Information</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Tax ID: Not provided</p>
                <p>Business Name: Personal</p>
              </div>
            </div>
          </div>
          <Button variant="outline">Update Billing Information</Button>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Your payment information is secure</h4>
              <p className="text-sm text-muted-foreground">
                We use industry-standard encryption to protect your payment data. Your card information is never stored
                on our servers and is processed through secure payment partners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddPaymentMethodDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
