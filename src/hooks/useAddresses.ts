"use client";

import { useState, useCallback, useEffect } from "react";
import {
  addressesApi,
  type Address,
  type CreateAddressRequest,
  type UpdateAddressRequest,
} from "@/lib/endpoints/addresses";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  // Fetch addresses
  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    try {
      const data = await addressesApi.getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Create new address
  const createAddress = useCallback(async (request: CreateAddressRequest) => {
    try {
      const newAddress = await addressesApi.createAddress(request);
      setAddresses((prev) => [...prev, newAddress]);
      toast.success("Address added successfully");
      return newAddress;
    } catch (error) {
      console.error("Failed to create address:", error);
      toast.error("Failed to add address");
      throw error;
    }
  }, []);

  // Update address
  const updateAddress = useCallback(async (request: UpdateAddressRequest) => {
    try {
      const updatedAddress = await addressesApi.updateAddress(request);
      setAddresses((prev) =>
        prev.map((addr) => (addr._id === request.id ? updatedAddress : addr))
      );
      toast.success("Address updated successfully");
      return updatedAddress;
    } catch (error) {
      console.error("Failed to update address:", error);
      toast.error("Failed to update address");
      throw error;
    }
  }, []);

  // Delete address
  const deleteAddress = useCallback(async (addressId: string) => {
    try {
      await addressesApi.deleteAddress(addressId);
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address");
      throw error;
    }
  }, []);

  // Set default address
  const setDefaultAddress = useCallback(
    async (addressId: string) => {
      try {
        const address = addresses.find((addr) => addr._id === addressId);
        if (!address) return;

        const updatedAddress = await addressesApi.updateAddress({
          ...address,
          isDefault: true,
          id: address._id,
        });

        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            isDefault: addr._id === addressId,
          }))
        );

        toast.success("Default address updated");
        return updatedAddress;
      } catch (error) {
        console.error("Failed to set default address:", error);
        toast.error("Failed to set default address");
        throw error;
      }
    },
    [addresses]
  );

  // Fetch addresses on mount
  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [fetchAddresses, token]);

  return {
    addresses,
    isLoading,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}
