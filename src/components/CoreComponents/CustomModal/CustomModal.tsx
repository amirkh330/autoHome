import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export const CustomModal = ({
  isOpen,
  onClose,
  children,
  title
}: {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc>
      <ModalOverlay />
      <ModalContent mx={"4"}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton onClick={() => {}} />
        <ModalBody mx="0">{children}</ModalBody>
        {/* <ModalFooter>
                <Button colorScheme="blue" onClick={handleVerifyOtp} mr={3}>
                  Verify
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
