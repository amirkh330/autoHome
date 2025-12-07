import { Image, Text, chakra } from "@chakra-ui/react";
import { Ghost } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export const EmptyState = () => {
  return (
    <chakra.div mx="auto" textAlign="center" my="4">
      <Image mb="2" as={Ghost} weight="fill" color="amir.accent" size={"48px"} mx="auto"/>
      <Text fontSize={"14px"} fontWeight={400} color="amir.accent">
        موردی یافت نشد
      </Text>
    </chakra.div>
  );
};
