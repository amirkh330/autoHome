import { queryClient } from "@/main";
import { RoleEnum } from "@/utils/common";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  refresh: string;
  fullName: string;
  role: string;
  phoneNumber: string;
  shopName?: string;
  isAuth: boolean;
  loginUser: ({
    accessToken,
    refresh,
    fullName,
    phoneNumber,
    role,
    shopName,
  }: {
    accessToken: string;
    refresh: string;
    fullName: string;
    phoneNumber: string;
    role: RoleEnum;
    shopName?: string;
  }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      accessToken: "",
      refresh: "",
      fullName: "",
      role: "",
      phoneNumber: "",
      loginUser: ({
        accessToken,
        refresh,
        fullName,
        phoneNumber,
        role,
        shopName,
      }) => {
        set({
          isAuth: true,
          accessToken,
          refresh,
          fullName,
          phoneNumber,
          role,
          shopName,
        });
      },

      logout: () => {
        // axios.defaults.headers.common["Authorization"] = "";

        queryClient.cancelQueries();
        queryClient.clear();
        queryClient.removeQueries();
        set({
          isAuth: false,
          accessToken: "",
          refresh: "",
          fullName: "",
          role: "",
          phoneNumber: "",
          shopName: "",
        });
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
