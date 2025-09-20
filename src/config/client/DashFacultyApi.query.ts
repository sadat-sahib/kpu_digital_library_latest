
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FacultyApi, { Faculty } from "./DashFacultyApi";

export const useGetFaculties = () => {
  return useQuery<Faculty[], Error>({
    queryKey: ["faculties"],
    queryFn: () => FacultyApi.faculty.getFaculties(),
    refetchOnWindowFocus: false,
  });
};

export const useAddFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => FacultyApi.faculty.addFaculty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
    },
    onError: (error) => {
      console.error("❌ خطا در اضافه کردن پوهنځی", error);
    },
  });
};
