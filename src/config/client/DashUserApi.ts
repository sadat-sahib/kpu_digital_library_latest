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
    //DASH USERS
    GET_ACTIVE_USERS: `/api/dashboard/users/activated_students`,
    DELETE_USER: (userId) => `/api/dashboard/users/destroy/${userId}`,
    GET_IN_ACTIVE_USERS: `/api/dashboard/users/inactivated_students`,
    GET_ALL_USERS:  `/api/dashboard/users`,
    //TEACHERS TOUT ALREADY EXIST 
    GET_ACTIVE_TEACHERS: `/api/dashboard/users/activated_teachers`,
    //USER TABLE
    GET_USER_CARD_BY_ID: (userId) => `/api/dashboard/users/activated_users/${userId}`,
    ACTIVATE_USER_BY_ID: (userId) => `/api/dashboard/users/activate_user/${userId}`
    
};

class DashboardUserApi {
    homePage = {
        getActiveUsers: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_ACTIVE_TEACHERS

            )
        },
        getInActiveUsers: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_IN_ACTIVE_USERS
            )
        },
        getAllUsers: async () => {
            return await authFetcher.get(
                DASHBOARD_ENDPOINTS.GET_ALL_USERS
            )
        },
        getActiveTeachers: async () => {
            return await authFetcher.get(
                DASHBOARD_ENDPOINTS.GET_ACTIVE_TEACHERS
            )
        },
        getUserCardById: async (userId) => {
            return await authFetcher.get(
                DASHBOARD_ENDPOINTS.GET_USER_CARD_BY_ID(userId)
            )
        },
        deleteUser: async (userId) => {
            return await authFetcher.delete(
                DASHBOARD_ENDPOINTS.DELETE_USER(userId)
            )
        },
        activateUser: async (userId) => {
            return await fetcher.post(
                DASHBOARD_ENDPOINTS.ACTIVATE_USER_BY_ID(userId)
            )
        },
    }
}
const DashUsersApi = new DashboardUserApi()
export default DashUsersApi;