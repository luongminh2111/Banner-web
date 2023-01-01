import axios from 'axios';
import { AnyNsRecord } from 'dns';

class BannerService {
  getAllSection = (page: number, size: number) => {
    return axios.get(`/api/sections/${page}/${size}`);
  };

  delete = (sectionId: number) => {
    return axios.delete(`/api/sections/${sectionId}`);
  };

  getSectionByPageId = (pageId: number) => {
    return axios.get(`/api/sections/page-id=${pageId}`);
  };

  saveSectionMapping = (item: any) => {
    return axios.post(`/api/section-mapping`, item);
  };

  getSectionAvailable = (pageId: number) => {
    return axios.get(`/api/sections/` + 'available/page-id=' + pageId);
  };
  getListSectionInPageByPageId = (pageId: any) => {
    return axios.get(`/api/sections/` + 'pageId=' + pageId + '/list-section');
  };
  updateSectionMapping = (item: any) => {
    return axios.put(`/api/section-mapping`, item);
  };

  deleteSectionMapping = (sectionId: number, pageId: any) => {
    return axios.delete(`/api/section-mapping/${pageId}/${sectionId}`);
  };
}
export default new BannerService();
