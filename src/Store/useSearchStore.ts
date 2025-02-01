// import { create } from 'zustand';

// interface SearchState<T> {
//   query: string; // مقدار ورودی جستجو
//   filteredResults: T[]; // نتایج فیلتر شده
//   setQuery: (query: string) => void; // تابع برای تنظیم مقدار ورودی جستجو
//   setFilteredResults: (results: T[]) => void; // تابع برای تنظیم نتایج فیلتر شده
// }

// export const useSearchStore = create<SearchState<string>>((set) => ({
//   query: '',
//   filteredResults: [],
//   setQuery: (query) => set({ query }),
//   setFilteredResults: (results) => set({ filteredResults: results }),
// }));



// import { create } from 'zustand';

// interface SearchState<T> {
//   filteredResults: T[]; // نتایج فیلتر شده
//   setFilteredResults: (results: T[]) => void; // تابع برای تنظیم نتایج فیلتر شده
// }

// export const useSearchStore = create<SearchState<string>>((set) => ({
//   filteredResults: [],
//   setFilteredResults: (results) => set({ filteredResults: results }),
// }));





import { create } from 'zustand';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  faculty: string;
  department: string;
}

interface SearchState {
  query: string;
  filteredResults: Book[];
  setQuery: (query: string) => void;
  setFilteredResults: (results: Book[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  filteredResults: [],
  setQuery: (query) => set({ query }),
  setFilteredResults: (results) => set({ filteredResults: results }),
}));
