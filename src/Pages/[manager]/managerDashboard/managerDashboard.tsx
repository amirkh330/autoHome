import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Info } from "@phosphor-icons/react";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#009f4d",
  "#ff7b00",
  "#3282f6",
  "#e91e63",
  "#7c4dff",
  "#00bcd4",
];

export const ManagerDashboard = () => {
  const [range, setRange] = useState("1404-01");

  const expenseData = data.expenses.map((e) => ({
    name: e.category,
    value: e.amount,
  }));

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>
        داشبورد مدیر ساختمان
      </Heading>

      {/* بالانس صندوق */}
      <Box p={4} mb={6} borderRadius="2xl" bg="white" boxShadow="sm">
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold">بالانس صندوق</Text>
          <Text
            fontWeight="bold"
            color={data.totalBalance >= 0 ? "green.500" : "red.500"}
          >
            {data.totalBalance.toLocaleString()} تومان
          </Text>
        </Flex>
      </Box>

      {/* دکمه‌های دسترسی سریع */}
      <Grid templateColumns="repeat(4, 1fr)" gap={3} mb={6}>
        <GridItem>
          <Button w="full" size="sm" colorScheme="teal">
            صندوق
          </Button>
        </GridItem>
        <GridItem>
          <Button w="full" size="sm" colorScheme="purple">
            واحدها
          </Button>
        </GridItem>
        <GridItem>
          <Button w="full" size="sm" colorScheme="orange">
            اعلان‌ها
          </Button>
        </GridItem>
        <GridItem>
          <Button w="full" size="sm" colorScheme="pink">
            فاکتور جدید
          </Button>
        </GridItem>
      </Grid>

      {/* گزارش‌گیری براساس بازه */}
      <Box p={4} bg="gray.50" borderRadius="xl" mb={6}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontWeight="bold">گزارش پرداخت / صورت وضعیت</Text>
          <IconButton aria-label="info" icon={<Info />} size="sm" />
        </Flex>

        <Select value={range} onChange={(e) => setRange(e.target.value)} mb={3}>
          <option value="1404-01">فروردین ۱۴۰۴</option>
          <option value="1404-02">اردیبهشت ۱۴۰۴</option>
          <option value="1404-03">خرداد ۱۴۰۴</option>
        </Select>

        <Button w="full" colorScheme="teal">
          نمایش گزارش
        </Button>
      </Box>

      {/* واحدهای دارای تأخیر */}
      <Box mb={6}>
        <Text fontWeight="bold" mb={2}>
          واحدهای دارای تأخیر
        </Text>
        <VStack spacing={2} align="stretch">
          {data.latePayments.map((p) => {
            const unit = data.units.find((u) => u.id === p.unitId);
            return (
              <Box
                key={p.unitId + p.month}
                p={3}
                borderRadius="xl"
                bg="red.50"
                border="1px solid #ffb3b3"
              >
                <Flex justify="space-between" align="center">
                  <Text>{unit?.name}</Text>
                  <Badge colorScheme="red">تاخیر در پرداخت</Badge>
                </Flex>
                <Text fontSize="xs" color="gray.600">
                  {p.month}
                </Text>
              </Box>
            );
          })}
        </VStack>
      </Box>

      {/* نمودار هزینه‌ها */}
      <Box borderRadius="2xl" bg="white" p={4} boxShadow="sm">
        <Text fontWeight="bold" mb={4}>
          نمودار هزینه‌ها
        </Text>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={3}
            >
              {expenseData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const data = {
  totalBalance: -450000, // منفی نمونه واقعی
  units: [
    { id: 1, name: "101" },
    { id: 2, name: "102" },
    { id: 3, name: "201" },
    { id: 4, name: "202" },
  ],
  latePayments: [
    { unitId: 2, month: "اردیبهشت 1404", amount: 300000, status: "late" },
    { unitId: 4, month: "خرداد 1404", amount: 300000, status: "late" },
  ],
  expenses: [
    { id: 1, category: "آسانسور", amount: 1200000, date: "1404-02-10" },
    { id: 2, category: "آب", amount: 460000, date: "1404-02-03" },
    { id: 3, category: "برق", amount: 780000, date: "1404-02-15" },
    { id: 4, category: "نظافت", amount: 300000, date: "1404-02-01" },
  ],
};
