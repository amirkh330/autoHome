import { CustomModal } from "@/components/CoreComponents/CustomModal/CustomModal";
import { months } from "@/utils/common";
import { Toman } from "@/utils/Toman/Toman";
import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useGetVehicles } from "../query/getVehicle";
interface IConfirmModal {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  data: any;
  onConfirm: () => void;
}
export const ConfirmModal = ({
  isOpen,
  onClose,
  isLoading,
  data,
  onConfirm,
}: IConfirmModal) => {
  const { data: vehiclesList } = useGetVehicles();
  if (!data) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="تایید نهایی سفارش">
      <Box p={2} overflow={"auto"} maxH="70vh">
        <Box mb={3}>
          <Flex alignItems="center" gap="2" mb="4">
            <Text fontWeight="bold">شماره مشتری: </Text>
            <Text> {data.phoneNumber}</Text>
          </Flex>
          <Flex alignItems="center" gap="2" mb="4">
            <Text fontWeight="bold">نام و نام خانوادگی:</Text>
            <Text>
              {data.customer_firstName} {data.customer_lastName}
            </Text>
          </Flex>

          <Flex alignItems="center" gap="2" mb="4">
            <Text fontWeight="bold">خودرو:</Text>
            <Text>
              {vehiclesList?.data.find((v) => v.id == data.vehicle)?.title}
            </Text>
          </Flex>
        </Box>

        <Box mb={2}>
          <Text mb={2} fontWeight="bold">
            سرویس‌های انجام شده:
          </Text>
          {data.services?.map((s: any, index: number) => {
            return (
              <Flex alignItems="center" gap="2" key={s.serviceId} mb="4">
                <Text fontSize="12px">
                  {index + 1}- {s.title}{" "}
                </Text>
                {s.reminder && (
                  <Badge
                    fontSize="10px"
                    colorScheme="green"
                    px="2"
                    py="1"
                    borderRadius="50px"
                  >
                    {months.find((m) => m.value[0] === s.reminder)?.title}
                  </Badge>
                )}
              </Flex>
            );
          })}
        </Box>

        <Box mb={3}>
          <Flex alignItems="center" gap="2" mb="4">
            <Text fontWeight="bold">کیلومتر فعلی: </Text>
            <Text> {data.currentDistance} </Text>
          </Flex>

          <Flex alignItems="center" gap="2" mb="4">
            <Text fontWeight="bold">کیلومتر بعدی: </Text>
            <Text> {data.nextDistance}</Text>
          </Flex>
        </Box>

        <Box mb={3} gap="2">
          <Text fontWeight="bold">توضیحات: </Text>
          <Text> {data.description || "---"}</Text>
        </Box>

        <Text mb={2} fontWeight="bold">
          مبلغ نهایی:{" "}
        </Text>

        <Box mb={3} border={"1px dashed"} borderColor={"gray.300"} p={2}>
          <Text fontWeight="bold">{Toman(data.price)} </Text>
        </Box>
      </Box>
      <Flex mt={4} justifyContent="flex-end" gap={3}>
        <Button w="100%" onClick={onClose}>
          انصراف
        </Button>
        <Button w="100%" colorScheme="blue" isLoading={isLoading} onClick={onConfirm}>
          تایید
        </Button>
      </Flex>
    </CustomModal>
  );
};
