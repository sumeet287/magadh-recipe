import { CreditCard, MapPin, Package } from "lucide-react";
import React from "react";

interface CheckoutProgressProps {
  activeStep: string;
  setActiveStep: (step: string) => void;
}

const steps = [
  { key: "shipping", label: "Shipping", icon: <MapPin className="h-6 w-6" /> },
  {
    key: "payment",
    label: "Payment",
    icon: <CreditCard className="h-6 w-6" />,
  },
  { key: "review", label: "Review", icon: <Package className="h-6 w-6" /> },
];

export default function CheckoutProgress({
  activeStep,
  setActiveStep,
}: CheckoutProgressProps) {
  return (
    <div className="flex justify-between items-center max-w-3xl mx-auto px-4">
      {steps.map((step, idx) => (
        <React.Fragment key={step.key}>
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveStep(step.key)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-brand shadow-lg ${
                activeStep === step.key
                  ? "bg-brand text-white"
                  : idx < steps.findIndex((s) => s.key === activeStep)
                  ? "bg-brand/10 text-brand cursor-pointer"
                  : "bg-brand-border text-brand-muted"
              } transition-all duration-300`}
              aria-label={`Go to ${step.label} step`}
              disabled={idx > steps.findIndex((s) => s.key === activeStep)}
            >
              {step.icon}
            </button>
            <span className="text-base mt-2 font-semibold font-sans">
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className="h-1 flex-1 bg-brand-border mx-2 md:mx-4 rounded-full">
              <div
                className={`h-full bg-brand rounded-full ${
                  idx < steps.findIndex((s) => s.key === activeStep)
                    ? "w-full"
                    : idx === steps.findIndex((s) => s.key === activeStep)
                    ? "w-1/2"
                    : "w-0"
                } transition-all duration-300`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
