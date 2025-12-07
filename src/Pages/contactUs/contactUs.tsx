import {
  Box,
  VStack,
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
  Image,
  HStack,
} from "@chakra-ui/react";
import Logo from "@/images/logo.png";
import { Phone, Chat, WhatsappLogo, TelegramLogo } from "@phosphor-icons/react";

const contacts = [
  {
    label: "تماس تلفنی",
    icon: Phone,
    href: "tel:+989385440212",
    description: "برای مشکلات فوری و راهنمایی سریع",
  },
  {
    label: "پیامک",
    icon: Chat,
    href: "sms:+989385440212",
    description: "ارسال پیامک برای پیگیری‌ها یا سوالات کوتاه.",
  },
  {
    label: "واتس‌اپ",
    icon: WhatsappLogo,
    href: "https://wa.me/989385440212",
    description: "با ما در واتس‌اپ ارتباط برقرار کنید، پاسخ سریع دریافت کنید.",
  },
  {
    label: "تلگرام",
    icon: TelegramLogo,
    href: "https://t.me/amirkh330",
    description: "ارسال پیام در تلگرام برای دریافت پشتیبانی.",
  },
];

export default function ContactUs() {
  return (
    <Box bg="amir.mainBg" minH="100dvh" p="4">
      <HStack alignItems={"center"} justifyContent="start" w="full">
        <Image src={Logo} h="50px" opacity={0.9} mx="0" />
        <Text fontSize="2xl" fontWeight="700" color="amir.common" mb="2">
          ارتباط با ما
        </Text>
      </HStack>
      <Text fontSize="15px" color="amir.secondary" my="6" lineHeight={2}>
        ما همیشه آماده شنیدن نظرات شما و ارائه راهنمایی سریع و کاربردی هستیم. هر
        زمان که نیاز داشتید، با یک لمس می‌توانید با ما ارتباط برقرار کنید.
      </Text>

      <VStack spacing="4">
        {contacts.map((contact, index) => (
          <ChakraLink
            key={index}
            href={contact.href}
            isExternal
            w="100%"
            style={{ textDecoration: "none" }}
          >
            <Flex
              bg="amir.secondaryBg"
              borderRadius="20px"
              p="4"
              px="2"
              align="center"
              shadow="sm"
              transition="all 0.2s"
            >
              <Flex
                // bg="amir.accent"
                w="50px"
                h="50px"
                borderRadius="14px"
                align="center"
                justify="center"
                mr="4"
              >
                <Icon as={contact.icon} w={5} h={5} color="amir.secondary" />
              </Flex>

              <Box w="75%">
                <Text fontWeight="600" fontSize="lg" color="amir.common">
                  {contact.label}
                </Text>
                <Text fontSize="13px" color="amir.secondary">
                  {contact.description}
                </Text>
              </Box>
            </Flex>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
}
