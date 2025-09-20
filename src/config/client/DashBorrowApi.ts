import DashAuthFetcher from "./DashAuthFetcher";
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
  GET_ACTIVATED_USERS_RESERVES: `/api/dashboard/reserves/activated/users`,
  DELETE_ACTIVATED_USERS: (bookId: number | string) => `/api/dashboard/users/destroy/${bookId}`,
  GET_IN_ACTIVE_USERS_RESERVES: `/api/dashboard/reserves/inactive/users`,
  DELETE_IN_ACTIVE_USERS_RESERVES: (bookId: number | string) =>
    `/api/dashboard/reserves/inactive/user/delete/${bookId}`,
  ADD_REQUEST_BOOK: (selectedRequestId: number | string) =>
    `/api/dashboard/reserves/active/${selectedRequestId}`,
  ADD_RECEIVED_BOOK: (selectedReceivedId: number | string) =>
    `/api/dashboard/reserves/return/book/${selectedReceivedId}`,
};

class DashboardBorrowApi {
  borrowPage = {
    getActivatedUsers: async (): Promise<Request[]> => {
      const response = await DashAuthFetcher.get<{ data: Request[] }>(
        DASHBOARD_ENDPOINTS.GET_ACTIVATED_USERS_RESERVES
      );
      return response.data.data;
    },
    deleteActivatedUsers: async (bookId: number | string) => {
      return await DashAuthFetcher.delete(
        DASHBOARD_ENDPOINTS.DELETE_ACTIVATED_USERS(bookId)
      );
    },
    getInActiveUsers: async (): Promise<Request[]> => {
      const response = await DashAuthFetcher.get<{ data: Request[] }>(
        DASHBOARD_ENDPOINTS.GET_IN_ACTIVE_USERS_RESERVES
      );
      return response.data.data;
    },
    deleteInActiveUsers: async (bookId: number | string) => {
      return await DashAuthFetcher.delete(
        DASHBOARD_ENDPOINTS.DELETE_IN_ACTIVE_USERS_RESERVES(bookId)
      );
    },
    addRequestBook: async (selectedRequestId: number | string, returnDate: string) => {
      return await DashAuthFetcher.post(
        DASHBOARD_ENDPOINTS.ADD_REQUEST_BOOK(selectedRequestId),
        { return_by: returnDate }
      );
    },
    addReceivedBook: async (selectedReceivedId: number | string) => {
      return await DashAuthFetcher.post(
        DASHBOARD_ENDPOINTS.ADD_RECEIVED_BOOK(selectedReceivedId)
      );
    },
  };
}

const DashBorrowApi = new DashboardBorrowApi();
export default DashBorrowApi;
