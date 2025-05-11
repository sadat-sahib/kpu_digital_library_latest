import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";
export type Department = {
    id: number;
    name: string;
  };
  
  export type Faculty = {
    id: number;
    name: string;
    departments: Department[];
  };

const DASHBOARD_ENDPOINTS = {
    //DASH DEPARTMENT REGISTRATION
    GET_FACULTIES: `/api/dashboard/faculties`,
    ADD_DEPARMENTS: `/api/dashboard/departments`,
    //DASH TABLE
    GET_FACULTIES_WITH_DEPARTMENTS: `/api/dashboard/faculties/with/departments`
};

class DashboardDepartmentRegistrationApi {
    borrowPage = {
        getFaculties: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_FACULTIES

            )
        },
        getFacultiesWithDepartments: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_FACULTIES_WITH_DEPARTMENTS

            )
        },
        AddDepartments: async () => {
            return await fetcher.delete(
                DASHBOARD_ENDPOINTS.ADD_DEPARMENTS
            )
        },
    }
}
const DashDepartmentRegisterApi = new DashboardDepartmentRegistrationApi()
export default DashDepartmentRegisterApi;