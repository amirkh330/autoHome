import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text
} from "@chakra-ui/react";

export const UnitCard = ({ index, register, watch }: any) => {
  const residencyType = watch(`units.${index}.residencyType`);

  return (
    <Box p={4} borderRadius="2xl" borderWidth={1} bg="white" mb={3}>
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="bold">واحد {index + 1}</Text>
      </Flex>

      <FormControl mb={3}>
        <FormLabel>نوع سکونت</FormLabel>
        <Select {...register(`units.${index}.residencyType`)}>
          <option value="owner">مالک</option>
          <option value="tenant">مستاجر</option>
          <option value="both">هر دو</option>
        </Select>
      </FormControl>

      {(residencyType === "owner" || residencyType === "both") && (
        <Box bg="gray.50" p={3} rounded="xl" mb={3}>
          <Text fontWeight="bold" mb={2}>
            👤 اطلاعات مالک
          </Text>
          <Input
            placeholder="نام"
            mb={2}
            {...register(`units.${index}.owner.fullName`)}
          />
          <Input
            placeholder="تلفن"
            {...register(`units.${index}.owner.phone`)}
          />
        </Box>
      )}

      {(residencyType === "tenant" || residencyType === "both") && (
        <Box bg="gray.50" p={3} rounded="xl">
          <Text fontWeight="bold" mb={2}>
            👥 اطلاعات مستاجر
          </Text>
          <Input
            placeholder="نام"
            mb={2}
            {...register(`units.${index}.tenant.fullName`)}
          />
          <Input
            placeholder="تلفن"
            {...register(`units.${index}.tenant.phone`)}
          />
        </Box>
      )}

      <Flex gap={2} mt={4}>
        <FormControl>
          <FormLabel>متراژ</FormLabel>
          <Input type="number" {...register(`units.${index}.area`)} />
        </FormControl>
        <FormControl>
          <FormLabel>نفرات</FormLabel>
          <Input type="number" {...register(`units.${index}.people`)} />
        </FormControl>
        <FormControl>
          <FormLabel>پارکینگ</FormLabel>
          <Input type="number" {...register(`units.${index}.parking`)} />
        </FormControl>
      </Flex>
    </Box>
  );
};
