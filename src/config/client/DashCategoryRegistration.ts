import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";

export type Category = {
    id: number;
    name: string;
  };
const DASHBOARD_ENDPOINTS = {
    //DASH CATEGORY REGISTRATION
    ADD_CATEGORY: `/api/dashboard/categories`,
    //DASH CATEGORY TABLE
    GET_CATEGORIES: `/api/dashboard/categories`,
};

class DashboardCategoriesRegistrationApi {
    categoryRegister = {
        getCategories: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_CATEGORIES

            )
        },
        AddCategory: async () => {
            return await fetcher.delete(
                DASHBOARD_ENDPOINTS.ADD_CATEGORY
            )
        },
    }
}
const DashCategoriesRegisterApi = new DashboardCategoriesRegistrationApi()
export default DashCategoriesRegisterApi;