import { Login } from "@/components/Common/Login/Login";
import useAuthStore from "@/store/authStore";
import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";

export const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: true });
  const { isAuth, logout } = useAuthStore();
  return (
    <Box p={"2"}>
      <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};
