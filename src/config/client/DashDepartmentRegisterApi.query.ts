
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DashDepartmentRegisterApi from "./DashDepartmentRegisterApi";


export const useGetFaculties = () => {
    return useQuery({
        queryKey: ["getFaculties"],
        queryFn: () => DashDepartmentRegisterApi.department.getFaculties(),
        refetchOnWindowFocus: false,
    })    
}
export const useGetFacultiesWithDepartments = () => {
    return useQuery({
        queryKey: ["getFacultiesWithDepartments"],
        queryFn: () => DashDepartmentRegisterApi.department.getFacultiesWithDepartments(),
        refetchOnWindowFocus: false,
    })    
}
    
export const useAddDepartments = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
          DashDepartmentRegisterApi.department.AddDepartments(),
        onSuccess: () => {
            // وقتی حذف شد، کارت را دوباره fetch کن
            queryClient.invalidateQueries({ queryKey: ["addDepartment"] }); // ✅ درست
        },
        onError: (error) => {
            console.error("خطا در اضافه کردن دیپارتمنت", error);
        },
    })
    };