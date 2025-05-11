import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";

export type Faculty = {
    id: number;
    name: string;
  };
  
const DASHBOARD_ENDPOINTS = {
    //DASH FACULTIES
    ADD_FACULTIES: `/api/dashboard/faculties`,
    //DASH TABLE
    GET_fACULTIES: `/api/dashboard/faculties`
   
};

class DashFacultyApi {
    borrowPage = {
        getFaculties: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_fACULTIES

            )
        },
        addFaculties: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.ADD_FACULTIES

            )
        },
    }
}
const FacultyApi = new DashFacultyApi()
export default FacultyApi;