
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SectionApi, { Section } from "./DashSectionApi";

export const useGetSection = () => {
  return useQuery<Section[], Error>({
    queryKey: ["sections"],
    queryFn: () => SectionApi.section.getSections(),
    refetchOnWindowFocus: false,
  });
};

export const useAddSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { section: string }) =>
      SectionApi.section.addSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};
