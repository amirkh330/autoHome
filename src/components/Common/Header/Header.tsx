import Logo from "@/images/logo.png";
import useAuthStore from "@/store/authStore";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import Menu from "../Menu/Menu";

export const Header = () => {
  const { isAuth, fullName } = useAuthStore();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="amir.secondaryBg"
      color="amir.common"
      p={4}
      w="full"
      //
      justify="space-between"
      align="center"
      py="2"
      pr="2"
      pl="2"
      position="sticky"
      top="0"
      zIndex={10}
    >
      <Flex m="0" alignItems="center" gap="2">
        <Menu />
        {isAuth && (
          <Box>
            <Text fontSize="sm">{fullName}</Text>
          </Box>
        )}
      </Flex>

      <Flex m="0" alignItems="center" gap="2">
        <Text>اتوپین</Text>
        <Image src={Logo} h="25px" opacity={0.9} mx="0" />
      </Flex>

      {/* <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
    </Flex>
  );
};
