

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashBorrowApi from "./DashBorrowApi";


export const useGetActivatedUsersReserves = () => {
  return useQuery({
    queryKey: ["getActivatedUsers"],
    queryFn: () => DashBorrowApi.borrowPage.getActivatedUsers(),
    refetchOnWindowFocus: false,
  });
};


export const useGetInActiveUsersReserves = () => {
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
  
      queryClient.invalidateQueries({ queryKey: ["getActivatedUsers"] });
    },
    onError: (error) => {
      console.error("❌ خطا در حذف کاربر فعال", error);
    },
  });
};


export const useDeleteInActiveUsersReserves = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) =>
      DashBorrowApi.borrowPage.deleteInActiveUsers(bookId),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["getInActivatedUsers"] });
    },
    onError: (error) => {
      console.error("❌ خطا در حذف کاربر غیر فعال", error);
    },
  });
};


export const useAddRequestBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      selectedRequestId,
      returnDate,
    }: {
      selectedRequestId: string;
      returnDate: string;
    }) =>
      DashBorrowApi.borrowPage.addRequestBook(selectedRequestId, returnDate),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["getInActivatedUsers"] });
    },
    onError: (error) => {
      console.error("❌ خطا در اضافه کردن کتاب درخواست شده", error);
    },
  });
};


export const useAddReceivedBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedReceivedId: string) =>
      DashBorrowApi.borrowPage.addReceivedBook(selectedReceivedId),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["getActivatedUsers"] });
    },
    onError: (error) => {
      console.error("❌ خطا در ارسال کتاب گرفته شده", error);
    },
  });
};
