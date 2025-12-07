import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IVehicle {
  id: number;
  title: string;
}

export const useGetVehicles = (search: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["vehicles", search],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IVehicle[]>>(
        `/admin/vehicles${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};

export const useAddVehicle = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await api.post<IApiResponse<any>>("/admin/vehicles", payload);
      return res.data;
    },
  });
};

export const useEditVehicle = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await api.patch<IApiResponse<any>>(
        `/admin/vehicles`,
        payload
      );
      return res.data;
    },
  });
};

export const useDeleteVehicle = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
    }): Promise<IApiResponse<any>> => {
      const res = await api.delete<IApiResponse<any>>(
        `/admin/vehicles/${payload.id}`
      );
      return res.data;
    },
  });
};
