import { IMyOrder } from "@/Pages/[customer]/query/getMyOrderList";
import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export const useGetMyOrders = () => {
  const api = useApiService();
  return useQuery({
    queryKey: ["MyOrders"],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IMyOrder[]>>("/shops/my-orders");
      return res.data.data;
    },
  });
};
