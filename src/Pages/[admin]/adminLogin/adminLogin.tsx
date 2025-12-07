import useAuthStore from "@/store/authStore";
import { RouteConst } from "@/utils/allRoutes.type";
import { BaseURL, RoleEnum } from "@/utils/common";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Lock, User } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(`${BaseURL}auth/login-admin/`, {
        username,
        password,
      })
      .then((res) => {
        loginUser({
          accessToken: res.data.data.accessToken,
          refresh: "",
          fullName: "ادمین ادمین‌زاده",
          role: RoleEnum.ADMIN,
          phoneNumber: "",
        });
        toast({
          title: "ورود موفق",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate(RouteConst.adminDashboard);
      })
      .catch((err) => {
        return toast({
          title: "خطا",
          description: "لطفاً تمام فیلدها را پر کنید",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, teal.400, blue.600)"
      align="center"
      justify="center"
      p={4}
    >
      <Box
        bg="white"
        p={10}
        rounded="2xl"
        shadow="2xl"
        w={{ base: "90%", sm: "400px" }}
        textAlign="center"
      >
        <Text
          mb={6}
          bgGradient="linear(to-r, teal.500, blue.600)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="bold"
        >
          ورود به پنل مدیریت
        </Text>

        <Stack spacing={5}>
          <FormControl>
            <FormLabel textAlign="right">نام کاربری</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={User} color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel textAlign="right">رمز عبور</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={Lock} color="gray.400" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            w="100%"
            rounded="full"
            onClick={handleLogin}
          >
            ورود
          </Button>
        </Stack>

        <Text fontSize="sm" mt={6} color="gray.500">
          © 2025 Admin Panel — ساخته شده با عشق ❤
        </Text>
      </Box>
    </Flex>
  );
};
