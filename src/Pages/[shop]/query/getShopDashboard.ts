import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IShopDashboard {
  totalCustomers: number;
  todayService: number;
  weekService: number;
  monthService: number;
  todayIncome: number;
  monthIncome: number;
}
export const useGetShopDashboard = () => {
  const callApi = useApiService();

  return useQuery({
    queryKey: ["shop-dashboard"],
    queryFn: async () => {
      const res = await callApi.get<IApiResponse<IShopDashboard>>(
        "/shops/dashboard"
      );
      return res.data.data;
    },
  });
};
