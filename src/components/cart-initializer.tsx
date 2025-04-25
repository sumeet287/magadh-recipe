"use client";

import { useEffect } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { hasValidToken } from "@/utils/auth";

export function CartInitializer() {
  const { getCart } = useCartActions();

  useEffect(() => {
    // Only try to get cart if we have a token
    if (hasValidToken()) {
      getCart().catch(console.error);
    }
  }, []);

  return null;
}
