import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import BottomSheet from "@/components/CoreComponents/BottomSheet/BottomSheet";
import { SearchSelect } from "@/components/CoreComponents/SearchSelect/searchSelect";
import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import { formatNumber } from "@/utils/Toman/Toman";
import { Bell, BellRinging, Trash, TrashSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { useShopCreateOrder } from "./shopCreateOrder.biz";
import { set } from "react-hook-form";
import { months, ReminderDateEnum } from "@/utils/common";
import { ConfirmModal } from "../confirmModal/confirmModal";
import { useNavigate } from "react-router-dom";

export const ShopCreateOrder = () => {
  const {
    append,
    handleDelete,
    fields,
    register,
    isSubmitting,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    setValue,
    vehiclesList,
    isDisabled,
    isPending,
    isOpenReminder,
    handleSaveReminder,
    setIsOpenReminder,
    phoneNumber,
    setPhoneNumber,
    isActiveReminder,
    handleSelectPhoneNumber,
    serviceList,
    isOpenPhoneNumber,
    onOpenPhoneNumber,
    searchService,
    setSearchService,
    handleReminder,
    visibleConfirmModal,
    setVisibleConfirmModal,
  } = useShopCreateOrder();

  return (
    <Box bg="amir.mainBg" color="amir.common" px="4" py="6" minH="100dvh">
      <Text fontSize="22px" fontWeight="bold" mb="6" color="amir.primary">
        ساخت سرویس جدید
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          {/* شماره مشتری */}
          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormLabel>شماره مشتری</FormLabel>
            <Input
              {...register("phoneNumber")}
              maxLength={11}
              disabled={true}
              onChange={(e) =>
                setValue("phoneNumber", persianToEnglishNumbers(e.target.value))
              }
              placeholder="09123456789"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>

          {/* نام */}
          <FormControl isInvalid={!!errors.customer_firstName}>
            <FormLabel>نام مشتری </FormLabel>
            <Input
              {...register("customer_firstName")}
              disabled={isDisabled}
              placeholder="نام"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>
              {errors.customer_firstName?.message}
            </FormErrorMessage>
          </FormControl>

          {/* نام خانوادگی */}
          <FormControl isInvalid={!!errors.customer_lastName}>
            <FormLabel>نام خانوادگی مشتری </FormLabel>
            <Input
              {...register("customer_lastName")}
              placeholder="نام خانوادگی"
              disabled={isDisabled}
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>
              {errors.customer_lastName?.message}
            </FormErrorMessage>
          </FormControl>

          {/* نام خودرو */}
          <FormControl isInvalid={!!errors.vehicle}>
            <FormLabel>نام خودرو</FormLabel>
            <Select
              {...register("vehicle")}
              placeholder="انتخاب کنید"
              bg="amir.secondaryBg"
            >
              {vehiclesList?.data?.map((vehicle) => {
                return (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.title} hg
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{errors.vehicle?.message}</FormErrorMessage>
          </FormControl>

          <Box width="100%">
            <Text mb="2" fontWeight="600">
              سرویس های انجام شده
            </Text>

            <SearchSelect
              value={searchService}
              onChange={() => {}}
              onSearch={setSearchService}
              options={
                serviceList?.filter(
                  (service) =>
                    !fields.map((f) => Number(f.serviceId)).includes(service.id)
                ) || []
              }
              onSelect={(item) => {
                append({
                  serviceId: item.id,
                  title: item.title,
                });
              }}
            />

            {fields.map((field, index) => {
              return (
                <HStack key={field.serviceId} mb="3" align="center">
                  <Box
                    flex="1"
                    bg="amir.secondaryBg"
                    px="3"
                    py="2"
                    borderRadius="6px"
                    border="1px solid #555"
                  >
                    <Text fontSize="14px">{field.title}</Text>
                  </Box>
                  <IconButton
                    aria-label="notification"
                    icon={
                      <BellRinging
                        fill={field.reminder ? "#2bb15cff" : "black"}
                        weight={field.reminder ? "fill" : "bold"}
                      />
                    }
                    size="sm"
                    onClick={() => handleReminder(field as any)}
                  />
                  <IconButton
                    aria-label="delete"
                    icon={<Trash />}
                    size="sm"
                    onClick={() => handleDelete(index)}
                  />
                </HStack>
              );
            })}
          </Box>

          {/* کیلومتر فعلی */}
          <FormControl isInvalid={!!errors.currentDistance}>
            <FormLabel>کیلومتر فعلی</FormLabel>
            <InputGroup>
              <InputRightElement pointerEvents="none" mx="2">
                km
              </InputRightElement>
              <Input
                {...register("currentDistance")}
                value={formatNumber(watch("currentDistance"))}
                onChange={(e) => {
                  const raw = persianToEnglishNumbers(e.target.value).replace(
                    /,/g,
                    ""
                  );
                  setValue("currentDistance", raw);
                }}
                placeholder="مثلاً 150000"
                bg="amir.secondaryBg"
                inputMode="numeric"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.currentDistance?.message}
            </FormErrorMessage>
          </FormControl>

          {/* کیلومتر بعدی */}
          <FormControl isInvalid={!!errors.nextDistance}>
            <FormLabel>کیلومتر بعدی</FormLabel>
            <InputGroup>
              <InputRightElement pointerEvents="none" mx="2">
                km
              </InputRightElement>
              <Input
                {...register("nextDistance")}
                value={formatNumber(watch("nextDistance"))}
                onChange={(e) => {
                  const raw = persianToEnglishNumbers(e.target.value).replace(
                    /,/g,
                    ""
                  );
                  setValue("nextDistance", raw);
                }}
                placeholder="مثلاً 160000"
                bg="amir.secondaryBg"
                inputMode="numeric"
              />
            </InputGroup>
            <FormErrorMessage>{errors.nextDistance?.message}</FormErrorMessage>
          </FormControl>

          {/* توضیحات */}
          <FormControl>
            <FormLabel>توضیحات برای دفعه بعدی</FormLabel>
            <Textarea
              {...register("description")}
              placeholder="یادداشت..."
              bg="amir.secondaryBg"
              rows={3}
            />
          </FormControl>

          {/* مبلغ نهایی */}
          <FormControl isInvalid={!!errors.price}>
            <FormLabel>مبلغ نهایی</FormLabel>
            <InputGroup>
              <InputRightElement pointerEvents="none" mx="4">
                تومان
              </InputRightElement>
              <Input
                {...register("price")}
                value={formatNumber(watch("price"))}
                onChange={(e) => {
                  const raw = persianToEnglishNumbers(e.target.value).replace(
                    /,/g,
                    ""
                  );
                  setValue("price", raw);
                }}
                placeholder="مثلاً 450000"
                bg="amir.secondaryBg"
                inputMode="numeric"
              />
            </InputGroup>
            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
          </FormControl>

          {/* دکمه ثبت */}
          <Button
            onClick={() => setVisibleConfirmModal(true)}
            width="100%"
            bg="amir.primary"
            color="white"
            fontWeight="bold"
            size="lg"
            _hover={{ bg: "#ffca3a" }}
          >
            ثبت سرویس
          </Button>
        </VStack>
        <BottomSheetReminder
          isOpen={isOpenReminder}
          onOpen={() => {}}
          handleSaveReminder={handleSaveReminder}
          onClose={() => setIsOpenReminder(null)}
        />
        <ConfirmModal
          isLoading={isPending}
          isOpen={visibleConfirmModal}
          onClose={() => setVisibleConfirmModal(false)}
          data={{
            ...watch(),
          }}
          onConfirm={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </form>
      <BottomSheetPhoneNumber
        onOpen={onOpenPhoneNumber}
        isOpen={isOpenPhoneNumber}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        isPending={isPending}
        handleSelectPhoneNumber={handleSelectPhoneNumber}
      />
    </Box>
  );
};

const BottomSheetPhoneNumber = ({
  onOpen,
  isOpen,
  setPhoneNumber,
  phoneNumber,
  isPending,
  handleSelectPhoneNumber,
}: any) => {
  const navigate = useNavigate();
  return (
    <BottomSheet
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={() => navigate(-1)}
      showCloseButton={false}
      title="انتخاب شماره مشتری"
    >
      <Box
        // color="amir.mainBg"
        p="4"
        display="flex"
        flexDirection="column"
        gap={"18px"}
      >
        <Flex mt="4" mx="0" flexDirection={"column"} gap="12px">
          <Text color={"amir.common"} textAlign={"start"} fontSize={"16px"}>
            لطفا شماره موبایل مشتری را وارد کنید
          </Text>
          <Text color={"amir.common"} textAlign={"start"} fontSize={"12px"}>
            مثال : ۰۹۱۲۳۴۵۶۷۸۹
          </Text>
        </Flex>
        <Input
          maxLength={11}
          onChange={(e) =>
            setPhoneNumber(persianToEnglishNumbers(e.target.value))
          }
          value={phoneNumber}
          placeholder="09123456789"
          bg="amir.secondaryBg"
        />
        <Button
          bg="amir.primary"
          color={"white"}
          disabled={isPending || !/^09\d{9}$/.test(phoneNumber)}
          onClick={handleSelectPhoneNumber}
        >
          ایجاد سرویس
        </Button>
      </Box>
    </BottomSheet>
  );
};

export default function BottomSheetReminder({
  onOpen,
  isOpen,
  onClose,
  handleSaveReminder,
}: any) {
  const [newType, setNewType] = useState("");

  return (
    <BottomSheet
      onOpen={onOpen}
      isOpen={!!isOpen}
      onClose={() => {
        onClose();
        setNewType("");
      }}
      showCloseButton={false}
      title="یادآوری"
    >
      <Box p="4" display="flex" flexDirection="column" gap="18px">
        <Flex alignItems="start" w="auto">
          <Text textAlign={"start"} mx="0" mb="0" w="auto">
            شما در حال ایجاد یادآوری برای{" "}
            <Text fontSize={"18px"} as="span" w="auto" color="blue.500">
              {isOpen?.title}
            </Text>{" "}
            هستید.
          </Text>
        </Flex>

        <Text fontSize={"14px"} textAlign={"start"} mx="0" mb="0" w="auto">
          دوره زمانی یادآوری برای مراجعه یعدی را مشخص کنید:
        </Text>

        <Select
          placeholder="زمان یادآوری را انتخاب کنید"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        >
          {months.map((month) => {
            return (
              <option key={month.title} value={month.value}>
                {month.title}
              </option>
            );
          })}
        </Select>

        <Button
          bg="amir.primary"
          color="white"
          onClick={() => {
            handleSaveReminder(isOpen, newType);
            onClose();
            setNewType("");
          }}
        >
          ذخیره
        </Button>
      </Box>
    </BottomSheet>
  );
}
