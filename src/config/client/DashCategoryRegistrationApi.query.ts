
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashCategoriesRegisterApi from "./DashCategoryRegistration";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["getCategory"],
    queryFn: () => DashCategoriesRegisterApi.categoryRegister.getCategories(),
    refetchOnWindowFocus: false,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string }) =>
      DashCategoriesRegisterApi.categoryRegister.addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategory"] }); // ✅ refresh table after add
    },
    onError: (error) => {
      console.error("❌ خطا در اضافه کردن کتگوری", error);
    },
  });
};
