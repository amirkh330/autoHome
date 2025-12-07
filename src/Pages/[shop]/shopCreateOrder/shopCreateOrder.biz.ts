import { useDisclosure, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import { set, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetInstrument } from "../query/getInstrument";
import { useGetServices } from "../query/getServices";
import { useGetUserExist } from "../query/getUserExist";
import { useGetVehicles } from "../query/getVehicle";
import { useCreateOrder } from "../query/postCreateOrder";
import { ReminderDateEnum } from "@/utils/common";

export const useShopCreateOrder = () => {
  const toast = useToast();

  const {
    isOpen: isOpenPhoneNumber,
    onOpen: onOpenPhoneNumber,
    onClose: onClosePhoneNumber,
  } = useDisclosure({ defaultIsOpen: true });

  const [searchService, setSearchService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpenReminder, setIsOpenReminder] = useState<{
    title: string;
    serviceId: string;
  } | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [visibleConfirmModal, setVisibleConfirmModal] =
    useState<boolean>(false);

  const { data: vehiclesList } = useGetVehicles();
  const { data: serviceList } = useGetServices(searchService);

  const { mutateAsync: createOrderApi, isPending } = useCreateOrder();
  const { mutateAsync: getUserExist, isPending: userExistLoading } =
    useGetUserExist();

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      services: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = (data: FormType) => {
    const payload = {
      ...data,
      services: data?.services,
      price: data.price.replace(/,/g, ""),
      vehicle: Number(data.vehicle),
      currentDistance: data.currentDistance.replace(/,/g, ""),
      nextDistance: data.nextDistance.replace(/,/g, ""),
    };
    createOrderApi(payload as any).then(() => {
      setVisibleConfirmModal(false);
      reset();
      remove();
      toast({
        title: "سرویس با موفقیت ثبت شد",
        status: "success",
        position: "top",
      });
    });
  };

  const handleSelectPhoneNumber = () => {
    setIsDisabled(false);
    getUserExist({ phoneNumber })
      .then(({ data }) => {
        setIsDisabled(true);
        reset({
          phoneNumber: data.phoneNumber,
          customer_firstName: data.firstName,
          customer_lastName: data.lastName,
        });
        onClosePhoneNumber();
      })
      .catch(() => {
        // toast({
        //   title: "کاربری با این شماره یافت نشد",
        //   description: "لطفا اطلاعات مشتری را وارد نمایید",
        //   status: "warning",
        //   position: "top",
        // });
        reset({
          phoneNumber: phoneNumber,
        });
        onClosePhoneNumber();
      });
  };

  const isActiveReminder = useMemo(
    () => () => {
      return Boolean(fields.find((item) => item.reminder));
    },
    [fields]
  );

  const handleReminder = (field: {
    title: string;
    serviceId: string;
    reminder?: ReminderDateEnum;
  }) => {
    if (field.reminder) {
      setValue(
        "services",
        fields?.map((item) => {
          if (item.serviceId === field.serviceId) {
            return {
              title: item.title,
              serviceId: item.serviceId,
              id: item.id,
            };
          }
          return item;
        })
      );
    } else {
      setIsOpenReminder(field);
    }
  };

  const handleSaveReminder = (
    field: { title: string; serviceId: string; reminder?: ReminderDateEnum },
    type: string
  ) => {
    setValue(
      "services",
      fields.map((item) => {
        if (item.serviceId === field.serviceId) {
          return {
            ...item,
            reminder: type,
          };
        }
        return item;
      })
    );
    setIsOpenReminder(null);
  };

  const handleDelete = (index: number) => {
    const item = fields[index];
    if (item.reminder) {
      setIsOpenReminder(null);
    }
    remove(index);
  };
  return {
    register,
    isDisabled,
    control,
    isActiveReminder,
    handleSubmit,
    setIsOpenReminder,
    handleSaveReminder,
    visibleConfirmModal,
    setVisibleConfirmModal,
    setValue,
    errors,
    isSubmitting,
    fields,
    append,
    remove,
    watch,
    onSubmit,
    vehiclesList,
    isPending,
    searchService,
    setSearchService,
    isOpenReminder,
    phoneNumber,
    setPhoneNumber,
    handleSelectPhoneNumber,
    serviceList,
    isOpenPhoneNumber,
    onOpenPhoneNumber,
    onClosePhoneNumber,
    handleReminder,
    handleDelete,
  };
};

const schema = yup.object({
  phoneNumber: yup
    .string()
    .required("شماره مشتری الزامی است")
    .matches(/^09\d{9}$/, "شماره مشتری معتبر نیست"),

  customer_firstName: yup.string().optional(),
  customer_lastName: yup.string().optional(),

  vehicle: yup.string().required("نام خودرو الزامی است"),

  services: yup.array().of(
    yup.object({
      serviceId: yup.string().required("نام قطعه الزامی است"),
      title: yup.string().required("نام قطعه الزامی است"),
      reminder: yup.string().optional(),
    })
  ),

  currentDistance: yup
    .string()
    .typeError("باید عدد باشد")
    .required("کیلومتر فعلی الزامی است"),

  nextDistance: yup
    .string()
    .typeError("باید عدد باشد")
    .required("کیلومتر بعدی الزامی است"),

  description: yup.string().optional(),

  price: yup.string().typeError("باید عدد باشد").required("مبلغ الزامی است"),
});

type FormType = yup.InferType<typeof schema>;
