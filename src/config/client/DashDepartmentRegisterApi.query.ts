

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashDepartmentRegisterApi, {
  Faculty,
} from "./DashDepartmentRegisterApi";



export const useGetFacultiesWithDepartments = () => {
  return useQuery<Faculty[], Error>({
    queryKey: ["facultiesWithDepartments"],
    queryFn: () =>
      DashDepartmentRegisterApi.department.getFacultiesWithDepartments(),
    refetchOnWindowFocus: false,
  });
};

export const useAddDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { fac_id: number; name: string }) =>
      DashDepartmentRegisterApi.department.addDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facultiesWithDepartments"] });
    },
    onError: (error) => {
      console.error("❌ خطا در اضافه کردن دیپارتمنت", error);
    },
  });
};
