import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashBorrowApi from "./DashBorrowApi";

export const useGetActivatedUsers = () => {
  return useQuery({
    queryKey: ["getActivatedUsers"],
    queryFn: () => DashBorrowApi.borrowPage.getActivatedUsers(),
    refetchOnWindowFocus: false,
  });
};
export const useGetInActiveUsers = () => {
  return useQuery({
    queryKey: ["getInActivatedUsers"],
    queryFn: () => DashBorrowApi.borrowPage.getInActiveUsers(),
    refetchOnWindowFocus: false,
  });
};

export const useDeleteActiveUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) =>
      DashBorrowApi.borrowPage.deleteActivatedUsers(bookId),
    onSuccess: () => {
      // وقتی حذف شد، کارت را دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["deleteActiveUsers"] }); // ✅ درست
    },

    onError: (error) => {
      console.error("❌ خطا در حذف کاربرغیر فعال", error);
    },
  });
};
export const useDeleteInActiveUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) =>
      DashBorrowApi.borrowPage.deleteInActiveUsers(bookId),
    onSuccess: () => {
      // وقتی حذف شد، کارت را دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["deleteInActiveUsers"] }); // ✅ درست
    },

    onError: (error) => {
      console.error("❌ خطا در حذف کاربر فعال" , error);
    },
  });
};
