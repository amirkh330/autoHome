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
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddPeriod,
  useDeletePeriod,
  useEditPeriod,
  useGetPeriods,
} from "../query/periodsAPI";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";

export const AdminPeriod = () => {
  const toast = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);

  const queryClient = useQueryClient();
  const modal = useDisclosure();

  const { data, isFetching: isLoading } = useGetPeriods("");
  const deleteMutation = useDeletePeriod();
  const editMutation = useEditPeriod();
  const addMutation = useAddPeriod();

  const openCreate = () => {
    setSelectedPeriod(null);
    setTitle("");
    setIsActive(true);
    modal.onOpen();
  };

  const openEdit = (period: any) => {
    setSelectedPeriod(period);
    setTitle(period.title);
    setIsActive(period.isActive);
    modal.onOpen();
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["periods"] });
  };

  const handleSubmit = () => {
    if (!title) {
      return toast({ title: "عنوان وارد شود", status: "error" });
    }

    const payload = { title, isActive };

    if (selectedPeriod) {
      editMutation
        .mutateAsync({ id: selectedPeriod.id, ...payload })
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
          مدیریت دوره‌ها
        </Text>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="teal"
          onClick={openCreate}
        >
          افزودن دوره
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
              <Th>فعال</Th>
              <Th>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((period: any) => (
              <Tr key={period.id}>
                <Td>{period.id}</Td>
                <Td>{period.title}</Td>
                <Td>{period.isActive ? "✅" : "❌"}</Td>
                <Td>
                  <HStack>
                    <PencilSimple
                      color="blue"
                      size={20}
                      onClick={() => openEdit(period)}
                    />
                    <Trash
                      size={20}
                      color="red"
                      onClick={() =>
                        deleteMutation
                          .mutateAsync({ id: period.id })
                          .then(handleUpdate)
                      }
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
            {selectedPeriod ? "ویرایش دوره" : "افزودن دوره"}
          </ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>عنوان دوره</FormLabel>
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
