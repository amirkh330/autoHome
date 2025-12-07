import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Button,
  Avatar,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Spacer,
  useColorModeValue,
  Divider,
  Icon,
} from "@chakra-ui/react";
import {
  List,
  House,
  User,
  GearSix,
  SignOut,
  ListDashes,
  Car,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { RouteConst } from "@/utils/allRoutes.type";

// Layout Wrapper
export const AdminLayout = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <DashboardLayout /> : <LoginLayout />;
};

// Layout for NOT logged-in (Login Page Layout)
function LoginLayout() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, teal.400, blue.600)"
      p={4}
    >
      <Outlet />
    </Flex>
  );
}

// Layout for logged-in Admin
function DashboardLayout() {
  const sidebarBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("white", "gray.900");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const drawer = useDisclosure();
  const { logout } = useAuthStore();

  const menuItems = [
    {
      label: "داشبورد",
      icon: <House size={22} />,
      link: RouteConst.adminDashboard,
    },
    { label: "کاربران", icon: <User size={22} />, link: RouteConst.adminUsers },
    {
      label: "سرویس ها",
      icon: <GearSix size={22} />,
      link: RouteConst.adminServices,
    },
    {
      label: "ماشین ها",
      icon: <Car size={22} />,
      link: RouteConst.adminVehicles,
    },
    {
      label: "مدت دوره ها",
      icon: <ClockCounterClockwise size={22} />,
      link: RouteConst.adminPeriods,
    },
    // { label: "تنظیمات", icon: <GearSix size={22} />, link: "" },
  ];

  const SidebarContent = () => (
    <VStack
      align="stretch"
      bg={sidebarBg}
      w="250px"
      h="100vh"
      p={5}
      spacing={4}
      shadow="xl"
    >
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        پنل ادمین
      </Text>

      <Divider />

      {menuItems.map((item) => (
        <Flex
          key={item.label}
          align="center"
          as={Link}
          to={item.link}
          p={2}
          rounded="lg"
          cursor="pointer"
          _hover={{ bg: "teal.500", color: "white" }}
          bg={
            window.location.pathname === item.link ? "teal.500" : "transparent"
          }
          color={window.location.pathname === item.link ? "white" : ""}
        >
          <Box mx={3}>{item.icon}</Box>
          <Text>{item.label}</Text>
        </Flex>
      ))}

      <Spacer />

      <Button
        leftIcon={<SignOut size={20} />}
        colorScheme="red"
        variant="outline"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        خروج
      </Button>
    </VStack>
  );

  return (
    <Flex minH="100vh" bg={useColorModeValue("gray.100", "gray.700")}>
      {/* Desktop Sidebar */}
      <Box display={{ base: "none", md: "block" }}>
        <SidebarContent />
      </Box>

      {/* Mobile Sidebar */}
      <Drawer isOpen={drawer.isOpen} placement="right" onClose={drawer.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>منو</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Flex direction="column" flex={1}>
        {/* Header */}
        <Flex bg={headerBg} p={4} align="center" shadow="md">
          <ListDashes size={26} onClick={drawer.onOpen}/>
          {/* <Icon
            display={{ base: "flex", md: "none" }}
            as={<ListDashes size={26} />}
            onClick={drawer.onOpen}
            variant="ghost"
          /> */}

          <Text fontSize="xl" fontWeight="bold" ml={3}>
            پنل مدیریت
          </Text>

          <Spacer />

          <HStack spacing={4}>
            <Text fontWeight="medium">ادمین</Text>
            <Avatar name="Admin" size="sm" />
          </HStack>
        </Flex>

        {/* Main Page Content */}
        <Box p={6}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
