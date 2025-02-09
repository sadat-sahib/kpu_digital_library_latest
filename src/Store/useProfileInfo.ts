import { create } from "zustand";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  type: string;
}

interface Book {
  id: string;
  book_title: string;
  book_author: string;
  book_image: string;
  reserve_date: string | null;
  return_date: string | null;
}

interface LibraryState {
  user: User | null;
  books: Book[];
  setUser: (user: User) => void;
  clearUser: () => void;
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
  clearBooks: () => void;
}

export const useProfileInfo = create<LibraryState>((set) => ({
  user: null,
  books: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setBooks: (books) => set({ books }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (bookId) =>
    set((state) => ({ books: state.books.filter((book) => book.id !== bookId) })),
  clearBooks: () => set({ books: [] }),
}));
