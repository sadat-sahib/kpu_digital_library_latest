
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SectionApi from "./DashSectionApi";




export const useGetSection = () => {
    return useQuery({
        queryKey: ["getSection"],
        queryFn: () => SectionApi.section.getSections,
        refetchOnWindowFocus: false,
    })    
}

    
export const useAddFaculties = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
          SectionApi.section.addSection(),
        onSuccess: () => {
            // وقتی حذف شد، کارت را دوباره fetch کن
            queryClient.invalidateQueries({ queryKey: ["addSection"] }); // ✅ درست
        },
        onError: (error) => {
            console.error("خطا در اضافه کردن بخش", error);
        },
    })
    };