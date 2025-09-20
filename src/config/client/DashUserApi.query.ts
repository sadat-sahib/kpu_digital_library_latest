import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashUsersApi, { User } from "../client/DashUserApi";


export const useGetActiveUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["getActiveUsers"],
    queryFn: DashUsersApi.homePage.getActiveUsers,
    refetchOnWindowFocus: false,
  });
};


export const useGetInActiveUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["getInActiveUsers"],
    queryFn: DashUsersApi.homePage.getInActiveUsers,
    refetchOnWindowFocus: false,
  });
};

export const useGetAllUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["getAllUsers"],
    queryFn: DashUsersApi.homePage.getAllUsers,
    refetchOnWindowFocus: false,
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<number | string, Error, number | string>({
    mutationFn: DashUsersApi.homePage.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      queryClient.invalidateQueries({ queryKey: ["getActiveUsers"] });
      queryClient.invalidateQueries({ queryKey: ["getInActiveUsers"] });
    },
  });
};


export const useActivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<number | string, Error, number | string>({
    mutationFn: DashUsersApi.homePage.activateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      queryClient.invalidateQueries({ queryKey: ["getActiveUsers"] });
      queryClient.invalidateQueries({ queryKey: ["getInActiveUsers"] });
    },
  });
};
