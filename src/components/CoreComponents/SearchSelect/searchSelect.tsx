import {
  Box,
  Input,
  Spinner,
  VStack,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useState, useRef, useCallback } from "react";
import debounce from "lodash.debounce";

interface ISearchSelect {
  value: string;
  onChange: (value: string) => void;
  onSearch: (search: string) => void;
  onSelect: (item: any) => void;
  options: any[];
  loading?: boolean;
  placeholder?: string;
}

export const SearchSelect = ({
  value,
  onChange,
  onSearch,
  onSelect,
  options,
  loading = false,
  placeholder = "جستجو...",
}: ISearchSelect) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => setOpen(false),
  });

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      onSearch(val);
    }, 400),
    []
  );

  const handleInput = (val: string) => {
    onChange(val);
    debouncedSearch(val);
    setOpen(true);
  };

  return (
    <Box ref={ref} pos="relative" width="100%">
      <Input
        placeholder={placeholder}
        bg="amir.secondaryBg"
        mb="3"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <Box
          mt={1}
          pos="absolute"
          w="100%"
          bg="amir.secondaryBg"
          borderRadius="8px"
          border="1px solid #444"
          maxH="200px"
          overflowY="auto"
          zIndex={999}
        >
          {loading ? (
            <Box p={3} textAlign="center">
              <Spinner size="sm" />
            </Box>
          ) : options.length === 0 ? (
            <Box p={3}>
              <Text fontSize="14px" color="gray.400">
                نتیجه‌ای یافت نشد
              </Text>
            </Box>
          ) : (
            <VStack align="stretch" spacing={0}>
              {options.map((item) => {
                return (
                  <Box
                    key={item.id}
                    w="100%"
                    px={3}
                    py={2}
                    _hover={{ bg: "gray.600" }}
                    cursor="pointer"
                    onClick={() => {
                      onSelect(item);
                      onChange(item.title);
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </Box>
                );
              })}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
};
