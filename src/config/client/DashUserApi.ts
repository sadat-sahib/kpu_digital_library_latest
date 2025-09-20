
import DashAuthFetcher from "./DashAuthFetcher";

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
  // DASH USERS
  GET_ACTIVE_USERS: `/api/dashboard/users/activated_students`,
  DELETE_USER: (userId: number | string) => `/api/dashboard/users/destroy/${userId}`,
  GET_IN_ACTIVE_USERS: `/api/dashboard/users/inactivated_students`,
  GET_ALL_USERS: `/api/dashboard/users`,
  // TEACHERS
  GET_ACTIVE_TEACHERS: `/api/dashboard/users/activated_teachers`,
  // USER TABLE
  GET_USER_CARD_BY_ID: (userId: number | string) => `/api/dashboard/users/activated_users/${userId}`,
  ACTIVATE_USER_BY_ID: (userId: number | string) => `/api/dashboard/users/activate_user/${userId}`,
};

class DashboardUserApi {
  homePage = {
    getActiveUsers: async (): Promise<User[]> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_ACTIVE_USERS);
      return res.data.data;
    },
    getInActiveUsers: async (): Promise<User[]> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_IN_ACTIVE_USERS);
      return res.data.data;
    },
    getAllUsers: async (): Promise<User[]> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_ALL_USERS);
      return res.data.data;
    },
    getActiveTeachers: async (): Promise<User[]> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_ACTIVE_TEACHERS);
      return res.data.data;
    },
    getUserCardById: async (userId: number | string): Promise<User> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_USER_CARD_BY_ID(userId));
      return res.data.data;
    },
    deleteUser: async (userId: number | string): Promise<number | string> => {
      await DashAuthFetcher.delete(DASHBOARD_ENDPOINTS.DELETE_USER(userId));
      return userId;
    },
    activateUser: async (userId: number | string): Promise<number | string> => {
      await DashAuthFetcher.post(DASHBOARD_ENDPOINTS.ACTIVATE_USER_BY_ID(userId));
      return userId;
    },
  };
}

const DashUsersApi = new DashboardUserApi();
export default DashUsersApi;
