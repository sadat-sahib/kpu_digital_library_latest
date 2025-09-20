

import DashAuthFetcher from "./DashAuthFetcher";

export type Section = {
  id: number;
  section: string;
};

const DASHBOARD_ENDPOINTS = {
  ADD_SECTION: `/api/dashboard/sections`,
  GET_SECTIONS: `/api/dashboard/sections`,
};

class DashSectionApi {
  section = {
    getSections: async (): Promise<Section[]> => {
      const res = await DashAuthFetcher.get(DASHBOARD_ENDPOINTS.GET_SECTIONS);
      
      return res.data.data;
    },
    addSection: async (data: { section: string }) => {
      const res = await DashAuthFetcher.post(DASHBOARD_ENDPOINTS.ADD_SECTION, data);
      return res.data; 
    },
  };
}

const SectionApi = new DashSectionApi();
export default SectionApi;
