import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import homePageApi from "./HomePageApi";

// export const useGetProfileInfo = () => {
//   return useQuery({
//     queryKey: ["profileInfo"],
//     queryFn: () => homePageApi.homePage.getProfileInfo(),
//     refetchOnWindowFocus: false,
//   });
// };

export const useAddToShoppingCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) =>
      homePageApi.homePage.addToShoppingCard(bookId),
    onSuccess: () => {
      // وقتی کتاب به کارت اضافه شد، کارت را دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["addToshoppingCard"] }); // ✅ درست
    },
    onError: (error) => {
      console.error("❌ خطا در اضافه کردن به کارت:", error);
    },
  });
};

export const useGetShoppingCardInfo = () => {
  return useQuery({
    queryKey: ["shopingCardInfo"],
    queryFn: () => homePageApi.homePage.getShoppingCardBook(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 500,
  });
};

export const useDeleteFromShoppingCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) =>
      homePageApi.homePage.deleteFromShoppingCard(bookId),

    onSuccess: () => {
      // وقتی حذف شد، کارت را دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["shoppingCard"] }); // ✅ درست
    },

    onError: (error) => {
      console.error("❌ خطا در حذف از کارت:", error);
    },
  });
};

export const useReserveBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => homePageApi.homePage.reserveBooks(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "reservBook" });
    },
    onError: (error) => {
      console.error("❌ خطا در رزرو کتاب:", error);
    },
  });
};

export const useSearchBooks = (searchType: string, searchKey: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => homePageApi.homePage.searchBooks(searchType, searchKey),
    onSuccess: () => {
      // وقتی کتاب‌ها جستجو شدند، کارت را دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["searchBooks"] }); // ✅ درست
    },
    onError: (error) => {
      console.error("❌ خطا در جستجوی کتاب:", error);
    },
  });
};

// export const useGetCategoriesWithBooks = () => {
//   return useQuery({
//     queryKey: ["categoriesWithBooks"],
//     queryFn: () => homePageApi.homePage.getCategoriesWithBooks(),
//     refetchOnWindowFocus: false,
//   });
// };

export const useGEtBooksByCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["booksByCategoryId", categoryId],
    queryFn: () => homePageApi.homePage.getBooksByCategoryId(categoryId),
    refetchOnWindowFocus: false,
  });
};
//NEW ROUTS
export const useGetAllInformation = () => {
  return useQuery({
    queryKey: ["getAllInformation"],
    queryFn: () => homePageApi.homePage.getAllInformation(),
    refetchOnWindowFocus: false,
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["getAllCategories"],
    queryFn: () => homePageApi.homePage.getAllCategories(),
    refetchOnWindowFocus: false,
  });
};

export const useGetBookDetailById = (categoryId?: number) => {
  return useQuery({
    queryKey: ["bookDetailById", categoryId],
    queryFn: () => homePageApi.homePage.getBookDetailById(categoryId),
    refetchOnWindowFocus: false,
  });
};

export const useNewgetCategoriesWithBooks = () => {
  return useQuery({
    queryKey: ["newCategoriesWithBooks"],
    queryFn: () => homePageApi.homePage.NewgetCategoriesWithBooks(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5
  });
};
export const usegetFacultyWithDepartments = () => {
  return useQuery({
    queryKey: ["getFacultyWithDepartments"],
    queryFn: () => homePageApi.homePage.getFacutlyWithDepartments(),
    refetchOnWindowFocus: false,
  });
};
export const usegetHomeData = () => {
  return useQuery({
    queryKey: ["getHomeData"],
    queryFn: () => homePageApi.homePage.getFacutlyWithDepartments(),
    refetchOnWindowFocus: false,
  });
};
export const usegetProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: () => homePageApi.homePage.getProfile(),
    refetchOnWindowFocus: false,
  });
};