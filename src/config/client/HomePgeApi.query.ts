import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import homePageApi from "./HomePageApi";



// new version

// 📌 گرفتن لیست کتاب‌های داخل کارت
export const useGetShoppingCartInfo = () => {
  return useQuery({
    queryKey: ["shoppingCart"],
    queryFn: () => homePageApi.homePage.getShoppingCardBook(),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

// 📌 اضافه کردن کتاب به کارت
export const useAddToShoppingCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) =>
      homePageApi.homePage.addToShoppingCard(bookId),

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ["shoppingCart"] });

      const previousData = queryClient.getQueryData<any>(["shoppingCart"]);

      queryClient.setQueryData(["shoppingCart"], (old: any) => {
        // ✅ چک می‌کنیم old ساختارش چی هست
        const oldItems = old?.data?.data ?? [];
        return {
          ...old,
          data: {
            ...old?.data,
            data: [...oldItems, { id: bookId, optimistic: true }],
          },
        };
      });

      return { previousData };
    },

    onError: (_err, _bookId, context) => {
      queryClient.setQueryData(["shoppingCart"], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
  });
};

// 📌 حذف کتاب از کارت
export const useDeleteFromShoppingCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) =>
      homePageApi.homePage.deleteFromShoppingCard(bookId),

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ["shoppingCart"] });

      const previousData = queryClient.getQueryData<any>(["shoppingCart"]);

      queryClient.setQueryData(["shoppingCart"], (old: any) => {
        const oldItems = old?.data?.data ?? [];
        return {
          ...old,
          data: {
            ...old?.data,
            data: oldItems.filter((book: any) => book.id !== bookId),
          },
        };
      });

      return { previousData };
    },

    onError: (_err, _bookId, context) => {
      queryClient.setQueryData(["shoppingCart"], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
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
    staleTime: 1000 * 60 * 5,
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
