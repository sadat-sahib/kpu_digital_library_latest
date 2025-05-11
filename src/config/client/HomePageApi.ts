import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";
export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: "active" | "inactive" | string; // در صورت وجود انواع دیگر وضعیت
    type: "student" | "admin" | string;     // بسته به نقش‌ها
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
  
const HOME_PAGE_ENDPOINTS = {
    BOOKS_BY_CATEGORY_ID: (categoryId: string) => `/api/categories/books/${categoryId}`,
    CATEGORIES_WITH_BOOKS:'/api/home',
    ADD_TO_SHOPING_CARD: (bookId: string) => `/api/cart/books/${bookId}`,
    SHOPING_CARD_BOOKS: '/api/cart/books',
    DELETE_FROM_SHOPPING_CARD: (bookId:string) => `/api/cart/books/${bookId}`,
    RESERVE_BOOKS: (bookId: string) => `/api/reserve/books/${bookId}`,
    SEARCH_BOOKS: (searchType: string, searchKey: string) => `/api/books/search?type=${searchType}&key=${searchKey}`,
    PROFILE_INFO: 'api/account/profile',
    
};

class HomePageApi {
    homePage = {
        getBooksByCategoryId: async (categoryId: string) => {
            return await fetcher.get(
                HOME_PAGE_ENDPOINTS.BOOKS_BY_CATEGORY_ID(categoryId)
            )
        },
        getCategoriesWithBooks: async () => {
            return await fetcher.get(
                HOME_PAGE_ENDPOINTS.CATEGORIES_WITH_BOOKS
            )
        },
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
        getProfileInfo: async () => {
            return await authFetcher.get<ProfileResponse>(
                HOME_PAGE_ENDPOINTS.PROFILE_INFO
            )
        }
    }
}
const homePageApi = new HomePageApi()
export default homePageApi;