import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IServices {
  id: number;
  title: string;
}
export const useGetServices = (search: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["services", search],

    queryFn: async () => {
      const res = await api.get<IApiResponse<IServices[]>>(
        `/common/services${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};
