import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useManagerApartments } from "./managerApartments.biz";
import { UnitCard } from "@/components/Common/UnitCard/UnitCard";

// ============ Component =======================
export const ManagerApartments = () => {
  const { unitRefs, register, control, handleSubmit, watch, fields, onSubmit } =
    useManagerApartments();
  return (
    <Box p={5}>
      <Heading size="lg" mb={5}>
        اطلاعات ساختمان
      </Heading>

      <Text fontSize="md" color="gray.600" mb={4}>
        لطفاً اطلاعات واحدها را با دقت تکمیل کنید. این بخش برای مدیریت قبض‌ها،
        شارژ و پیامک اهمیت دارد.
      </Text>

      <Flex overflowX="auto" mb={4} gap={2} p={2}>
        {fields.map((unit, index) => {
          const isComplete =
            ((unit.owner?.fullName && unit.owner?.phone) ||
              unit.residencyType !== "owner") &&
            ((unit.tenant?.fullName && unit.tenant?.phone) ||
              unit.residencyType !== "tenant") &&
            unit.area &&
            unit.people &&
            unit.parking;

          return (
            <Box
              key={unit.id}
              minW="40px"
              h="40px"
              bg={isComplete ? "green.400" : "red.400"}
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="sm"
              cursor="pointer"
              onClick={() =>
                unitRefs.current[index]?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {index + 1}
            </Box>
          );
        })}
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={1} spacing={4}>
          {fields.map((unit, index) => (
            <Box
              key={unit.id}
              ref={(el) => el && (unitRefs.current[index] = el)}
            >
              <UnitCard
                key={unit.id}
                index={index}
                register={register}
                watch={watch}
              />
            </Box>
          ))}
        </SimpleGrid>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          mt={6}
          w="full"
          rounded="full"
        >
          ذخیره اطلاعات ساختمان
        </Button>
      </form>
    </Box>
  );
};
