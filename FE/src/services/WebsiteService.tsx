import axios from 'axios';

type WebsiteInfo = {
  id: number;
  code: string;
  domain: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
  webKey?: string;
};

class WebsiteService {
  getAllWebsite = () => {
    return axios.get(`/api/websites/all`);
  };

  getWebsiteById = (id: number) => {
    return axios.get(`/api/websites/${id}`);
  };

  getAllWebsitePagination = (pageNumber: number) => {
    return axios.get(`/api/websites/pagination/${pageNumber}`);
  };

  getWebDomainByPage = () => {
    return axios.get(`/api/websites/list/web-domain`);
  };

  saveWebsite = (websiteInfo: WebsiteInfo) => {
    return axios.post(`/api/websites/add`, websiteInfo).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };

  updateWebsite = (websiteInfo: WebsiteInfo) => {
    return axios.put(`/api/websites/update`, websiteInfo).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };

  deleteWebsite = (websiteId: number) => {
    return axios.delete(`/api/websites/delete/${websiteId}`).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };
}

export default new WebsiteService();
