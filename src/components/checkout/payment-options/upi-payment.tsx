"use client";

import { Button } from "@/components/ui/button";
import { Copy, QrCode } from "lucide-react";
import Image from "next/image";

interface UPIPaymentProps {
  upiId: string;
  qrCodeUrl: string;
  onCopy: () => void;
}

export function UPIPayment({ upiId, qrCodeUrl, onCopy }: UPIPaymentProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
        <div>
          <p className="text-sm font-medium">UPI ID</p>
          <p className="text-xs text-muted-foreground">{upiId}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={onCopy}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
        {qrCodeUrl ? (
          <Image
            src={qrCodeUrl}
            alt="UPI QR Code"
            width={120}
            height={120}
            className="rounded-lg"
          />
        ) : (
          <div className="h-[120px] w-[120px] flex items-center justify-center">
            <QrCode className="h-16 w-16 animate-pulse" />
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">Scan to pay</p>
      </div>
    </div>
  );
}
