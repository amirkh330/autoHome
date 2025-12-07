import debounce from "lodash.debounce";
import { useState } from "react";
import { useGetMyCustomers } from "../query/getCustomers";

export const useShopCustomers = () => {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const { data, isLoading } = useGetMyCustomers("");

  const debouncedSearch = debounce((val: string) => {
    setSearch(val);
  }, 700);

  return {
    data,
    isLoading,
    search,
    setSearch,
    debouncedSearch,
    value,
    setValue,
  };
};
