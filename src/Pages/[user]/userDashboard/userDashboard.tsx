import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Badge,
  Grid,
  GridItem,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { Bell } from "@phosphor-icons/react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export const UserDashboard = () => {
  const paymentsChartData = data.lastMonths.map((m) => ({
    name: m.month,
    value: m.paid ? 1 : 0,
  }));

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>
        داشبورد واحد {data.unitName}
      </Heading>

      {/* وضعیت شارژ ماه */}
      <Box p={4} mb={6} borderRadius="2xl" bg="white" boxShadow="sm">
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold">شارژ ماه جاری</Text>
          <Badge
            colorScheme={
              data.currentPayment.status === "paid"
                ? "green"
                : data.currentPayment.status === "late"
                ? "red"
                : "yellow"
            }
          >
            {data.currentPayment.status === "paid"
              ? "پرداخت شده"
              : data.currentPayment.status === "late"
              ? "تاخیر"
              : "پرداخت نشده"}
          </Badge>
        </Flex>
        <Text mt={2} fontSize="sm" color="gray.600">
          مبلغ: {data.currentPayment.amount.toLocaleString()} تومان
        </Text>
        {data.currentPayment.status !== "paid" && (
          <Button mt={3} w="full" colorScheme="teal">
            پرداخت آنلاین
          </Button>
        )}
      </Box>

      {/* دکمه‌های سریع */}
      <Grid templateColumns="repeat(3, 1fr)" gap={3} mb={6}>
        <GridItem>
          <Button w="full" size="sm" colorScheme="teal">
            درخواست تعمیرات
          </Button>
        </GridItem>
        <GridItem>
          <Button w="full" size="sm" colorScheme="orange">
            ارتباط با مدیریت
          </Button>
        </GridItem>
        <GridItem>
          <Button w="full" size="sm" colorScheme="purple">
            مشاهده اعلان‌ها
          </Button>
        </GridItem>
      </Grid>

      {/* بدهی یا بستانکاری */}
      <Box p={4} mb={6} borderRadius="2xl" bg="gray.50">
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold">وضعیت مالی واحد</Text>
          <Text
            fontWeight="bold"
            color={data.balance >= 0 ? "green.500" : "red.500"}
          >
            {data.balance.toLocaleString()} تومان
          </Text>
        </Flex>
        <Text fontSize="xs" mt={1} color="gray.500">
          (+ مثبت = بستانکار / - منفی = بدهکار)
        </Text>
      </Box>

      {/* نمودار ۶ ماه پرداخت */}
      <Box p={4} borderRadius="2xl" bg="white" boxShadow="sm" mb={6}>
        <Text mb={3} fontWeight="bold">
          وضعیت پرداخت ۶ ماه اخیر
        </Text>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={paymentsChartData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* اعلان‌ها */}
      <Box p={4} borderRadius="2xl" bg="gray.50" boxShadow="sm">
        <Flex justify="space-between" mb={3}>
          <Text fontWeight="bold">اعلان‌های جدید</Text>
          <IconButton icon={<Bell />} size="sm" aria-label="alerts" />
        </Flex>
        <VStack spacing={2} align="stretch">
          {data.notifications.map((n) => (
            <Box
              key={n.id}
              p={3}
              borderRadius="xl"
              bg={n.read ? "white" : "yellow.50"}
            >
              <Flex justify="space-between">
                <Text fontWeight={n.read ? "normal" : "bold"}>{n.title}</Text>
                {!n.read && <Badge colorScheme="yellow">خوانده نشده</Badge>}
              </Flex>
              <Text fontSize="xs" color="gray.600">
                {n.date}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

const data = {
  unitName: "204",
  currentPayment: {
    amount: 350000,
    status: "late", // "paid" | "unpaid" | "late"
  },
  balance: -450000,
  lastMonths: [
    { month: "دی", paid: true },
    { month: "بهمن", paid: false },
    { month: "اسفند", paid: true },
    { month: "فروردین", paid: true },
    { month: "اردیبهشت", paid: false },
    { month: "خرداد", paid: true },
  ],
  notifications: [
    { id: 1, title: "قطعی آب فردا ۱۰ صبح", read: false, date: "1404/02/11" },
    { id: 2, title: "جلسه عمومی پارکینگ", read: true, date: "1404/02/01" },
  ],
};
