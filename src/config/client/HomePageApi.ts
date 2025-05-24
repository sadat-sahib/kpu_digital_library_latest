import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";
export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: "active" | "inactive" | string; 
    type: "student" | "admin" | string;    
  }
  export interface Book {
    book_title: string;
    book_author: string;
    book_image: string;
    reserve_date: string;
    return_date: string;
  }
  
  export interface ProfileResponse {
    books: Book[]; 
    user: UserProfile;
  }

  //NEW ROUTS
   export interface AllInformation {
    all_books: number,
    all_reservable_books: number,
    all_barrowable_books: number,
    pdf_books: number,
    hard_books: number,
    both_type_books: number,
    all_registered_books: number
    all_registered_users: number;
   }
   export interface AllInfoRespons {
    data: {
        information: AllInformation;
    }
   }

export interface AllCategories {
  id: number;
  name: string;
}

export interface AllCategoriesResponse {
  data: AllCategories[];
}


   export interface BookDetail {
    id: number,
    title: string;
    author: string;
    publisher: string;
    lang: string;
    publicationYear: string;
    translator: string;
    isbn: string;
    code: string;
    description: string;
    department: string;
    cat_id: number;
    format: string;
    borrow_status: string;
    category: string
    image: string;
    faculty: string;
    edition: string;
   }
   export interface Book {
    id: number,
    title: string,
    author: string,
    image: string,
    category_name: string
   }

   export interface NewCategoriesWithBooks {
    category_id: number,
    category_name: string,
    books: Book[]
   }
   export interface CatWithBooksRespons {
    data: NewCategoriesWithBooks[];
   }
  
const HOME_PAGE_ENDPOINTS = {
    BOOKS_BY_CATEGORY_ID: (categoryId: string) => `/api/categories/books/${categoryId}`,
    // CATEGORIES_WITH_BOOKS:'/api/home',
    ADD_TO_SHOPING_CARD: (bookId: string) => `/api/cart/books/${bookId}`,
    SHOPING_CARD_BOOKS: '/api/cart/books',
    DELETE_FROM_SHOPPING_CARD: (bookId:string) => `/api/cart/books/${bookId}`,
    RESERVE_BOOKS: (bookId: string) => `/api/reserve/books/${bookId}`,
    SEARCH_BOOKS: (searchType: string, searchKey: string) => `/api/books/search?type=${searchType}&key=${searchKey}`,
    // PROFILE_INFO: '/api/account/profile',
    //NEW ROUTS
    GET_ALL_INFO: '/api/information',
    GET_ALL_CATEGORIES: '/api/categories',
    GET_BOOK_DETAIL_BY_ID: (bookId?: number) => `/api/bookDetail/${bookId}`,
    GET_CATEGORIES_WITH_BOOKS:'/api/categories_with_books',
    GET_FACULTY_WITH_DEPARTMENTS: '/api/home/faculties-with-departments',
    GET_HOME_DATA: '/api/home',
    VIEW_PROFILE: '/api/account/profile'
};

class HomePageApi {
    homePage = {
        getBooksByCategoryId: async (categoryId: string) => {
            return await fetcher.get(
                HOME_PAGE_ENDPOINTS.BOOKS_BY_CATEGORY_ID(categoryId)
            )
        },
        // getCategoriesWithBooks: async () => {
        //     return await fetcher.get(
        //         HOME_PAGE_ENDPOINTS.CATEGORIES_WITH_BOOKS
        //     )
        // },
        addToShoppingCard: async (bookId: string) => {
            return await authFetcher.post(
                HOME_PAGE_ENDPOINTS.ADD_TO_SHOPING_CARD(bookId)
            )
        },
        getShoppingCardBook: async () => {
            return await authFetcher.get(
              HOME_PAGE_ENDPOINTS.SHOPING_CARD_BOOKS  
            )
        },
        deleteFromShoppingCard: async (bookId:string) => {
            return await authFetcher.delete(
                HOME_PAGE_ENDPOINTS.DELETE_FROM_SHOPPING_CARD(bookId)
            )
        },
        reserveBooks: async (bookId: string) => {
            return await authFetcher.post(
                HOME_PAGE_ENDPOINTS.RESERVE_BOOKS(bookId)
            )
        },
        searchBooks: async (searchType: string, searchKey: string) => {
            return await fetcher.post(
                HOME_PAGE_ENDPOINTS.SEARCH_BOOKS(searchType, searchKey)
            )
        },
        // getProfileInfo: async () => {
        //     return await authFetcher.get<ProfileResponse>(
        //         HOME_PAGE_ENDPOINTS.PROFILE_INFO
        //     )
        // },
        //NEW ROUTS
        getAllInformation: async () => {
            return await fetcher.get<AllInfoRespons>(
                HOME_PAGE_ENDPOINTS.GET_ALL_INFO
            )
        },
        getAllCategories: async () => {
            return await fetcher.get<AllCategoriesResponse>(
                HOME_PAGE_ENDPOINTS.GET_ALL_CATEGORIES
            )
        },
        getBookDetailById: async (bookId?: number) => {
            return await fetcher.get<{data:BookDetail}>(
                HOME_PAGE_ENDPOINTS.GET_BOOK_DETAIL_BY_ID(bookId)
            )
        },
        NewgetCategoriesWithBooks: async () => {
            return await fetcher<CatWithBooksRespons>(
                HOME_PAGE_ENDPOINTS.GET_CATEGORIES_WITH_BOOKS
            )
        },
        getFacutlyWithDepartments: async () => {
            return await fetcher(
                HOME_PAGE_ENDPOINTS.GET_FACULTY_WITH_DEPARTMENTS
            )
        },
        getHomeData: async () => {
            return await fetcher(
                HOME_PAGE_ENDPOINTS.GET_HOME_DATA
            )
        },
        getProfile: async () => {
            return await authFetcher.get(
                HOME_PAGE_ENDPOINTS.VIEW_PROFILE
            )
        }

    }
}
const homePageApi = new HomePageApi()
export default homePageApi;