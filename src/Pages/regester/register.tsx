import Map from "@/components/CoreComponents/Map/Map";
import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRegister } from "./register.biz";

export const Register = () => {
  const {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit,
    setValue,
    loading,
  } = useRegister();
  return (
    <Box
      width="100%"
      minH="80dvh"
      bg="amir.mainBg"
      color="amir.common"
      px="4"
      py="6"
    >
      <Text fontSize="22px" fontWeight="bold" mb="6" color="amir.primary">
        ثبت‌نام مغازه‌دار
      </Text>
      <Text mt="3" fontSize="15px" mb="6">
        شما بعد از ثبت نام موفق به مغازه‌داری خود وارد شوید و از تمام امکانات
        سایت استفاده کنید
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          {/* نام */}
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>نام</FormLabel>
            <Input
              {...register("firstName")}
              placeholder="نام"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          {/* نام خانوادگی */}
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>نام خانوادگی</FormLabel>
            <Input
              {...register("lastName")}
              placeholder="نام خانوادگی"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>

          {/* تلفن */}
          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormLabel>شماره تلفن</FormLabel>
            <Input
              {...register("phoneNumber")}
              onChange={(e) =>
                setValue("phoneNumber", persianToEnglishNumbers(e.target.value))
              }
              placeholder="مثلاً 09123456789"
              dir="ltr"
              type="tel"
              maxLength={11}
              bg="amir.secondaryBg"
              border="1px solid #555"
              inputMode="numeric"
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>

          {/* اسم مغازه */}
          <FormControl isInvalid={!!errors.shopName}>
            <FormLabel>اسم مغازه</FormLabel>
            <Input
              {...register("shopName")}
              placeholder="اسم مغازه"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.shopName?.message}</FormErrorMessage>
          </FormControl>

          {/* آدرس مغازه */}
          <FormControl isInvalid={!!errors.address}>
            <FormLabel>آدرس مغازه</FormLabel>
            <Textarea
              {...register("address")}
              placeholder="آدرس کامل مغازه"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.location}>
            <FormLabel>موقعیت مغازه</FormLabel>
            <Map setNewPin={(e) => setValue("location", e as any)} />
            {errors.location?.lat || errors.location?.lng ? (
              <FormErrorMessage>
                انتخاب موقعیت جغرافیایی الزامی است{" "}
              </FormErrorMessage>
            ) : null}
          </FormControl>

          {/* دکمه ثبت */}
          <Button
            type="submit"
            width="100%"
            bg="amir.primary"
            color="white"
            fontWeight="bold"
            size="lg"
            isLoading={loading}
            _hover={{ bg: "#ffca3a" }}
          >
            ثبت‌نام
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
