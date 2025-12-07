import { Box, CloseButton, Flex, Slide, Text } from "@chakra-ui/react";

interface IBottomSheet {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  showCloseButton?: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const BottomSheet = ({
  title,
  children,
  isOpen,
  onClose,
  showCloseButton = true,
}: IBottomSheet) => {
  if (!isOpen) return null;
  return (
    <>
      <Box textAlign="center" p="6" maxW={"400px"}>
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 20 }}>
          <Box bg={"amir.mainBg"} boxShadow="md" borderTopRadius="md">
            <Flex
              p="6"
              justifyContent="space-between"
              alignItems="center"
              // mb="4"
              pb="2"
            >
              <Text fontWeight={500} fontSize={"16px"} color={"amir.common"}>
                {title}
              </Text>
              {showCloseButton && (
                <CloseButton onClick={onClose} color={"amir.common"} />
              )}
            </Flex>
            <Box>{children}</Box>
          </Box>
        </Slide>
      </Box>
      <Box
        onClick={onClose}
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        zIndex="10"
        bg="blackAlpha.600"
        backdropFilter="blur(10px)"
      ></Box>
    </>
  );
};

export default BottomSheet;
