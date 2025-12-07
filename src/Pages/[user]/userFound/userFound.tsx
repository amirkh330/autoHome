import { Box } from "@chakra-ui/react";
import { Calendar, Toolbox, User } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

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
export const UserFound = () => {
  // const { data, isLoading } = useGetShopDashboard();
  return <Box p="4" color="amir.common" minH="0dvh"></Box>;
};
