

import DashAuthFetcher from "./DashAuthFetcher";

export type Category = {
  id: number;
  name: string;
};

const DASHBOARD_ENDPOINTS = {
  ADD_CATEGORY: `/api/dashboard/categories`,
  GET_CATEGORIES: `/api/dashboard/categories`,
};

class DashboardCategoriesRegistrationApi {
  categoryRegister = {
    getCategories: async () => {
      const response = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_CATEGORIES);
      return response.data.data; // ✅ only return useful data
    },
    addCategory: async (data: { name: string }) => {
      const response = await DashAuthFetcher.post(DASHBOARD_ENDPOINTS.ADD_CATEGORY, data);
      return response.data;
    },
  };
}

const DashCategoriesRegisterApi = new DashboardCategoriesRegistrationApi();
export default DashCategoriesRegisterApi;
