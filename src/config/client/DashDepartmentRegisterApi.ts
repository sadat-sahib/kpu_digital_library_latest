

import DashAuthFetcher from "./DashAuthFetcher";

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
  
  ADD_DEPARTMENTS: `/api/dashboard/departments`,
  GET_FACULTIES_WITH_DEPARTMENTS: `/api/dashboard/faculties-with-departments`,

};

class DashboardDepartmentRegistrationApi {
  department = {

    getFacultiesWithDepartments: async (): Promise<Faculty[]> => {
      const res = await DashAuthFetcher.get(
        DASHBOARD_ENDPOINTS.GET_FACULTIES_WITH_DEPARTMENTS
      );
      return res.data.data;
    },
    addDepartment: async (data: { fac_id: number; name: string }) => {
      const res = await DashAuthFetcher.post(
        DASHBOARD_ENDPOINTS.ADD_DEPARTMENTS,
        data
      );
      return res.data;
    },
  };
}

const DashDepartmentRegisterApi = new DashboardDepartmentRegistrationApi();
export default DashDepartmentRegisterApi;
