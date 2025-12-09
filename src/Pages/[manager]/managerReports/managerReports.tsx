import { Badge, Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

// نمونه واحدها
const units = [
  { id: 1, name: "واحد 101" },
  { id: 2, name: "واحد 102" },
  { id: 3, name: "واحد 103" },
  { id: 4, name: "واحد 201" },
  { id: 5, name: "واحد 202" },
];

// نمونه ماه‌ها
const months = [
  "فروردین 1404",
  "اردیبهشت 1404",
  "خرداد 1404",
  "تیر 1404",
  "مرداد 1404",
];

// نمونه بالانس و پرداخت‌ها
const balance = {
  totalBalance: 1200000, // تومان، مثبت یا منفی
  payments: [
    {
      unitId: 1,
      month: "فروردین 1404",
      amount: 300000,
      status: "paid",
      receiptNumber: "R001",
    },
    { unitId: 2, month: "فروردین 1404", amount: 300000, status: "unpaid" },
    {
      unitId: 3,
      month: "فروردین 1404",
      amount: 300000,
      status: "paid",
      receiptNumber: "R003",
    },
    { unitId: 4, month: "فروردین 1404", amount: 300000, status: "unpaid" },
    {
      unitId: 5,
      month: "فروردین 1404",
      amount: 300000,
      status: "paid",
      receiptNumber: "R005",
    },

    {
      unitId: 1,
      month: "اردیبهشت 1404",
      amount: 300000,
      status: "paid",
      receiptNumber: "R006",
    },
    {
      unitId: 2,
      month: "اردیبهشت 1404",
      amount: 300000,
      status: "paid",
      receiptNumber: "R007",
    },
    { unitId: 3, month: "اردیبهشت 1404", amount: 300000, status: "unpaid" },
    { unitId: 4, month: "اردیبهشت 1404", amount: 300000, status: "unpaid" },
    {
      unitId: 5,
      month: "اردیبهشت 1404",
      amount: 300000,
      status: "paid",
      receiptNumber: "R010",
    },
  ],
};

export const ManagerReports = () => {
  return (
    <Box py={5} px={2}>
      <Box p={4} mb={6} borderRadius="2xl" bg="white" boxShadow="sm">
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold">بالانس صندوق</Text>
          <Text
            fontWeight="bold"
            color={balance.totalBalance >= 0 ? "green.500" : "red.500"}
          >
            {balance.totalBalance.toLocaleString()} تومان
          </Text>
        </Flex>
      </Box>

      <VStack spacing={3} align="stretch">
        {balance.payments.map((pay: any) => {
          const unit = units.find((u) => u.id === pay.unitId);
          return (
            <Box
              key={pay.unitId + pay.month}
              p={3}
              borderRadius="xl"
              bg="gray.50"
              border="1px solid #e6e6e6"
            >
              <Flex justify="space-between">
                <Text fontWeight="bold">{unit?.name}</Text>
                <Badge colorScheme={pay.status === "paid" ? "green" : "red"}>
                  {pay.status === "paid" ? "پرداخت شده" : "پرداخت نشده"}
                </Badge>
              </Flex>
              <Text fontSize="sm" color="gray.600">
                {pay.month}
              </Text>
              {pay.status === "paid" && (
                <Text fontSize="sm">رسید: {pay.receiptNumber}</Text>
              )}
            </Box>
          );
        })}
      </VStack>

      <Box overflowX="auto" mt={6}>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b">واحد</th>
              {months.map((month) => (
                <th key={month} className="px-3 py-2 border-b">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id}>
                <td className="px-3 py-2 border-b">{unit.name}</td>
                {months.map((month) => {
                  const payment = balance.payments.find(
                    (p) => p.unitId === unit.id && p.month === month
                  );
                  return (
                    <td key={month} className="px-3 py-2 border-b">
                      {payment?.status === "paid" ? (
                        <Badge colorScheme="green">پرداخت شده</Badge>
                      ) : (
                        <Badge colorScheme="red">پرداخت نشده</Badge>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};
