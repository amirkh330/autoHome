import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { PencilSimple, Plus } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useAddService,
  useEditService,
  useGetServices
} from "../query/serviceAPI";

export const AdminServices = () => {
  const toast = useToast();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();
  const modal = useDisclosure();

  const { data, isFetching: isLoading } = useGetServices("");
  const editMutation = useEditService();
  const addMutation = useAddService();

  const openCreate = () => {
    setSelectedService(null);
    setTitle("");
    modal.onOpen();
  };

  const openEdit = (service: any) => {
    setSelectedService(service);
    setTitle(service.title);
    modal.onOpen();
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-services"] });
  };

  const handleSubmit = () => {
    if (!title) {
      return toast({ title: "عنوان وارد شود", status: "error" });
    }
    selectedService
      ? editMutation.mutateAsync({ id: selectedService.id, title }).then(() => {
          handleUpdate();
          modal.onClose();
          toast({ title: "ویرایش با موفقیت انجام شد", status: "success" });
        })
      : addMutation.mutateAsync({ title }).then(() => {
          handleUpdate();
          modal.onClose();
          toast({ title: "افزودن با موفقیت انجام شد", status: "success" });
        });
  };

  return (
    <Box>
      <Flex mb={5} align="center" justify="space-between">
        <Text fontSize="2xl" fontWeight="700">
          مدیریت سرویس‌ها
        </Text>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="teal"
          onClick={openCreate}
        >
          افزودن سرویس
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justify="center" p={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple" bg="white" rounded="md" shadow="md">
          <Thead>
            <Tr>
              <Th>شناسه</Th>
              <Th>عنوان</Th>
              <Th>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((service: any) => (
              <Tr key={service.id}>
                <Td>{service.id}</Td>
                <Td>{service.title}</Td>
                <Td>
                  <HStack>
                    <PencilSimple
                      color="blue"
                      size={20}
                      onClick={() => openEdit(service)}
                    />

                    <Switch
                      isChecked={service.isActive}
                      onChange={(e) => {
                        editMutation
                          .mutateAsync({
                            id: service.id,
                            title: service.title,
                            isActive: e.target.checked,
                          })
                          .then(() => {
                            handleUpdate();
                            toast({
                              title: "ویرایش با موفقیت انجام شد",
                              status: "success",
                              position: "top",
                            });
                          });
                      }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedService ? "ویرایش سرویس" : "افزودن سرویس"}
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>عنوان سرویس</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleSubmit}
              isLoading={addMutation.isPending || editMutation.isPending}
            >
              ذخیره
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
