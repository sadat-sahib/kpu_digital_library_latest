import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashBooksApi from "./DashboardBooksApi";

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ["getDepartments"],
    queryFn: () => DashBooksApi.DashBook.getDepartments(),
    refetchOnWindowFocus: false,
  });
};
export const useGetSections = () => {
  return useQuery({
    queryKey: ["getSections"],
    queryFn: () => DashBooksApi.DashBook.getSections(),
    refetchOnWindowFocus: false,
  });
};
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: () => DashBooksApi.DashBook.getCategories(),
    refetchOnWindowFocus: false,
  });
};
export const useGetBooksById = (bookId) => {
  return useQuery({
    queryKey: ["getBooksById", bookId],
    queryFn: (bookId) => DashBooksApi.DashBook.getBooksById(bookId),
    refetchOnWindowFocus: false,
  });
};
export const useGetCatDashboardBooks = () => {
  return useQuery({
    queryKey: ["getDashboardBooks"],
    queryFn: () => DashBooksApi.DashBook.getDashboardBooks(),
    refetchOnWindowFocus: false,
  });
};
export const useGetReservedBooks = () => {
  return useQuery({
    queryKey: ["getReservedBooks"],
    queryFn: () => DashBooksApi.DashBook.getReservedBooks(),
    refetchOnWindowFocus: false,
  });
};

export const useDeleteDashboardBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) =>
      DashBooksApi.DashBook.deleteDashboardBooks(bookId),

    onSuccess: () => {
      // وقتی حذف شد، کارت را دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["deleteBookFromDashboard"] }); // ✅ درست
    },

    onError: (error) => {
      console.error("❌ خطا در حذف از کارت:", error);
    },
  });
};
