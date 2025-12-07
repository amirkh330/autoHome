import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetVehicles,
  useAddVehicle,
  useEditVehicle,
  useDeleteVehicle,
} from "../query/vehiclesAPI";

export const AdminVehicles = () => {
  const toast = useToast();
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);

  const queryClient = useQueryClient();
  const modal = useDisclosure();

  const { data, isFetching: isLoading } = useGetVehicles("");
  const deleteMutation = useDeleteVehicle();
  const editMutation = useEditVehicle();
  const addMutation = useAddVehicle();

  const openCreate = () => {
    setSelectedVehicle(null);
    setTitle("");
    setIsActive(true);
    modal.onOpen();
  };

  const openEdit = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setTitle(vehicle.title);
    setIsActive(vehicle.isActive);
    modal.onOpen();
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["vehicles"] });
  };

  const handleSubmit = () => {
    if (!title) {
      return toast({ title: "عنوان وارد شود", status: "error" });
    }

    const payload = { title, isActive };

    if (selectedVehicle) {
      editMutation
        .mutateAsync({ id: selectedVehicle.id, ...payload })
        .then(() => {
          handleUpdate();
          modal.onClose();
          toast({ title: "ویرایش با موفقیت انجام شد", status: "success" });
        });
    } else {
      addMutation.mutateAsync(payload).then(() => {
        handleUpdate();
        modal.onClose();
        toast({ title: "افزودن با موفقیت انجام شد", status: "success" });
      });
    }
  };

  return (
    <Box>
      <Flex mb={5} align="center" justify="space-between">
        <Text fontSize="2xl" fontWeight="700">
          مدیریت وسایل نقلیه
        </Text>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="teal"
          onClick={openCreate}
        >
          افزودن وسیله نقلیه
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
            {data?.map((vehicle: any) => (
              <Tr key={vehicle.id}>
                <Td>{vehicle.id}</Td>
                <Td>{vehicle.title}</Td>
                <Td>
                  <HStack>
                    <PencilSimple
                      color="blue"
                      size={20}
                      onClick={() => openEdit(vehicle)}
                    />
                    <Switch
                      isChecked={vehicle.isActive}
                      onChange={(e) => {
                        editMutation
                          .mutateAsync({
                            id: vehicle.id,
                            title: vehicle.title,
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
            {selectedVehicle ? "ویرایش وسیله نقلیه" : "افزودن وسیله نقلیه"}
          </ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>عنوان وسیله نقلیه</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">فعال</FormLabel>
              <Switch
                isChecked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
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
