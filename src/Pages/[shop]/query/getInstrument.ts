import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IInstrument {
  id: number;
  title: string;
}
export const useGetInstrument = () => {
  const api = useApiService();

  return useQuery({
    queryKey: ["instrument"],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IInstrument[]>>(
        "/common/instrument"
      );
      return res.data;
    },
  });
};
