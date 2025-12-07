import { IMyOrder } from "@/Pages/[customer]/query/getMyOrderList";
import { formatNumber, Toman } from "@/utils/Toman/Toman";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionBox = motion(Box);

export const ShopOrderCard = ({ item }: { item: IMyOrder }) => {
  const dt = new Date(item?.createdAt ?? "");
  const date = dt.toLocaleDateString("fa-IR");
  const time = dt.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const fullName = `${item?.user?.firstName} ${item?.user?.lastName}`;

  return (
    <MotionBox
      key={item?.id}
      p="5"
      bg="amir.secondaryBg"
      borderRadius="16px"
      shadow="md"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      w="100%"
    >
      {/* عنوان */}
      <HStack
        justify="space-between"
        mb="4"
        borderBottom="1px solid"
        borderColor="amir.secondaryVariant"
        pb={"2"}
      >
        <Text fontWeight="700">{fullName}</Text>
        <Text fontSize="xs">
          {time} - {date}
        </Text>
      </HStack>

      {/* ردیف کیلومتر + مبلغ */}
      <VStack alignItems={"start"} mb="3">
        <HStack
          spacing="0"
          justifyContent="space-between"
          align="start"
          mx="0"
          w="100%"
          my="1"
        >
          <Text fontWeight="600" color="amir.secondaryVariant">
            کیلومتر موقع سرویس
          </Text>
          <Text fontSize="xs">
            {formatNumber(Number(item?.currentDistance))} km
          </Text>
        </HStack>

        <HStack
          spacing="0"
          justifyContent="space-between"
          align="start"
          mx="0"
          w="100%"
          my="1"
        >
          <Text fontWeight="600" color="amir.secondaryVariant">
            کیلومتر بعدی
          </Text>
          <Text fontSize="xs">
            {formatNumber(Number(item?.nextDistance))} km
          </Text>
        </HStack>

        <HStack
          spacing="0"
          justifyContent="space-between"
          align="start"
          mx="0"
          w="100%"
          my="1"
        >
          <Text fontWeight="600" color="amir.secondaryVariant">
            مبلغ
          </Text>
          <Text fontSize="xs">{Toman(Number(item?.price))}</Text>
        </HStack>

        <HStack
          spacing="0"
          justifyContent="space-between"
          align="start"
          mx="0"
          w="100%"
          my="1"
        >
          <Text fontWeight="600" color="amir.secondaryVariant">
            وسیله نقلیه
          </Text>
          <Text fontSize="xs">{item?.vehicle?.title}</Text>
        </HStack>

        <HStack
          spacing="0"
          justifyContent="space-between"
          align="start"
          mx="0"
          w="100%"
          my="1"
        >
          <Text fontWeight="600" color="amir.secondaryVariant">
            شماره تلفن
          </Text>
          <Text fontSize="xs">{item?.user?.phoneNumber}</Text>
        </HStack>
      </VStack>

      {/* آکاردئون */}
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            bg="amir.mainBg"
            borderRadius="10px"
            _expanded={{ bg: "amir.mainBg" }}
            py="2"
          >
            <Box flex="1" textAlign="right" fontWeight="600">
              جزئیات
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <VStack alignItems={"start"} mb="4">
              <Text fontSize={"16px"} fontWeight="600">
                سرویس‌های انجام شده:
              </Text>

              {item?.services?.map?.((p, idx) => (
                <HStack key={idx} mx="0" my="2">
                  <Text fontSize={"14px"}>
                    {" "}
                    {idx + 1} - {p.title}
                  </Text>
                </HStack>
              ))}
            </VStack>

            <VStack alignItems={"start"}>
              <Text fontSize={"16px"} fontWeight="600">
                توضیحات:
              </Text>
              <Text fontSize={"14px"} color="amir.secondaryVariant">
                {item?.description || "-"}
              </Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </MotionBox>
  );
};
