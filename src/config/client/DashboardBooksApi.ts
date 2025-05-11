import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";
export type FormValues = {
    title: string;
    author: string;
    publisher: string;
    dep_id: number;
    cat_id: number;
    format: string;
    barrow: string;
    image: File;
    shelf: string;
    publicationYear: string;
    lang: string;
    translator: string;
    sec_id: string;
    lockerNumber: string;
    isbn: string;
    description: string;
    total: number;
    edition: string;
    code: string;
    pdf?: File;
  };
  
  export interface Department {
    id: number;
    name: string;
  }
  
  export interface Shelf {
    id: number;
    section: string;
  }
  
 export interface Category {
    id: number;
    name: string;
  } 
  //dash books
  export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    publicationYear: string;
    department: string;
    description: string;
    edition: number;
    faculty: string;
    isbn: string;
    translator: string;
    lang: string;
    borrow: string;
    category: string;
    code: string;
  }
  //dash reserved books
  interface ReservedBook {
    book_author: string;
    book_code: string;
    book_status: string;
    book_title: string;
    category: string;
    id: number;
    isbn: string;
    publicationYear: string;
    return_date: string;
    section: string;
    shelf: number;
    total_book: number;
    user_id: number;
  }
const DASHBOARD_ENDPOINTS = {
    //BOOK RESERVATION
    GET_DEPARTMENTS: `/api/dashboard/departments`,
    GET_SECTIONS: '/api/dashboard/sections',
    GET_CATEGORIES: `/api/dashboard/categories`,
    GET_BOOKS_BY_ID: (bookId) => `/api/dashboard/books/${bookId}`,
    //DASH BOOKS
    GET_DASBOARD_BOOKS: `/api/dashboard/books`,
    DELETE_DASHBOARD_BOOKS: (bookId:string) => `/api/dashboard/books/${bookId}`,
    //DASH RESERVED BOOKS
    GET_RESERVED_BOOKS: `/api/dashboard/reserves/books/in/reserve`,
    
};

class DashboardBooksApi {
    DashBook = {
        getDepartments: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_DEPARTMENTS

            )
        },
        getSections: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_SECTIONS
            )
        },
        getCategories: async () => {
            return await authFetcher.get(
                DASHBOARD_ENDPOINTS.GET_CATEGORIES
            )
        },
        getBooksById: async (bookId) => {
            return await authFetcher.get(
                DASHBOARD_ENDPOINTS.GET_BOOKS_BY_ID(bookId)
            )
        },
        getDashboardBooks: async () => {
            return await authFetcher.get(
                DASHBOARD_ENDPOINTS.GET_DASBOARD_BOOKS
            )
        },
        deleteDashboardBooks: async (bookId) => {
            return await authFetcher.delete(
                DASHBOARD_ENDPOINTS.DELETE_DASHBOARD_BOOKS(bookId)
            )
        },
        getReservedBooks: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_RESERVED_BOOKS
            )
        },
    }
}
const DashBooksApi = new DashboardBooksApi()
export default DashBooksApi;