import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IVehicle {
  id: number;
  title: string;
}
export const useGetVehicles = () => {
  const api = useApiService();

  return useQuery({
    queryKey: ["vehicle"],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IVehicle[]>>("/common/vehicle");
      return res.data;
    },
  });
};
