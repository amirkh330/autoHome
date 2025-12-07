import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export const Loading = () => {
  return (
    <Flex w={"full"} flexDirection={"column"} alignItems={"center"} mt="50%">
      <Spinner color="amir.primary" size="lg" />
      <Text color="amir.primary" mx="auto" mt="4">
        loading
      </Text>
    </Flex>
  );
};
