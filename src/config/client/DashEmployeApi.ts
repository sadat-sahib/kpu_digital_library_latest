import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    current_residence: string;
    original_residence: string;
    phone: string;
    type: string;
    department: string;
    faculty: string;
    nic: string;
    nin: string;
  }
const DASHBOARD_ENDPOINTS = {
    //DASH EMPLOYE
    GET_ACTIVATED_TEACHERS: `/api/dashboard/users/activated_teachers`,
    DELETE_USERS: (userId) => `/api/dashboard/users/destroy/${userId}`,
    //DASH IN ACTIVE EMPLOYE
    GET_IN_ACTIVATED_TEACHERS: `/api/dashboard/users/inactivated_teachers`
   
};

class DashboardEmployeApi {
    employePage = {
        getActivatedTeachers: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_ACTIVATED_TEACHERS

            )
        },
        getInActivatedTeachers: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_IN_ACTIVATED_TEACHERS

            )
        },
        AddUser: async (userId) => {
            return await fetcher.delete(
                DASHBOARD_ENDPOINTS.DELETE_USERS(userId)
            )
        },
    }
}
const DashEmployeApi = new DashboardEmployeApi()
export default DashEmployeApi;