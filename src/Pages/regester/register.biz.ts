import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BaseURL } from "@/utils/common";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RouteConst } from "@/utils/allRoutes.type";

type FormType = yup.InferType<typeof schema>;

export const useRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [search] = useSearchParams(window.location.href);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (search.get("phoneNumber")) {
      setValue("phoneNumber", search.get("phoneNumber") as string);
    }
  }, [search]);

  const onSubmit = (data: FormType) => {
    setLoading(true);
    axios
      .post(`${BaseURL}auth/sign-up/shop`, data)
      .then(() => {
        toast({
          title: "ثبت نام با موفقیت انجام شد",
          description: "لطفا مجدد وارد شوید",
          status: "success",
          position: "top",
        });
        navigate(RouteConst.login);
      })
      .finally(() => setLoading(false));
  };

  return {
    onSubmit,
    register,
    errors,
    isSubmitting,
    handleSubmit,
    setValue,
    loading,
  };
};

const schema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phoneNumber: yup
    .string()
    .required("شماره تلفن الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  shopName: yup.string().required("نام مغازه الزامی است"),
  address: yup.string().required("آدرس مغازه الزامی است"),
  location: yup
    .object({
      lat: yup.number().required("عرض جغرافیایی الزامی است"),
      lng: yup.number().required("طول جغرافیایی الزامی است"),
    })
    .required("موقعیت الزامی است"),
});
