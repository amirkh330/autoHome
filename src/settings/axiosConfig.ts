import useAuthStore from "@/store/authStore";
import { BaseURL } from "@/utils/common";
import { useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosInstance } from "axios";

let axiosInstance: AxiosInstance | null = null;

export const useApiService = () => {
  const toast = useToast();
  const { accessToken: token } = useAuthStore();

  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: BaseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request Interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        // const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        toast({
          title: "خطا در ارسال درخواست",
          description: "مشکلی در ارسال درخواست شما رخ داد.",
          variant: "destructive",
        });
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<any>) => {
        const status = error.response?.status;

        switch (status) {
          case 400:
            toast({
              title: "درخواست نامعتبر",
              description: error.response?.data?.message || "خطای 400",
              status: "error",
              position: "top",
            });
            break;

          case 401:
            toast({
              title: "نیاز به ورود",
              description: "دوباره وارد حساب کاربری شوید.",
              status: "error",
              position: "top",
            });
            // ممکنه بخوای کاربر رو لوگ‌اوت کنی
            localStorage.removeItem("access_token");
            break;

          case 403:
            toast({
              title: "عدم دسترسی",
              description: "شما اجازه انجام این عملیات را ندارید.",
              status: "error",
              position: "top",
            });
            break;

          case 500:
            toast({
              title: "خطای سرور",
              description: "در سرور مشکلی رخ داده است.",
              status: "error",
              position: "top",
            });
            break;

          default:
            toast({
              title: "خطا",
              description:
                error.response?.data?.message || "مشکل ناشناخته‌ای رخ داد.",
              status: "error",
              position: "top",
            });
        }

        return Promise.reject(error);
      }
    );
  }

  return axiosInstance;
};
