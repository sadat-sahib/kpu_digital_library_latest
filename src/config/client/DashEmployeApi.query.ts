import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashEmployeApi from "./DashEmployeApi";

export const useGetActiveTeachers = () => {
  return useQuery({
    queryKey: ["getActivatedTeachers"],
    queryFn: () => DashEmployeApi.employePage.getActivatedTeachers(),
    refetchOnWindowFocus: false,
  });
};
export const useGetInActiveTeachers = () => {
  return useQuery({
    queryKey: ["getInActivatedTeachers"],
    queryFn: () => DashEmployeApi.employePage.getInActivatedTeachers(),
    refetchOnWindowFocus: false,
  });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (bookId: string) => DashEmployeApi.employePage.AddUser(bookId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "addUser" });
      },
      onError: (error) => {
        console.error("❌خطا د اضافه کردن کاربر", error);
      },
    });
  };

