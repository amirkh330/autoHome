import { Box, Text, VStack, HStack, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";

const MotionBox = motion(Box);

const packages = [
  {
    name: "پکیج پایه ساختمان",
    price: "900,000",
    discount: "10%",
    features: [
      "محاسبه و ثبت شارژ ماهانه",
      "مدیریت واحدها و ساکنین",
      "یادآوری موعد پرداخت",
      "گزارش ساده هزینه‌ و پرداخت‌ها",
      "پشتیبانی از طریق چت داخلی",
    ],
    bg: "amir.secondaryVariant",
  },
  {
    name: "پکیج مدیریت استاندارد",
    price: "1,950,000",
    discount: "15%",
    features: [
      "پیامک یادآوری پرداخت شارژ",
      "گزارش کامل درآمد و هزینه ساختمان",
      "ثبت درخواست‌های تعمیراتی",
      "اعلان هوشمند قبوض و بدهی‌ها",
      "ارسال SMS به تمام واحدها",
      "پشتیبانی تلفنی",
    ],
    bg: "amir.secondary",
  },
  {
    name: "پکیج حرفه‌ای برج / مجتمع",
    price: "3,200,000",
    discount: "20%",
    features: [
      "داشبورد مالی کامل + تحلیل هزینه‌ها",
      "سیستم پرداخت آنلاین شارژ",
      "یادآوری هوشمند و زمان‌بندی خودکار",
      "مدیریت تعمیرات، قراردادها و خدمات دوره‌ای",
      "ارسال اعلان و پیامک هدفمند",
      "آرشیو اسناد و صورت‌جلسه‌ها",
      "پشتیبانی اولویت‌دار",
    ],
    bg: "amir.secondaryVariant",
  },
];

export default function BuildingPackages() {
  return (
    <Box bg="#F3F4F6" minH="100dvh" p="4">
      <Text fontSize="2xl" fontWeight="700" mb="2">
        پکیج‌های مدیریت ساختمان
      </Text>
      <Text fontSize="sm" mb="6" color="#555">
        از مدیریت شارژ و هزینه‌ها تا اطلاع‌رسانی و پرداخت آنلاین، پکیج‌ها بر
        اساس نیاز ساختمان‌های کوچک، متوسط و برج‌ها طراحی شده‌اند.
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
                <Box bg="whiteAlpha.800" px="3" py="1" borderRadius="12px">
                  <Text fontSize="sm" fontWeight="600" color="#000">
                    {pkg.discount} تخفیف
                  </Text>
                </Box>
              )}
            </HStack>

            <VStack align="start" spacing="1" mb="4">
              {pkg.features.map((f, i) => (
                <HStack key={i} spacing="2">
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
