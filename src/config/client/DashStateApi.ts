import DashAuthFetcher from "./DashAuthFetcher";

export interface DashboardStats {
  user_stats: {
    active_students: number;
    deactive_students: number;
    deleted_students: number;
    active_teachers: number;
    deleted_teachers: number;
  };
  book_stats: {
    total_books: number;
    pdf_books: number;
    hard_books: number;
    both_format_books: number;
  };
  reservation_stats: {
    pending_reserves: number;   
    active_reserves: number;
    total_requests: number;
  };
}

const DASHBOARD_STATE_ENDPOINTS = {
  GET_STATS: "/api/dashboard/stats",
};

class DashboardStateApi {
  statePage = {
    getDashboardStats: async (): Promise<DashboardStats> => {
      const response = await DashAuthFetcher.get<{ data: DashboardStats }>(
        DASHBOARD_STATE_ENDPOINTS.GET_STATS
      );
      return response.data.data ?? response.data;
    },
  };
}

const DashStateApi = new DashboardStateApi();
export default DashStateApi;
