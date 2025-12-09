import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { TUnit } from "./managerNotification.type";
import { userManagerNotification } from "./managerNotification.biz";

// نمونه داده اولیه
const initialUnits: TUnit[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `واحد ${i + 1}`,
}));

export const ManagerNotification = () => {
  const { announcements, register, handleSubmit, onSubmit } =
    userManagerNotification();
  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>
        اعلان‌ها
      </Heading>

      {/* ====== فرم ایجاد اعلان ====== */}
      <Box p={4} mb={6} bg="gray.50" borderRadius="2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            mb={3}
            placeholder="عنوان اعلان"
            {...register("title", { required: true })}
          />
          <Textarea
            mb={3}
            placeholder="توضیحات"
            {...register("description", { required: true })}
          />
          <Button type="submit" colorScheme="teal" w="full">
            ایجاد اعلان
          </Button>
        </form>
      </Box>

      {/* ====== لیست اعلان‌ها ====== */}
      <VStack spacing={4} align="stretch">
        {announcements.map((ann) => {
          const seenCount = ann.seenBy.length;
          const totalUnits = initialUnits.length;

          return (
            <Box
              key={ann.id}
              p={4}
              borderRadius="2xl"
              bg="white"
              boxShadow="sm"
              border="1px solid #e6e6e6"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold">{ann.title}</Text>
                <Badge
                  colorScheme={seenCount === totalUnits ? "green" : "yellow"}
                >
                  {seenCount}/{totalUnits} دیده‌اند
                </Badge>
              </Flex>
              <Text color="gray.600">{ann.description}</Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};
