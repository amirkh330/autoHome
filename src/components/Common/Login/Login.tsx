import BottomSheet from "@/components/CoreComponents/BottomSheet/BottomSheet";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useLogin } from "./Login.biz";
import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import { useEffect } from "react";
import { OtpStep } from "./otp";

interface ILogin {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const Login = ({ isOpen = true, onOpen, onClose }: ILogin) => {
  const {
    handleSetPhoneNumber,
    phoneNumber,
    setPhoneNumber,
    otp,
    loading,
    setLoading,
    step,
    errorMessage,
    handleReset,
    setOtp,
    handleVerifyOtp,
    setErrorMessage,
  } = useLogin(onClose);

  return (
    <BottomSheet
      title="ورود"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      {step === "phoneNumber" ? (
        <PhoneNumberStep
          loading={loading}
          phoneNumber={phoneNumber}
          setLoading={setLoading}
          setPhoneNumber={setPhoneNumber}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          handleSetPhoneNumber={handleSetPhoneNumber}
        />
      ) : (
        <OtpStep
          otp={otp}
          setOtp={setOtp}
          loading={loading}
          setLoading={setLoading}
          handleSendOtp={handleVerifyOtp}
        />
      )}
    </BottomSheet>
  );
};
const PhoneNumberStep = ({
  phoneNumber,
  setPhoneNumber,
  handleSetPhoneNumber,
  errorMessage,
  setErrorMessage,
  loading,
}: any) => {
  return (
    <Box
      color="amir.mainBg"
      p="4"
      display="flex"
      flexDirection="column"
      gap={"18px"}
    >
      <Flex mb="4" justifyContent={"center"}>
        <Text color={"amir.common"}>لطفا شماره موبایل خود را وارد کنید</Text>
      </Flex>
      <Input
        mb="4"
        placeholder="0912345678"
        dir="ltr"
        type="tel"
        maxLength={11}
        color="amir.common"
        _placeholder="amir.common"
        _focusVisible={{ borderColor: "amir.primary" }}
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(persianToEnglishNumbers(e.target.value));
          errorMessage && setErrorMessage("");
        }}
      />
      {errorMessage && (
        <Text mb="4" color="red">
          {errorMessage}
        </Text>
      )}
      <Button
        w={"100%"}
        color={"white"}
        bg={"amir.primary"}
        isLoading={loading}
        disabled={!phoneNumber}
        onClick={handleSetPhoneNumber}
      >
        ارسال
      </Button>
    </Box>
  );
};
