import fetcher from "./Fetcher";
import authFetcher from "./AuthFetcher";

export type Section = {
    id: number;
    section: string;
  };
  
  
const DASHBOARD_ENDPOINTS = {
    //DASH SECTION REGISTRATION
    ADD_SECTION: `/api/dashboard/sections`,
    //DASH TABLE
    GET_SECTIONS: `/api/dashboard/sections`
   
};

class DashSectionApi {
    borrowPage = {
        getSections: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.GET_SECTIONS

            )
        },
        addSection: async () => {
            return await fetcher.get(
                DASHBOARD_ENDPOINTS.ADD_SECTION

            )
        },
    }
}
const SectionApi = new DashSectionApi()
export default SectionApi;