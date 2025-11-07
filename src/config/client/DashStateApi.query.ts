import { useQuery } from "@tanstack/react-query";
import DashStateApi from "./DashStateApi";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => DashStateApi.statePage.getDashboardStats(),
    refetchOnWindowFocus: false,
  });
};
