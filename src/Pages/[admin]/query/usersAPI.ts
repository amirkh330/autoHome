import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IUserLocation {
  lat: number;
  lng: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  shopName: string;
  address: string;
  // location: IUserLocation;
}

// GET users
export const useGetUsers = (search: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IUser[]>>(
        `/admin/users${search ? `?search=${encodeURIComponent(search)}` : ""}`
      );
      return res.data.data;
    },
  });
};

// ADD user
export const useAddUser = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (
      payload: Omit<IUser, "id">
    ): Promise<IApiResponse<any>> => {
      const res = await api.post<IApiResponse<any>>("/admin/users", payload);
      return res.data;
    },
  });
};

// EDIT user
export const useEditUser = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: IUser): Promise<IApiResponse<any>> => {
      const res = await api.patch<IApiResponse<any>>(`/admin/users`, payload);
      return res.data;
    },
  });
};

// DELETE user
export const useDeleteUser = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      id: number | string;
    }): Promise<IApiResponse<any>> => {
      const res = await api.delete<IApiResponse<any>>(
        `/admin/users/${payload.id}`
      );
      return res.data;
    },
  });
};
