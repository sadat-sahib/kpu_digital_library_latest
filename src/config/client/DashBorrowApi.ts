import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";
export interface Request {
  id: number;
  book_title: string;
  book_author: string;
  book_code: string;
  book_status: string;
  remain_book: number;
  return_date: string;
  total_book: number;
  isbn: string;
  category: string;
  section: string;
  shelf: number;
  user_id: number;
  firstName: string;
  lastName: string;
  user_department: string;
  nic: string;
  nin: string;
  user_status: string;
}

const DASHBOARD_ENDPOINTS = {
  //DASH BORROW
  GET_ACTIVATED_USERS: `/api/dashboard/reserves/activated/users`,
  DELETE_ACTIVATED_USERS: (bookId) => `/api/dashboard/users/destroy/${bookId}`,
  //DASH REQUESTS
  GET_IN_ACTIVE_USERS: `/api/dashboard/reserves/inactive/users`,
  DELETE_IN_ACTIVE_USERS: (bookId) =>
    `/api/dashboard/reserves/inactive/user/delete/${bookId}`,
  ADD_REQUEST_BOOK: (selectedRequestId) => `/api/dashboard/reserves/active/${selectedRequestId}`,
  ADD_RECEIVED_BOOK: (selectedReceivedId) => `/api/dashboard/reserves/return/book/${selectedReceivedId}`
};

class DashboardBorrowApi {
  borrowPage = {
    getActivatedUsers: async () => {
      return await fetcher.get(DASHBOARD_ENDPOINTS.GET_ACTIVATED_USERS);
    },
    deleteActivatedUsers: async (bookId) => {
      return await fetcher.delete(
        DASHBOARD_ENDPOINTS.DELETE_ACTIVATED_USERS(bookId)
      );
    },
    getInActiveUsers: async () => {
      return await authFetcher.get(DASHBOARD_ENDPOINTS.GET_IN_ACTIVE_USERS);
    },
    deleteInActiveUsers: async (bookId) => {
      return await authFetcher.get(
        DASHBOARD_ENDPOINTS.DELETE_IN_ACTIVE_USERS(bookId)
      );
    },
    addRequestBook: async (selectedRequestId, returnDate) => {
      return await authFetcher.post(
        DASHBOARD_ENDPOINTS.ADD_REQUEST_BOOK(selectedRequestId),
        { return_by: returnDate }
      );
    },
    addReceivedBook: async (selectedReceivedId) => {
      return await authFetcher.post(
        DASHBOARD_ENDPOINTS.ADD_RECEIVED_BOOK(selectedReceivedId)
      );
    }
  };
}
const DashBorrowApi = new DashboardBorrowApi();
export default DashBorrowApi;
