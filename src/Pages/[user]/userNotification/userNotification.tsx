import {
  Box,
  Text,
  Badge,
  VStack,
  Flex,
  IconButton,
  Divider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { Bell } from "@phosphor-icons/react";
import { useState } from "react";

export const UserNotification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<any>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const openDetail = (item: any) => {
    setSelected(item);
    onOpen();
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          اعلان‌ها
        </Text>

        <Box position="relative">
          <IconButton
            icon={<Bell />}
            aria-label="اعلان‌ها"
            variant="ghost"
            fontSize="2xl"
          />
          {unreadCount > 0 && (
            <Badge
              colorScheme="red"
              position="absolute"
              top="0"
              right="0"
              borderRadius="full"
              px="2"
              fontSize="0.7rem"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </Flex>

      <Divider mb={4} />

      {/* لیست اعلان‌ها */}
      <VStack spacing={3} align="stretch">
        {notifications.map((item) => (
          <Box
            key={item.id}
            p={3}
            borderRadius="xl"
            bg={item.isRead ? "gray.50" : "orange.50"}
            border="1px solid #e6e6e6"
            cursor="pointer"
            onClick={() => openDetail(item)}
          >
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold">{item.title}</Text>
              {!item.isRead && <Badge colorScheme="orange">جدید</Badge>}
            </Flex>
            <Text fontSize="xs" color="gray.600">
              {item.date}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* پنل جزئیات اعلان */}
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRadius="2xl 2xl 0 0">
          <DrawerCloseButton />
          <DrawerHeader fontSize="lg">{selected?.title}</DrawerHeader>
          <DrawerBody>
            <Text fontSize="sm" color="gray.700" lineHeight="1.9">
              {selected?.description}
            </Text>
            <Text mt={4} fontSize="xs" color="gray.500">
              {selected?.date}
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const notifications = [
  {
    id: 1,
    title: "قطع آب",
    description: "آب ساختمان از ساعت ۱۴ تا ۱۸ قطع می‌باشد.",
    date: "1403/10/22",
    isRead: false,
  },
  {
    id: 2,
    title: "نوبت آسانسور",
    description: "سرویس دوره‌ای آسانسور فردا ساعت ۹ انجام می‌شود.",
    date: "1403/10/18",
    isRead: true,
  },
  {
    id: 3,
    title: "نظافت مشاعات",
    description: "نظافت دوره‌ای پنجشنبه انجام خواهد شد.",
    date: "1403/10/15",
    isRead: false,
  },
];
