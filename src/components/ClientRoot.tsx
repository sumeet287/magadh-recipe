"use client";
import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { RazorpayScript } from "@/components/razorpay-script";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { CartInitializer } from "@/components/cart-initializer";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <>
          <RazorpayScript />
          <QueryProvider>
            <AuthProvider>
              <CartProvider>
                <CartInitializer />
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Toaster position="top-center" />
                </div>
              </CartProvider>
            </AuthProvider>
          </QueryProvider>
        </>
      )}
    </>
  );
}
