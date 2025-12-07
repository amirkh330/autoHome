import { Box, Text, VStack, HStack, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";

const MotionBox = motion(Box);

const packages = [
  {
    name: "پکیج پایه",
    price: "1,500,000",
    discount: "10%",
    features: [
      "پیامک یادآوری سرویس‌ها",
      "کارتکس پایه خودرو",
      "50 SMS رایگان",
      "پشتیبانی از طریق چت داخلی",
    ],
    bg: "amir.secondaryVariant",
  },
  {
    name: "پکیج استاندارد",
    price: "2,800,000",
    discount: "15%",
    features: [
      "پیامک یادآوری و اطلاع‌رسانی کامل",
      "کارتکس کامل خودرو",
      "150 SMS رایگان",
      "SMS تبلیغاتی در محدوده",
      "گزارش آماری مشتریان",
      "پشتیبانی تلفنی",
    ],
    bg: "amir.secondary",
  },
  {
    name: "پکیج حرفه‌ای",
    price: "4,500,000",
    discount: "20%",
    features: [
      "همه امکانات استاندارد",
      "پیامک‌های هوشمند و زمان‌بندی خودکار",
      "500 SMS رایگان",
      "SMS تبلیغاتی هدفمند در محدوده",
      "داشبورد مالی پیشرفته",
      "پشتیبانی اولویت‌دار",
      "امکانات مدیریتی ویژه مکانیک‌ها",
    ],
    bg: "amir.secondaryVariant",
  },
];

export default function MechanicPackages() {
  return (
    <Box bg="#F3F4F6" minH="100dvh" p="4">
      <Text fontSize="2xl" fontWeight="700" mb="2">
        پکیج‌های خدماتی برای مکانیک‌ها
      </Text>
      <Text fontSize="sm" mb="6" color="#555">
        سرویس‌های حرفه‌ای برای مدیریت مشتریان، یادآوری‌ها و تبلیغات مکانیک‌ها.
        هر پکیج شامل ویژگی‌های کلیدی برای کسب‌وکار شماست.
      </Text>

      <VStack spacing="6" align="center">
        {packages.map((pkg, index) => (
          <MotionBox
            key={index}
            w="90%"
            bg={pkg.bg}
            borderRadius="24px"
            shadow="xl"
            p="4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Text fontSize="xl" fontWeight="700" color="white">
              {pkg.name}
            </Text>
            <HStack mt="2" mb="4" justify="space-between">
              <Text fontSize="2xl" fontWeight="700" color="white">
                {pkg.price} تومان
              </Text>
              {pkg.discount && (
                <Box
                  bg="whiteAlpha.800"
                  px="3"
                  m="0"
                  py="1"
                  borderRadius="12px"
                >
                  <Text fontSize="sm" fontWeight="600" color="#000">
                    {pkg.discount} تخفیف
                  </Text>
                </Box>
              )}
            </HStack>

            <VStack align="start" spacing="1" mb="4" mx="0">
              {pkg.features.map((f, i) => (
                <HStack key={i} spacing="2" mx="0">
                  <Check size={20} color="white" weight="bold" />
                  <Text fontSize="sm" color="white">
                    {f}
                  </Text>
                </HStack>
              ))}
            </VStack>

            <Button
              w="full"
              bg="white"
              color={pkg.bg}
              fontWeight="700"
              borderRadius="16px"
            >
              خرید پکیج
            </Button>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
}
