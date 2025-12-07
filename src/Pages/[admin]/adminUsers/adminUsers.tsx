import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import {
  useAddUser,
  useDeleteUser,
  useEditUser,
  useGetUsers,
} from "../query/usersAPI"; // adjust path if needed
import { useQueryClient } from "@tanstack/react-query";

export const AdminUsers = () => {
  const toast = useToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | "">("");
  const [lng, setLng] = useState<number | "">("");

  const queryClient = useQueryClient();
  const modal = useDisclosure();

  const { data, isFetching: isLoading } = useGetUsers("");
  const deleteMutation = useDeleteUser();
  const editMutation = useEditUser();
  const addMutation = useAddUser();

  const openCreate = () => {
    setSelectedUser(null);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setShopName("");
    setAddress("");
    setLat("");
    setLng("");
    modal.onOpen();
  };

  const openEdit = (user: any) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user?.phoneNumber);
    setShopName(user?.profile?.shopName);
    setAddress(user?.profile?.address);
    setLat(user.location?.lat ?? "");
    setLng(user.location?.lng ?? "");
    modal.onOpen();
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleSubmit = () => {
    const payload = {
      firstName,
      lastName,
      phoneNumber,
      shopName,
      address,
    };

    if (selectedUser) {
      editMutation.mutateAsync({ id: selectedUser.id, ...payload }).then(() => {
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
          مدیریت کاربران
        </Text>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="teal"
          onClick={openCreate}
        >
          افزودن کاربر
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
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>شماره موبایل</Th>
              <Th>نام فروشگاه</Th>
              <Th>آدرس</Th>
              <Th>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((user: any) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.phoneNumber}</Td>
                <Td>{user?.profile?.shopName}</Td>
                <Td>{user?.profile?.address}</Td>
                <Td>
                  <HStack>
                    <PencilSimple
                      color="blue"
                      size={20}
                      onClick={() => openEdit(user)}
                    />
                    {/* <Trash
                      size={20}
                      color="red"
                      onClick={() =>
                        deleteMutation
                          .mutateAsync({ id: user.id })
                          .then(handleUpdate)
                      }
                    /> */}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedUser ? "ویرایش کاربر" : "افزودن کاربر"}
          </ModalHeader>
          <ModalBody>
            <SimpleGrid columns={2} spacing={3}>
              <FormControl>
                <FormLabel>نام</FormLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>نام خانوادگی</FormLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>شماره موبایل</FormLabel>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>نام فروشگاه</FormLabel>
                <Input
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>آدرس</FormLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>عرض جغرافیایی (lat)</FormLabel>
                <Input
                  type="number"
                  value={lat}
                  onChange={(e) =>
                    setLat(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>طول جغرافیایی (lng)</FormLabel>
                <Input
                  type="number"
                  value={lng}
                  onChange={(e) =>
                    setLng(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl> */}
            </SimpleGrid>
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
