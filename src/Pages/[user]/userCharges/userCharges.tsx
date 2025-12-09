import {
  Box,
  Text,
  Flex,
  Badge,
  VStack,
  Divider,
  Heading,
  Icon,
} from "@chakra-ui/react";

export const UserCharges = () => {
  return (
    <Box p={5}>
      <Heading size="md" mb={5}>
        گزارش مالی ساختمان
      </Heading>

      {/* بالانس صندوق */}
      <Box p={4} borderRadius="2xl" bg="white" boxShadow="sm" mb={4}>
        <Flex justify="space-between">
          <Text fontWeight="bold">بالانس فعلی صندوق</Text>
          <Text
            fontWeight="bold"
            color={finance.balance >= 0 ? "green.500" : "red.500"}
          >
            {finance.balance.toLocaleString()} تومان
          </Text>
        </Flex>
        <Text fontSize="xs" color="gray.500">
          مجموع پرداخت‌ها - مجموع هزینه‌ها
        </Text>
      </Box>

      {/* پرداختی‌های این ماه */}
      <Box p={4} borderRadius="2xl" bg="white" boxShadow="sm" mb={4}>
        <Text fontWeight="bold" mb={3}>
          وضعیت شارژ ماه جاری
        </Text>
        <VStack spacing={3} align="stretch">
          {finance.units.map((u) => (
            <Flex
              key={u.id}
              justify="space-between"
              p={2}
              bg="gray.50"
              borderRadius="xl"
            >
              <Text>{u.name}</Text>
              <Badge
                colorScheme={
                  u.status === "paid"
                    ? "green"
                    : u.status === "late"
                    ? "orange"
                    : "red"
                }
              >
                {u.status === "paid"
                  ? "پرداخت شده"
                  : u.status === "late"
                  ? "تاخیر"
                  : "پرداخت نشده"}
              </Badge>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* هزینه های انجام شده */}
      <Box p={4} borderRadius="2xl" bg="white" boxShadow="sm">
        <Text fontWeight="bold" mb={3}>
          هزینه‌های انجام شده
        </Text>
        <VStack spacing={3} align="stretch">
          {finance.expenses.map((ex) => (
            <Box
              key={ex.id}
              p={3}
              borderRadius="xl"
              bg="gray.50"
              border="1px solid #eee"
            >
              <Flex justify="space-between">
                <Text fontWeight="bold">{ex.title}</Text>
                <Text fontWeight="bold" color="red.500">
                  {ex.amount.toLocaleString()} تومان
                </Text>
              </Flex>
              <Text fontSize="xs" color="gray.600">
                {ex.date}
              </Text>
              <Text fontSize="sm" mt={1}>
                {ex.desc}
              </Text>
              <Badge mt={2} colorScheme="purple">
                {ex.category}
              </Badge>
            </Box>
          ))}
        </VStack>

        <Divider my={4} />

        <Flex justify="space-between">
          <Text>مجموع هزینه‌ها:</Text>
          <Text color="red.500" fontWeight="bold">
            {finance.totalExpenses.toLocaleString()} تومان
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

const finance = {
  balance: 7800000,
  totalExpenses: 3500000,
  units: [
    { id: 1, name: "101", status: "paid" },
    { id: 2, name: "102", status: "unpaid" },
    { id: 3, name: "201", status: "late" },
    { id: 4, name: "202", status: "paid" },
  ],
  expenses: [
    {
      id: 1,
      title: "سرویس آسانسور",
      amount: 1200000,
      date: "1403/11/01",
      desc: "تعمیر برد و روغن‌کاری",
      category: "آسانسور",
    },
    {
      id: 2,
      title: "نظافت ساختمان",
      amount: 800000,
      date: "1403/11/05",
      desc: "نظافت دوره‌ای راهرو و مشاعات",
      category: "نظافت",
    },
    {
      id: 3,
      title: "خرید لامپ LED",
      amount: 350000,
      date: "1403/11/10",
      desc: "روشنایی پارکینگ و ورودی",
      category: "برق و روشنایی",
    },
  ],
};
