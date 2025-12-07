import React, { useMemo } from "react";
import { useGetMyOrderList } from "../query/getMyOrderList";
import { useGetMyNextSession } from "../query/getMyNextSession";

export const useCustomerReports = () => {
  const { data, isLoading } = useGetMyOrderList();

  return { data, isLoading };

 
};
