import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CreditCard, ArrowLeft, ArrowRight } from "lucide-react";
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
    <Card className="overflow-hidden rounded-2xl border-[#E8D0B0] bg-white shadow-xl w-full max-w-2xl mx-auto">
      <CardHeader className="border-b border-[#E8D0B0] bg-gradient-to-r from-[#FBF7EF] to-[#F5EBD8] p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D84315] to-[#F4511E] shadow-md">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#5D3A1E]">
              Payment Method
            </h2>
            <p className="text-xs sm:text-sm text-[#8C6239]">
              Choose how you want to pay
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative p-3 sm:p-6 bg-[#FFFCF7]">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value as "cash_on_delivery" | "online")
          }
          className="space-y-4"
        >
          <div
            className={`group rounded-xl border-2 transition-all bg-white p-3 sm:p-5 flex flex-col gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D84315] ${
              paymentMethod === "online"
                ? "border-[#D84315] shadow-lg bg-gradient-to-br from-[#FFF5ED] to-[#FFFCF7]"
                : "border-[#E8D0B0] hover:border-[#D84315] hover:shadow-md"
            }`}
            onClick={() => setPaymentMethod("online")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setPaymentMethod("online");
            }}
            role="button"
            aria-pressed={paymentMethod === "online"}
          >
            <div className="flex items-start">
              <RadioGroupItem
                value="online"
                id="online"
                className="mt-1 border-[#E8D0B0] text-[#D84315] pointer-events-none"
                tabIndex={-1}
                aria-hidden
              />
              <div className="ml-3 flex-1">
                <Label
                  htmlFor="online"
                  className="text-base font-semibold text-[#5D3A1E]"
                >
                  Online Payment
                </Label>
                <p className="text-xs sm:text-sm text-[#8C6239] mt-1">
                  Pay securely using Credit/Debit Card, UPI, or Net Banking via
                  Razorpay
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md border border-[#E8D0B0] bg-white px-3 py-1 text-xs sm:text-sm font-medium shadow-sm text-[#5D3A1E]">
                    Visa
                  </span>
                  <span className="rounded-md border border-[#E8D0B0] bg-white px-3 py-1 text-xs sm:text-sm font-medium shadow-sm text-[#5D3A1E]">
                    MC
                  </span>
                  <span className="rounded-md border border-[#E8D0B0] bg-white px-3 py-1 text-xs sm:text-sm font-medium shadow-sm text-[#5D3A1E]">
                    UPI
                  </span>
                  <span className="rounded-md border border-[#E8D0B0] bg-white px-3 py-1 text-xs sm:text-sm font-medium shadow-sm text-[#5D3A1E]">
                    Net
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`group rounded-xl border-2 transition-all bg-white p-3 sm:p-5 flex flex-col gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D84315] ${
              paymentMethod === "cash_on_delivery"
                ? "border-[#D84315] shadow-lg bg-gradient-to-br from-[#FFF5ED] to-[#FFFCF7]"
                : "border-[#E8D0B0] hover:border-[#D84315] hover:shadow-md"
            }`}
            onClick={() => setPaymentMethod("cash_on_delivery")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setPaymentMethod("cash_on_delivery");
            }}
            role="button"
            aria-pressed={paymentMethod === "cash_on_delivery"}
          >
            <div className="flex items-start">
              <RadioGroupItem
                value="cash_on_delivery"
                id="cod"
                className="mt-1 border-[#E8D0B0] text-[#D84315] pointer-events-none"
                tabIndex={-1}
                aria-hidden
              />
              <div className="ml-3 flex-1">
                <Label
                  htmlFor="cod"
                  className="text-base font-semibold text-brand-accent"
                >
                  Cash on Delivery
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Pay with cash when your order is delivered to your doorstep
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between p-3 sm:p-6 bg-[#FBF7EF] rounded-b-2xl border-t border-brand-border">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          className="rounded-lg border-[#E8D0B0] text-[#5D3A1E] hover:bg-[#FBF7EF] hover:text-[#D84315] cursor-pointer w-full sm:w-auto transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shipping
        </Button>
        <Button
          onClick={handleNextStep}
          className="rounded-lg bg-gradient-to-r from-[#D84315] to-[#F4511E] shadow-md transition-all hover:from-[#C33000] hover:to-[#E64A19] hover:shadow-lg cursor-pointer w-full sm:w-auto"
        >
          Review Order
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
