import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { TBuilding } from "./managerApartments.type";


export const useManagerApartments = () => {
  const unitRefs = useRef<HTMLDivElement[]>([]);
  const { register, control, handleSubmit, watch } = useForm<TBuilding>({
    resolver: yupResolver(schema),
    defaultValues: {
      units: Array.from({ length: 10 }).map(() => ({
        name: "",
        phone: "",
        area: 0,
        people: 1,
        parking: 1,
        type: "owner",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "units",
  });

  const onSubmit = (data: TBuilding) => {
    console.log("🏢 Building Data:", data);
  };

  return {
    unitRefs,
    register,
    control,
    handleSubmit,
    watch,
    fields,
    onSubmit,
  };
};

// ===

const schema = yup.object({
  units: yup
    .array()
    .of(
      yup.object({
        residencyType: yup.mixed<"owner" | "tenant" | "both">().required(),

        owner: yup
          .object({
            fullName: yup.string().required(),
            phone: yup.string().required(),
          })
          .optional() // optional = می‌تواند undefined باشد
          .when("residencyType", {
            is: (val: any) => val === "owner" || val === "both",
            then: (schema) => schema.required("اطلاعات مالک الزامی است"),
          }),

        tenant: yup
          .object({
            fullName: yup.string().required(),
            phone: yup.string().required(),
          })
          .optional()
          .when("residencyType", {
            is: (val: any) => val === "tenant" || val === "both",
            then: (schema) => schema.required("اطلاعات مستاجر الزامی است"),
          }),

        area: yup.number().required("متراژ الزامی است"),
        people: yup.number().required("تعداد نفرات الزامی است"),
        parking: yup.number().required("تعداد پارکینگ الزامی است"),
      })
    )
    .required()
    .min(1),
});
