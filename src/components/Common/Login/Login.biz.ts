import useAuthStore from "@/store/authStore";
import { RouteConst } from "@/utils/allRoutes.type";
import { BaseURL, RoleEnum } from "@/utils/common";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = (onClose: () => void) => {
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [serverOtpKey, setServerOtpKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"phoneNumber" | "otp">("phoneNumber");
  const { loginUser } = useAuthStore();

  const handleSendOtp = async () => {
    if (phoneNumber == "09000000000") {
      return navigate(RouteConst.register + "?phoneNumber=" + phoneNumber);
    }
    setStep("otp");
    return;
    setLoading(true);
    axios
      .post(`${BaseURL}auth/send-otp`, {
        phoneNumber,
      })
      .then(({ data }) => {
        setServerOtpKey(data);
        setStep("otp");
      })
      .catch((err) => {
        if (err.status == 406) {
          onClose();
          toast({
            title: "شما ثبت نام نکردید!",
            description: "لطفا برای استفاده از سرویس ثبت نام کنید.",
            status: "warning",
            position: "top",
          });
          navigate(RouteConst.register + "?phoneNumber=" + phoneNumber);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSetPhoneNumber = () => {
    handleSendOtp();
  };

  const handleReset = () => {
    setErrorMessage("");
    setPhoneNumber("");
    setStep("phoneNumber");
    setOtp("");
  };
  const handleVerifyOtp = async () => {
    const isManager = phoneNumber == "09000000001";
    loginUser({
      accessToken: "data.data.accessToken",
      refresh: "",
      fullName: isManager ? "آقا مدیره" : "مستاجر/مالک",
      role: isManager ? RoleEnum.MANAGER : RoleEnum.USER,
      phoneNumber:phoneNumber,
    });
    onClose();
    return navigate(
      isManager ? RouteConst.manageDashboard : RouteConst.userDashboard
    );

    return;
    setLoading(true);
    axios
      .post(`${BaseURL}auth/verify-otp`, {
        code: otp,
        phoneNumber,
      })
      .then(({ data }) => {
        const role = data.data.user.role;
        const shopName = data.data.user.shopName;
        const fullName =
          data.data.user.firstName + " " + data.data.user.lastName;
        toast({
          title: ` ${fullName} عزیز `,
          description: "ورود با موفقت انجام شد، خوش آمدید",
          status: "success",
          position: "top",
        });
        loginUser({
          accessToken: data.data.accessToken,
          refresh: "",
          fullName,
          role,
          phoneNumber: data.data.user.phoneNumber,
          ...(shopName && { shopName }),
        });
        onClose();
        if (role === RoleEnum.MANAGER)
          return navigate(RouteConst.manageDashboard);
        navigate(RouteConst.userDashboard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    otp,
    step,
    phoneNumber,
    setOtp,
    loading,
    setPhoneNumber,
    setLoading,
    handleReset,
    errorMessage,
    handleVerifyOtp,
    setErrorMessage,
    handleSetPhoneNumber,
  };
};
