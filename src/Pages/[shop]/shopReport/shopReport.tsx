import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import BottomSheet from "@/components/CoreComponents/BottomSheet/BottomSheet";
import CustomSelect from "@/components/CoreComponents/CustomSelect/customSelect";
import { ShopOrderCard } from "@/components/CoreComponents/ShopOrderCard/ShopOrderCard";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useGetMyOrders } from "../query/getMyOrders";
import { useGetMyCustomers } from "../query/getCustomers";
import { useState } from "react";

export const ShopReports = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetMyOrders();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: myCustomer, isLoading: loadingMyCustomer } =
    useGetMyCustomers("");

  return (
    <Box p="4" color="amir.common" pt="0">
      <Flex align="center" justifyContent="space-between" py="4">
        <Text fontWeight="700" fontSize="lg">
          سوابق سرویس‌ها
        </Text>
        {/* <Button size="sm" color="white" bg={"amir.accent"} onClick={onOpen}>
          فیلتر
        </Button> */}
      </Flex>

      <VStack spacing="4">
        {isLoading ? (
          <Spinner />
        ) : data?.length ? (
          data.map((item) => <ShopOrderCard key={item.id} item={item} />)
        ) : (
          <EmptyState />
        )}
      </VStack>
      <BottomSheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"فیلرسفارش مشتری"}
      >
        <Box p="4">
          <VStack gap={2} alignItems="start">
            <Text>مشتری</Text>
            <CustomSelect
              onChange={(e) => console.log(e)}
              // options={[]}
              options={
                myCustomer?.map((item) => ({
                  value: item.id,
                  label: item.firstName + " " + item.lastName,
                })) ?? []
              }
              loading={loadingMyCustomer}
            />
          </VStack>
        </Box>
      </BottomSheet>
    </Box>
  );
};



