"use client";

import { Button } from "@/components/ui/button";
import { Copy, Loader2, QrCode, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { toast } from "sonner";

export function PaymentOptions() {
  const [selectedPayment, setSelectedPayment] = useState<"upi" | "whatsapp">(
    "upi"
  );
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const upiId = "biharbazaar@upi"; // Replace with your UPI ID
  const upiLink = `upi://pay?pa=${upiId}&pn=Bihar%20Bazaar&am=${1000}&cu=INR`; // Replace with actual amount

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(upiLink);
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };
    generateQR();
  }, [upiLink]);

  const handleUPIPayment = () => {
    window.open(upiLink, "_blank");
  };

  const handleWhatsAppPayment = () => {
    const message = "I want to place an order";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919810790293?text=${encodedMessage}`, "_blank");
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID copied to clipboard!");
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      if (selectedPayment === "upi") {
        handleUPIPayment();
      } else {
        handleWhatsAppPayment();
      }
      toast.success("Payment initiated successfully!");
    } catch (error: unknown) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex gap-4">
        <Button
          variant={selectedPayment === "upi" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setSelectedPayment("upi")}
        >
          UPI Payment
        </Button>
        <Button
          variant={selectedPayment === "whatsapp" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setSelectedPayment("whatsapp")}
        >
          WhatsApp Order
        </Button>
      </div>

      {selectedPayment === "upi" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">UPI ID</p>
              <p className="text-muted-foreground">{upiId}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopyUPI}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt="UPI QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
            ) : (
              <div className="h-[200px] w-[200px] flex items-center justify-center">
                <QrCode className="h-24 w-24 animate-pulse" />
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Scan QR code to pay
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Place your order via WhatsApp. Our team will contact you to confirm
            the order and payment details.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Instant order confirmation</span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Secure payment options</span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>24/7 customer support</span>
          </div>
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay via ${selectedPayment === "upi" ? "UPI" : "WhatsApp"}`
        )}
      </Button>
    </div>
  );
}
