// store.ts

import { create } from "zustand";



// تایپ مربوط به هر دسته از کتاب‌ها
export interface CategoryNumBook {
  name: string;
  books_count: number;
}

// تایپ مربوط به اطلاعات اصلی
export interface MainInformation {
  all_books: number;
  all_borrowable_books: number;
  all_registered_users: number;
  all_reservable_books: number;
  both_type_books: number;
  hard_books: number;
  pdf_books: number;
}

// اینترفیس استیت استور
interface StoreState {
  categoriesNumBooks: CategoryNumBook[];
  mainInformation: MainInformation | null; // از null استفاده شده تا در ابتدا مقدار خالی باشد
  setCategoriesNumBooks: (data: CategoryNumBook[]) => void;
  setMainInformation: (data: MainInformation) => void;
}

// ایجاد استور با Zustand
export const useLibraryStore = create<StoreState>((set) => ({
  categoriesNumBooks: [],
  mainInformation: null,
  setCategoriesNumBooks: (data: CategoryNumBook[]) => set({ categoriesNumBooks: data }),
  setMainInformation: (data: MainInformation) => set({ mainInformation: data }),
}));

