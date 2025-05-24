
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashCategoriesRegisterApi from "./DashCategoryRegistration";

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["getCategory"],
        queryFn: () =>DashCategoriesRegisterApi.categoryRegister.getCategories() ,
        refetchOnWindowFocus: false,
    })    
}
    
export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
            DashCategoriesRegisterApi.categoryRegister.AddCategory(),
        onSuccess: () => {
            // وقتی حذف شد، کارت را دوباره fetch کن
            queryClient.invalidateQueries({ queryKey: ["addCategory"] }); // ✅ درست
        },
        onError: (error) => {
            console.error("خطا در اضافه کردن کتگ.ری", error);
        },
    })
    };