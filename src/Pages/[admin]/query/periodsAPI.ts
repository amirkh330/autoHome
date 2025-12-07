import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IPeriod {
  id: number;
  title: string;
  isActive: boolean;
}

export const useGetPeriods = (search: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["periods", search],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IPeriod[]>>(
        `/admin/periods${search ? `?search=${encodeURIComponent(search)}` : ""}`
      );
      return res.data.data;
    },
  });
};

export const useAddPeriod = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await api.post<IApiResponse<any>>("/admin/periods", payload);
      return res.data;
    },
  });
};

export const useEditPeriod = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await api.patch<IApiResponse<any>>(
        `/admin/periods/${payload.id}`,
        payload
      );
      return res.data;
    },
  });
};

export const useDeletePeriod = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
    }): Promise<IApiResponse<any>> => {
      const res = await api.delete<IApiResponse<any>>(
        `/admin/periods/${payload.id}`
      );
      return res.data;
    },
  });
};
