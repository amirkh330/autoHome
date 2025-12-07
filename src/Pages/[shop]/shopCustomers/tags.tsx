import {
  Flex,
  Text,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
} from "@chakra-ui/react";

export const VehicleTags = ({ vehicles }: any) => {
  if (!vehicles || vehicles.length === 0) return null;

  const visible = vehicles.slice(0, 3); // فقط دو تا اول
  const hidden = vehicles.slice(3); // بقیه

  return (
    <Flex
      flexDirection="column"
      justify="space-between"
      align="start"
      gap={3}
      mb={2}
    >
      <Text fontSize="sm" color="amir.secondaryVariant" whiteSpace="nowrap">
        وسیله نقلیه:
      </Text>

      <Flex gap="4" align="center" flexWrap="wrap" mx={0}>
        {visible.map((v: any) => (
          <Tag key={v.id} size="sm" variant="subtle" colorScheme="blue" mx={0}>
            {v.title}
          </Tag>
        ))}

        {hidden.length > 0 && (
          <Popover>
            <PopoverTrigger>
              <Button
                size="xs"
                variant="ghost"
                color="blue.400"
                fontSize="12px"
                px={1}
              >
                +{hidden.length} مورد دیگر
              </Button>
            </PopoverTrigger>

            <PopoverContent
              width="fit-content"
              p={1}
              border="1px solid"
              borderColor="#a3a6a7ff"
              bgColor={"amir.secondaryBg"}
            >
              <PopoverBody>
                <Flex gap="4">
                  {hidden.map((v: any) => (
                    <Tag
                      key={v.id}
                      size="sm"
                      variant="subtle"
                      colorScheme="blue"
                    >
                      {v.title}
                    </Tag>
                  ))}
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
    </Flex>
  );
};
