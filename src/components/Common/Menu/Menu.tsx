import useAuthStore from "@/store/authStore";
import {
  Box,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
import { RouteConst } from "@/utils/allRoutes.type";
import { RoleEnum } from "@/utils/common";

const Menu = () => {
  const navigate = useNavigate();
  const { isAuth, logout, role, fullName, shopName, phoneNumber } =
    useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure();

  const menuItems = isAuth
    ? role === RoleEnum.MANAGER
      ? [..._ManagerMenu, ..._PublicMenu]
      : [..._UserMenu, ..._PublicMenu]
    : _PublicMenu;
  return (
    <>
      <Icon as={List} width={"25px"} h={"25px"} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor="amir.mainBg" color="amir.common">
          <Flex
            p="4"
            mx="0"
            alignItems="center"
            gap="2"
            justifyContent="space-between"
          >
            {/* <DrawerCloseButton /> */}
            <Icon mx="0" as={CloseButton} onClick={onClose} />
            <Text fontSize={"18px"} fontWeight={600}>
              اتوهوم
            </Text>
          </Flex>

          <DrawerBody mx="0" textAlign={"right"}>
            {isAuth ? (
              <VStack align="start" spacing={4}>
                <Box
                  p="2"
                  m="2"
                  w="100%"
                  mx="auto"
                  textAlign="center"
                  borderRadius={"8px"}
                  bgColor={"amir.secondaryBg"}
                >
                  <Text fontSize={"14px"} fontWeight={600} mb="2">
                    {fullName}
                  </Text>
                  <Text fontSize={"12px"} fontWeight={400}>
                    {shopName ?? phoneNumber}
                  </Text>
                </Box>
                <Divider borderColor={"amir.primary"} />

                {menuItems?.map((item) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    onClick={onClose}
                    style={{ fontSize: "14px", margin: "auto" }}
                  >
                    {item.title}
                  </Link>
                ))}
                <Text
                  mx={"auto"}
                  fontSize={"14px"}
                  onClick={() => {
                    logout();
                    onClose();
                    navigate("/");
                  }}
                >
                  خروج
                </Text>
              </VStack>
            ) : (
              <VStack align="start" spacing={4}>
                <Box
                  p="2"
                  m="2"
                  w="100%"
                  mx="auto"
                  fontSize="14px"
                  textAlign="center"
                  borderRadius="8px"
                  bgColor="amir.secondaryBg"
                  onClick={() => {
                    loginOnOpen();
                    onClose();
                  }}
                >
                  ورود
                </Box>
                <Divider borderColor={"amir.primary"} />

                {menuItems?.map((item) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    onClick={onClose}
                    style={{ fontSize: "14px" }}
                  >
                    {item.title}
                  </Link>
                ))}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Login isOpen={loginIsOpen} onOpen={loginOnOpen} onClose={loginOnClose} />
    </>
  );
};

export default Menu;

const _ManagerMenu = [
  { title: "ساختمان من", link: RouteConst.manageApartments },
  { title: "ایجاد فاکتور", link: RouteConst.manageCreateFactor },
  { title: "داشبورد", link: RouteConst.manageDashboard },
  { title: "اعلانات", link: RouteConst.manageNotifications },
  { title: "آمار", link: RouteConst.manageReports },
];

const _UserMenu = [
  { title: "داشبورد", link: RouteConst.userDashboard },
  { title: "اعلانات", link: RouteConst.userNotification },
  { title: "مدیریت مالی ساختمان", link: RouteConst.userCharges },
];

const _PublicMenu = [{ title: "تماس با ما", link: RouteConst.contactUs }];
