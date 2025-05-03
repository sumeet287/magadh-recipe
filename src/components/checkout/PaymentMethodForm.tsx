import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaymentMethodFormProps {
  paymentMethod: "cash_on_delivery" | "online";
  setPaymentMethod: (method: "cash_on_delivery" | "online") => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export default function PaymentMethodForm({
  paymentMethod,
  setPaymentMethod,
  handleNextStep,
  handlePreviousStep,
}: PaymentMethodFormProps) {
  return (
    <Card className="border-brand-border bg-white shadow-md">
      <CardHeader className="bg-brand-light rounded-t-lg border-b border-brand-border p-6">
        <CardTitle className="text-brand-accent flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-brand" />
          Payment Method
        </CardTitle>
        <CardDescription>Choose how you want to pay</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value as "cash_on_delivery" | "online")
          }
          className="space-y-4"
        >
          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem
              value="online"
              id="online"
              className="mt-1 border-brand text-brand"
            />
            <div className="grid gap-1.5 w-full">
              <Label htmlFor="online" className="font-medium text-brand-accent">
                Online Payment
              </Label>
              <p className="text-sm text-muted-foreground">
                Pay securely using Credit/Debit Card, UPI, or Net Banking via
                Razorpay
              </p>
              <div className="flex gap-2 mt-2">
                <div className="h-8 w-12 bg-brand-light rounded flex items-center justify-center text-xs font-medium shadow-sm">
                  Visa
                </div>
                <div className="h-8 w-12 bg-brand-light rounded flex items-center justify-center text-xs font-medium shadow-sm">
                  MC
                </div>
                <div className="h-8 w-12 bg-brand-light rounded flex items-center justify-center text-xs font-medium shadow-sm">
                  UPI
                </div>
                <div className="h-8 w-12 bg-brand-light rounded flex items-center justify-center text-xs font-medium shadow-sm">
                  Net
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem
              value="cash_on_delivery"
              id="cod"
              className="mt-1 border-brand text-brand"
            />
            <div className="grid gap-1.5 w-full">
              <Label htmlFor="cod" className="font-medium text-brand-accent">
                Cash on Delivery
              </Label>
              <p className="text-sm text-muted-foreground">
                Pay with cash when your order is delivered to your doorstep
              </p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between p-6 bg-brand-light rounded-b-lg border-t border-brand-border">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          className="border-brand text-brand hover:bg-brand/10"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Shipping
        </Button>
        <Button
          onClick={handleNextStep}
          className="bg-brand hover:bg-brand-dark text-white"
        >
          Review Order
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
