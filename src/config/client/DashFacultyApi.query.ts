
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FacultyApi from "./DashFacultyApi";



export const useGetFaculties = () => {
    return useQuery({
        queryKey: ["getFaculty"],
        queryFn: () => FacultyApi.faculty.getFaculties,
        refetchOnWindowFocus: false,
    })    
}

    
export const useAddFaculties = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
          FacultyApi.faculty.addFaculties(),
        onSuccess: () => {
            // وقتی حذف شد، کارت را دوباره fetch کن
            queryClient.invalidateQueries({ queryKey: ["addFaculty"] }); // ✅ درست
        },
        onError: (error) => {
            console.error("خطا در اضافه کردن فاکولته", error);
        },
    })
    };