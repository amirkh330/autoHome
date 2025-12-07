import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse, ReminderDateEnum } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";
import { IMyOrder } from "./getMyOrderList";
import useAuthStore from "@/store/authStore";

export interface NextSession {
  order: IMyOrder;
  nextSession: { reminderAt: string };
}

export const useGetMyNextSession = () => {
  const api = useApiService();
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: ["myNextSession", accessToken],
    queryFn: async () => {
      const res = await api.get<IApiResponse<NextSession>>("/users/next-stop");
      return res.data.data;
    },
    enabled: !!accessToken,
  });
};
