import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IUserExist {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export const useGetUserExist = () => {
  const api = useApiService();

  return useMutation({
    mutationFn: async (payload: {
      phoneNumber: string;
    }): Promise<IApiResponse<IUserExist>> => {
      const res = await api.post<IApiResponse<IUserExist>>(
        "/shops/user-exist",
        payload
      );

      return res.data;
    },
  });
};
