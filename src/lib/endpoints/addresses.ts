import { api } from "../axios";

export interface Address {
  _id: string;
  name: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  country: string;
}

export interface CreateAddressRequest {
  name: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UpdateAddressRequest extends CreateAddressRequest {
  id: string;
}

export const addressEndpoints = {
  getAddresses: "/users/addresses",
  createAddress: "/users/addresses",
  updateAddress: "/users/addresses/:id",
  deleteAddress: "/users/addresses/:id",
} as const;

export const addressesApi = {
  getAddresses: async () => {
    const { data } = await api.get<Address[]>(addressEndpoints.getAddresses);
    return data;
  },

  createAddress: async (request: CreateAddressRequest) => {
    const { data } = await api.post<Address>(
      addressEndpoints.createAddress,
      request
    );
    return data;
  },

  updateAddress: async (request: UpdateAddressRequest) => {
    const { data } = await api.patch<Address>(
      addressEndpoints.updateAddress.replace(":id", request.id),
      request
    );
    return data;
  },

  deleteAddress: async (addressId: string) => {
    const { data } = await api.delete<Address>(
      addressEndpoints.deleteAddress.replace(":id", addressId)
    );
    return data;
  },
};
