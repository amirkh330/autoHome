import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IServices {
  id: number;
  title: string;
}

export const useGetServices = (search: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["admin-services", search],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IServices[]>>(
        `/admin/service${search ? `?search=${encodeURIComponent(search)}` : ""}`
      );
      return res.data.data;
    },
  });
};

export const useAddService = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
    }): Promise<IApiResponse<any>> => {
      const res = await api.post<IApiResponse<any>>("/admin/service", payload);
      return res.data;
    },
  });
};

export const useEditService = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      id: string;
      title?: string;
      isActive?: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await api.patch<IApiResponse<any>>(`/admin/service`, payload);
      return res.data;
    },
  });
};

export const useDeleteService = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: number): Promise<IApiResponse<any>> => {
      const res = await api.delete<IApiResponse<any>>(
        `/admin/service/${payload}`
      );
      return res.data;
    },
  });
};
