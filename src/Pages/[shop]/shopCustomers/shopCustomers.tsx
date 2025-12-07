import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { Loading } from "@/components/CoreComponents/Loading/Loading";
import { Box, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { Phone } from "@phosphor-icons/react";
import { useShopCustomers } from "./shopCustomers.biz";
import { VehicleTags } from "./tags";

export const ShopCustomers = () => {
  const { data, isLoading, value, setValue } = useShopCustomers();
  return (
    <Box p="4" color="amir.common">
      {/* Search */}
      <Input
        placeholder="جستجو بر اساس نام یا شماره"
        bg="amir.secondaryBg"
        border="none"
        mb="4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <VStack spacing="4" width="100%">
        {isLoading ? (
          <Loading />
        ) : data?.length ? (
          data?.map((item) => (
            <Box
              key={item.id}
              w="100%"
              gap={4}
              bg="amir.secondaryBg"
              borderRadius="16px"
              py="2"
              px="3"
              mb="2"
              shadow="sm"
              _hover={{ shadow: "md", transform: "scale(1.01)" }}
              transition="all 0.2s"
            >
              {/* هدر کارت: نام + تگ وضعیت */}
              <Flex
                justifyContent="space-between"
                align="center"
                gap={3}
                mb={2}
              >
                <Flex align="center" m={0} gap={2}>
                  <Text fontWeight="700" fontSize="md" noOfLines={1}>
                    {item.firstName} {item.lastName}
                  </Text>
                </Flex>
                <Flex
                  as="a"
                  href={`tel:${item.phoneNumber}`}
                  align="center"
                  justify="space-between"
                  gap={2}
                  m={0}
                >
                  <Text
                    color="amir.primary"
                    fontWeight="600"
                    fontSize="sm"
                    noOfLines={1}
                  >
                    {item.phoneNumber}
                  </Text>
                  <Phone color="amir.primary" />
                </Flex>
              </Flex>

              <VehicleTags vehicles={item?.vehicle} />
            </Box>
          ))
        ) : (
          <EmptyState />
        )}
      </VStack>
    </Box>
  );
};
