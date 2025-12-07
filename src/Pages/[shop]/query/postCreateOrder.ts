import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";

export interface ICreateOrderDto {
  customer_firstName?: string;
  customer_lastName?: string;
  currentDistance: string;
  instrument: number[];
  nextDistance: string;
  phoneNumber: string;
  description?: string;
  vehicle: number;
  price: string;
  usage: "short" | "medium" | "long";
}

export const useCreateOrder = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (
      payload: ICreateOrderDto
    ): Promise<IApiResponse<any>> => {
      const res = await api.post<IApiResponse<any>>("/orders/create", payload);
      return res.data;
    },
  });
};
