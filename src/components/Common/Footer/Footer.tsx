import useAuthStore from "@/store/authStore";
import { RouteConst } from "@/utils/allRoutes.type";
import { RoleEnum } from "@/utils/common";
import { Box, Flex, Text } from "@chakra-ui/react";
import { UserCircleCheck, UserCircleGear } from "@phosphor-icons/react";
import {
  HouseLine,
  Phone,
  Ticket,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const { pathname } = useLocation();
  const isActive = (url: string) => pathname !== url;
  const { isAuth, role } = useAuthStore();
  const list = !isAuth
    ? commonList
    : role == RoleEnum.CUSTOMER
    ? customerList
    : shopList;
  return (
    <Flex
      bg="amir.secondaryBg"
      p={3}
      w="full"
      zIndex={9}
      justifyContent="space-between"
      alignItems="center"
      borderRadius={" 16px 16px 0 0"}
    >
      {list.map((item, index) => (
        <Box
          key={index}
          as={Link}
          to={item.url}
          mx={"auto"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          color={isActive(item.url) ? "amir.common" : "amir.accent"}
        >
          {item.icon}
          <Text
            fontSize={"12px"}
            fontWeight={isActive(item.url) ? "400" : "500"}
          >
            {item.text}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

const commonList = [
  { icon: <Ticket size="20" />, text: "خدمات ما", url: RouteConst.services },
  { icon: <HouseLine size="20" />, text: "خانه", url: RouteConst.home },
  {
    icon: <Phone size="20" />,
    text: "ارتباط با ما",
    url: RouteConst.contactUs,
  },
];

const customerList = [
  {
    icon: <UserCircleCheck size="20" />,
    text: "داشبورد",
    url: RouteConst.customerDashboard,
  },
  { icon: <HouseLine size="20" />, text: "خانه", url: RouteConst.home },
  {
    icon: <Phone size="20" />,
    text: "ارتباط با ما",
    url: RouteConst.contactUs,
  },
];

const shopList = [
  {
    icon: <UserCircleGear size="20" />,
    text: "داشبورد",
    url: RouteConst.shopDashboard,
  },
  {
    icon: <Wrench size="20" />,
    text: "ایجاد سرویس",
    url: RouteConst.shopCreateOrder,
  },
  {
    icon: <Phone size="20" />,
    text: "ارتباط با ما",
    url: RouteConst.contactUs,
  },
];
