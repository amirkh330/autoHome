import { useMemo } from "react";
import { useGetMyNextSession } from "../query/getMyNextSession";
import { useGetMyOrderList } from "../query/getMyOrderList";

export const useCustomerDashboard = () => {
 const { data, isLoading } = useGetMyOrderList();
  const { data: nextSession, isLoading: nextSessionLoading } =
    useGetMyNextSession();

  const reportsCount = useMemo(() => {
    return data && data?.length >= 3 ? 3 : data?.length;
  }, [data]);

  return { data, isLoading, nextSession, nextSessionLoading, reportsCount };
};
