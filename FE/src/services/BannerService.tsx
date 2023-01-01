import axios from 'axios';

type BannerMapping = {
  id: number;
  bannerId: number;
  sectionId: number;
  percentage: number;
  lastModifiedBy: string;
};

class BannerService {
  getAllBanner = () => {
    return axios.get(`/api/banners/all`);
  };

  delete = (bannerId: number) => {
    return axios.delete(`/api/banners/${bannerId}`);
  };

  getListBannerFilterBySectionSize = (scale: number, sectionId: number) => {
    return axios.get(`/api/banners/filter/sectionId=${sectionId}/${scale}`);
  };

  // hàm lấy ra thông tin banner có cả banner_mapping_id và percentage
  getListBannerHasPercentageBySectionId = (sectionId: number) => {
    return axios.get(`/api/banners/filter-has-percentage/sectionId=${sectionId}`);
  };

  getListBannerFilterBySectionId = (sectionId: number) => {
    return axios.get(`/api/banners/filter/sectionId=${sectionId}`);
  };

  getListBannerPopUpByPage = (pageId: number) => {
    return axios.get(`api/banners/banner-popup/page=${pageId}`);
  };

  getListBannerPopUpNotInPage = (pageId: number) => {
    return axios.get(`api/banners/banner-popup/not-in-page=${pageId}`);
  };
  saveBannerMapping = (bannerMappingItem: any) => {
    return axios.post(`/api/banner-mapping`, bannerMappingItem).catch(function (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
        console.log('Error', error.message);
      }
    });
  };

  // đây là hàm cập nhật bảng banner mapping
  updateBannerMapping = (bannerMappingItem: BannerMapping) => {
    return axios.put(`/api/banner-mapping`, bannerMappingItem).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
  };

  deleteOnBannerMapping = (bannerId: number, sectionId: number) => {
    return axios
      .delete(`/api/banner-mapping/${bannerId}/section=${sectionId}`)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  };

  deleteOnBannerMappingByBannerIdAndPageId = (bannerId: number, pageId: number) => {
    return axios
      .delete(`/api/banner-mapping/${bannerId}/page=${pageId}`)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  };
}

export default new BannerService();
