import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { Loading } from "@/components/CoreComponents/Loading/Loading";
import { OrderCard } from "@/components/CoreComponents/OrderCard/orderCard";
import { RouteConst } from "@/utils/allRoutes.type";
import { formatNumber } from "@/utils/Toman/Toman";
import {
  Box,
  Button,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Calendar, RoadHorizon, Storefront } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCustomerDashboard } from "./customerDashboard.biz";
const MotionBox = motion(Box);

export const CustomerDashboard = () => {
  const navigate = useNavigate();

  const { data, isLoading, nextSession, nextSessionLoading, reportsCount } =
    useCustomerDashboard();

  return (
    <Box p="4" color="amir.common">
      {nextSessionLoading ? (
        <Loading />
      ) : nextSession?.nextSession?.reminderAt ? (
        <MotionBox
          p="5"
          shadow="lg"
          borderWidth="2px"
          borderRadius="18px"
          bg="amir.secondaryBg"
          borderColor={"amir.accent"}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35 }}
        >
          {/* عنوان کارت */}
          <HStack justify="space-between" mb="4">
            <Text fontSize="lg" fontWeight="700">
              سرویس بعدی شما
            </Text>

            <Box
              w="14px"
              h="14px"
              borderRadius="full"
              mx="0"
              bg={"amir.accent"}
            />
          </HStack>

          {/* اطلاعات با نظم کامل */}
          <VStack spacing="4" align="stretch" mx="0">
            <HStack spacing="3" mx="0">
              <Box
                w="32px"
                h="32px"
                bg="amir.mainBg"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="0"
              >
                <Icon as={Storefront} color="amir.primary" mx="0" />
              </Box>

              <HStack
                spacing="0"
                align="start"
                mx="0"
                justifyContent={"space-between"}
                w={"full"}
              >
                <Text fontSize="xs" color="amir.secondaryVariant">
                  آخرین مغازه
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {nextSession?.order?.shop?.shopName}
                </Text>
              </HStack>
            </HStack>

            <HStack spacing="3" mx="0">
              <Box
                w="32px"
                h="32px"
                bg="amir.mainBg"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="0"
              >
                <Icon as={RoadHorizon} color="amir.primary" mx="0" />
              </Box>

              <HStack
                spacing="0"
                align="start"
                mx="0"
                justifyContent={"space-between"}
                w={"full"}
              >
                <Text fontSize="xs" color="amir.secondaryVariant">
                  کیلومتر مراجعه بعدی
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {formatNumber(Number(nextSession?.order?.nextDistance))}
                </Text>
              </HStack>
            </HStack>

            <HStack spacing="3" mx="0">
              <Box
                w="32px"
                h="32px"
                bg="amir.mainBg"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="0"
              >
                <Icon as={RoadHorizon} color="amir.primary" mx="0" />
              </Box>

              <HStack
                spacing="0"
                align="start"
                mx="0"
                justifyContent={"space-between"}
                w={"full"}
              >
                <Text fontSize="xs" color="amir.secondaryVariant">
                  وسیله نقلیه
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {nextSession?.order?.vehicle?.title}
                </Text>
              </HStack>
            </HStack>

            <HStack spacing="3" mx="0">
              <Box
                w="32px"
                h="32px"
                bg="amir.mainBg"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="0"
              >
                <Icon as={Calendar} color="amir.primary" mx="0" />
              </Box>

              <HStack
                spacing="0"
                align="start"
                mx="0"
                justifyContent={"space-between"}
                w={"full"}
              >
                <Text fontSize="xs" color="amir.secondaryVariant">
                  تاریخ مراجعه بعدی
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {new Date(
                    nextSession?.nextSession?.reminderAt!
                  ).toLocaleDateString("fa-IR")}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </MotionBox>
      ) : null}
      <Text fontWeight="700" fontSize="lg" my="4">
        سوابق سرویس‌ها
      </Text>
      {}
      <VStack spacing="4">
        {isLoading ? (
          <Spinner />
        ) : data?.length ? (
          <>
            {Array.from({ length: reportsCount || 0 }).map((_, i) => (
              <OrderCard key={i} item={data[i]} />
            ))}
            <Button
              w="full"
              variant="outline"
              color="white"
              bgColor="amir.accent"
              onClick={() => navigate(RouteConst.customerReports)}
            >
              مشاهده همه سرویس‌ها
            </Button>
          </>
        ) : (
          <EmptyState />
        )}
      </VStack>
    </Box>
  );
};
