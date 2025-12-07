import { RouteConst } from "@/utils/allRoutes.type";
import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { Calendar, CurrencyDollar, Toolbox, User } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IShopDashboard, useGetShopDashboard } from "../query/getShopDashboard";
import { Loading } from "@/components/CoreComponents/Loading/Loading";
import { Toman } from "@/utils/Toman/Toman";

const MotionBox = motion(Box);

// Mock Data
const customersCount = 120;
const servicesToday = 5;
const servicesWeek = 18;

const stats = [
  {
    label: "تعداد کل مشتریان",
    value: "totalCustomers",
    icon: User,
  },
  {
    label: "سرویس‌های امروز",
    value: "todayService",
    icon: Toolbox,
  },
  {
    label: "سرویس‌های هفته",
    value: "weekService",
    icon: Calendar,
  },
  {
    label: "سرویس‌های ماهانه",
    value: "monthService",
    icon: Calendar,
  },
];
export const ShopDashboard = () => {
  const { data, isLoading } = useGetShopDashboard();
  return (
    <Box p="4" color="amir.common" minH="0dvh">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack spacing="2" mb="6" w="100%" flexWrap="wrap">
            {stats.map((item, index) => (
              <MotionBox
                key={index}
                bg="amir.secondaryBg"
                w="48%"
                m="0"
                p="4"
                py="2"
                borderRadius="18px"
                shadow="md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <Flex justify="space-between" align="center">
                  <Flex direction="column" m="0" w={"100%"}>
                    <Text fontSize="sm" color="amir.secondary">
                      {item.label}
                    </Text>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      w="100%"
                      mt="4"
                    >
                      <Text
                        fontSize="2xl"
                        fontWeight="700"
                        color="amir.common"
                        mt="1"
                      >
                        {data?.[item.value as keyof IShopDashboard]}
                      </Text>

                      <Flex
                        bg="amir.secondary"
                        w="50px"
                        h="50px"
                        borderRadius="14px"
                        align="center"
                        justify="center"
                        shadow="sm"
                        m="0"
                      >
                        <Icon
                          w={"20px"}
                          h="20px"
                          as={item.icon}
                          color="white"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </MotionBox>
            ))}
          </HStack>

          <MotionBox
            bg="amir.secondaryBg"
            w="100%"
            p="5"
            mb="6"
            borderRadius="18px"
            shadow="md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 2 * 0.08 }}
          >
            <Flex justify="space-between" align="center">
              <Flex direction="column" m="0">
                <Text fontSize="sm" color="amir.secondary">
                  درآمد روزانه
                </Text>
                <Text
                  fontSize="2xl"
                  fontWeight="700"
                  color="amir.common"
                  mt="1"
                >
                  {Toman(data?.todayIncome!)}
                </Text>
              </Flex>

              <Flex
                bg="amir.secondary"
                w="50px"
                h="50px"
                borderRadius="14px"
                align="center"
                justify="center"
                shadow="sm"
                m="0"
              >
                <Icon as={CurrencyDollar} size={28} color="white" />
              </Flex>
            </Flex>
          </MotionBox>

          <MotionBox
            bg="amir.secondaryBg"
            w="100%"
            p="5"
            mb="6"
            borderRadius="18px"
            shadow="md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 2 * 0.08 }}
          >
            <Flex justify="space-between" align="center">
              <Flex direction="column" m="0">
                <Text fontSize="sm" color="amir.secondary">
                  درآمد ماهانه
                </Text>
                <Text
                  fontSize="2xl"
                  fontWeight="700"
                  color="amir.common"
                  mt="1"
                >
                  {Toman(data?.monthIncome!)}
                </Text>
              </Flex>

              <Flex
                bg="amir.secondary"
                w="50px"
                h="50px"
                borderRadius="14px"
                align="center"
                justify="center"
                shadow="sm"
                m="0"
              >
                <Icon as={CurrencyDollar} size={28} color="white" />
              </Flex>
            </Flex>
          </MotionBox>
        </>
      )}
      <Button
        as={Link}
        to={RouteConst.shopCreateOrder}
        w="100%"
        bg="amir.accent"
        color="white"
        mb="6"
        textAlign="center"
        borderRadius="20px"
        size="lg"
      >
        + ساخت سرویس جدید
      </Button>
    </Box>
  );
};
