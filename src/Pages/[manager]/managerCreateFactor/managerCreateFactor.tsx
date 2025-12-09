import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Switch,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { CustomDatePicker } from "@/components/CoreComponents/CustomDatePicker/CustomDatePicker";

// ================== 🔥 Yup Schema ==================
const schema = yup
  .object({
    title: yup.string().required("وارد کردن عنوان الزامی است"),
    for: yup.string().nullable(),
    amount: yup
      .number()
      .typeError("فقط عدد وارد کنید")
      .required("مبلغ الزامی است")
      .min(1000, "حداقل مبلغ باید ۱,۰۰۰ باشد"),
    splitType: yup
      .string()
      .oneOf(["equal", "area", "people", "parking"])
      .required("انتخاب نوع تقسیم الزامی است"),
    unitsSelect: yup.string().oneOf(["all", "full", "empty", "custom"]),
    vendor: yup.string().nullable(),
    date: yup.string().nullable(),
    description: yup.string().nullable(),
    sendSMS: yup.boolean().default(false),
  })
  .required();

// ================== 🔥 Form Types ==================
export type TManagerCreateFactor = yup.InferType<typeof schema>;

// ================== 🔥 Component ==================
export const ManagerCreateFactor = () => {
  const [unitsCount] = useState(10); // TODO: دریافت داینامیک از دیتابیس

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TManagerCreateFactor>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      splitType: "equal",
      unitsSelect: "all",
      sendSMS: false,
    },
  });

  const splitType = watch("splitType");
  const totalAmount = watch("amount");
  const perUnit =
    splitType === "equal" && totalAmount ? totalAmount / unitsCount : 0;

  const onSubmit = (data: TManagerCreateFactor) => {
    console.log("✔️ Form Submited:", data);
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        ایجاد فاکتور
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ====== عنوان ====== */}
        <FormControl mb={4} isInvalid={!!errors.title}>
          <FormLabel>عنوان فاکتور</FormLabel>
          <Input
            bg={"white"}
            {...register("title")}
            placeholder="مثال: قبض آب"
          />
          <Text color="red.500" fontSize="sm">
            {errors.title?.message}
          </Text>
        </FormControl>

        {/* ====== بابت ====== */}
        <FormControl mb={4}>
          <FormLabel>بابت چه موردی؟</FormLabel>
          <Input
            bg={"white"}
            {...register("for")}
            placeholder="مثلاً: تعمیر آسانسور"
          />
        </FormControl>

        {/* ====== مبلغ ====== */}
        <FormControl mb={4} isInvalid={!!errors.amount}>
          <FormLabel>مبلغ کل</FormLabel>
          <Input
            bg={"white"}
            type="number"
            {...register("amount")}
            placeholder="مثلاً: 5,000,000"
          />
          <Text color="red.500" fontSize="sm">
            {errors.amount?.message}
          </Text>
        </FormControl>

        {/* ====== نوع تقسیم ====== */}
        <FormControl mb={4}>
          <FormLabel>نوع تقسیم هزینه</FormLabel>
          <Select bg={"white"} {...register("splitType")}>
            <option value="equal">تقسیم مساوی</option>
            <option value="area">بر اساس متراژ</option>
            <option value="people">بر اساس تعداد ساکنین</option>
            <option value="parking">بر اساس تعداد پارکینگ</option>
          </Select>
        </FormControl>

        {splitType === "equal" && (
          <Box bg="gray.50" p={3} rounded="md" borderWidth={1} mb={4}>
            <Text>تعداد واحدها: {unitsCount}</Text>
            <Text>سهم هر واحد: {perUnit.toLocaleString()} تومان</Text>
          </Box>
        )}

        <Divider my={6} />

        {/* ====== انتخاب واحدها ====== */}
        <FormControl mb={4}>
          <FormLabel>انتخاب واحدها</FormLabel>
          <Controller
            name="unitsSelect"
            control={control}
            render={({ field }) => (
              <RadioGroup  {...field}>
                <Stack direction="row">
                  <Radio value="all">همه واحدها</Radio>
                  <Radio value="full">واحدهای پر</Radio>
                  <Radio value="empty">واحدهای خالی</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>

        {/* ====== پیمانکار ====== */}
        <FormControl mb={4}>
          <FormLabel>فروشنده / پیمانکار</FormLabel>
          <Input
            {...register("vendor")}
            bg={"white"}
            placeholder="مثلاً: شرکت آسانسور پارس"
          />
        </FormControl>

        {/* ====== تاریخ ====== */}
        <FormControl mb={4}>
          <FormLabel>تاریخ</FormLabel>
          <CustomDatePicker
            setValue={(e: any) => setValue("date", e)}
            value={watch("date")}
          />
          {/* <Input type="date" {...register("date")} /> */}
        </FormControl>

        {/* ====== توضیحات ====== */}
        <FormControl mb={4}>
          <FormLabel>توضیحات</FormLabel>
          <Textarea
            bg={"white"}
            {...register("description")}
            placeholder="توضیحات تکمیلی..."
          />
        </FormControl>

        {/* ====== پیامک ====== */}
        <FormControl display="flex" alignItems="center" mb={6}>
          <FormLabel mb="0">ارسال پیامک برای واحدها</FormLabel>
          <Switch {...register("sendSMS")} />
        </FormControl>

        {/* ====== دکمه ثبت ====== */}
        <Button type="submit" colorScheme="teal" size="lg" w="full">
          ثبت فاکتور
        </Button>
      </form>
    </Box>
  );
};
