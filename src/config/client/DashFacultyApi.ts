
import DashAuthFetcher from "./DashAuthFetcher"

export type Faculty = {
  id: number;
  name: string;
};

const DASHBOARD_ENDPOINTS = {
  ADD_FACULTY: `/api/dashboard/faculties`,
  GET_FACULTIES: `/api/dashboard/faculties`,
};

class DashFacultyApi {
  faculty = {
    getFaculties: async (): Promise<Faculty[]> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_FACULTIES);
      return res.data.data; // ✅ فقط لیست
    },
    addFaculty: async (data: { name: string }) => {
      const res = await DashAuthFetcher.post(DASHBOARD_ENDPOINTS.ADD_FACULTY, data);
      return res.data; // ✅ فقط دیتا
    },
  };
}

const FacultyApi = new DashFacultyApi();
export default FacultyApi;
